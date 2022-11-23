using System.ComponentModel.DataAnnotations;

namespace SYNONYM.Model.Requests
{
    public class WordInsertRequest
    {
        [RegularExpression(@"^[a-zA-Z\""' -.]+$", ErrorMessage = "Don't use special characters")]
        [Required(AllowEmptyStrings = false)]
        public string Text { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Description { get; set; }

        public IEnumerable<int> Synonyms { get; set; }
    }
}
