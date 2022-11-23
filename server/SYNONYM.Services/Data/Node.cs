using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SYNONYM.Services.Data
{
    public class Node : Data.Word
    {
        public ICollection<Node> AdjacentNodes { get; set; }

        public Node()
        {

        }

        public Node(Word word) : base(word.Id, word.Text, word.Description)
        {
            AdjacentNodes = new List<Node>(); 
        }
    }
}
