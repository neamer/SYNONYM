namespace SYNONYM.Model
{
    public class WordSynonyms : Word
    {
        public ICollection<Word> Synonyms { get; set; }
    }
}
