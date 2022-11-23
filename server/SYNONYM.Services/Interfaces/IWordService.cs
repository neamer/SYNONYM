using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SYNONYM.Model.Requests;
using SYNONYM.Model;

namespace SYNONYM.Services.Interfaces
{
    public interface IWordService
    {
        public WordSynonyms InsertWord(WordInsertRequest data);
        public WordSynonyms GetWord(int id);
        public IEnumerable<Word> SearchWords(string criteria);
        public IEnumerable<string> GetAllWords();
        public IEnumerable<int> GetAllWordIDs();
        public IEnumerable<WordSynonyms> Lookup(string word);
    }
}
