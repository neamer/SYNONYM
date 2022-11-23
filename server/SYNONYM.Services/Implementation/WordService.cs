using AutoMapper;
using SYNONYM.Model.Requests;
using SYNONYM.Services.Data;
using SYNONYM.Services.Interfaces;

namespace SYNONYM.Services.Implementation
{

    public class WordService : IWordService
    {
        Database _database;
        IMapper _mapper;

        public WordService(Database database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        public IEnumerable<int> GetAllWordIDs()
        {
            return _database.GetWords().Select((word) => word.Id).Distinct();
        }

        public IEnumerable<string> GetAllWords()
        {
            return _database.GetWords().Select((word) => word.Text).Distinct();
        }

        public Model.WordSynonyms GetWord(int id)
        {
            return _mapper.Map<Model.WordSynonyms>(_database.GetFullNode(id));
        }

        public Model.WordSynonyms InsertWord(WordInsertRequest data)
        {
            var word = _mapper.Map<Word>(data);

            var synonyms = new List<Node>();
            foreach (var synonymID in data.Synonyms)
            {
                synonyms.Add(_database.GetNode(synonymID));
            }

            if (!ValidateSynonyms(synonyms))
            {
                throw new ArgumentException();
            }

            return _mapper.Map<Model.WordSynonyms>(_database.InsertWord(word, synonyms));
        }

        public IEnumerable<Model.WordSynonyms> Lookup(string word)
        {
            return _mapper.Map<IList<Model.WordSynonyms>>(_database.Lookup(word.ToLower()));
        }

        public IEnumerable<Model.Word> SearchWords(string criteria)
        {
            if(string.IsNullOrEmpty(criteria))
            {
                return _mapper.Map<Model.Word[]>(_database.GetWords());
            }
            else
            {
                return _mapper.Map<Model.Word[]>(_database.GetWords()
                    .Where(e => e.Text.ToLower().Contains(criteria.ToLower())));
            }
        }

        /// <summary>
        /// Checks if the provided synonym list contains multiple references to the same synonym tree
        /// </summary>
        /// <param name="synonyms">The list of synonym IDs</param>
        /// <returns>true if the list doesn't contain a circular reference, false if it does</returns>
        bool ValidateSynonyms(IEnumerable<Node> synonyms)
        {
            foreach (var synonym in synonyms)
            {
                var synonymTree = new List<Node>();
                _database.BuildSynonymTree(synonym, synonym, synonymTree);

                if (synonymTree.Intersect(synonyms).Any())
                {
                    return false;
                }
            }

            return true;
        }
    }
}
