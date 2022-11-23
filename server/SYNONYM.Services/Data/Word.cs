using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SYNONYM.Services.Data
{
    public class Word
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Description { get; set; }

        public Word()
        {

        }

        public Word(int id, string text, string description)
        {
            this.Id = id;
            this.Text = text;
            this.Description = description;
        }
    }
}
