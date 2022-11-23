using AutoMapper.Configuration.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SYNONYM.Services.Data
{
    public class Database
    {
        /*
         * The added words and synonyms are represented through a graph, where the words
         * are vertices and the synonym relationships between them are edges.
         * 
         * In memory, the graph is represented as an array of vertices, with each containing
         * an adjacency list which holds all adjacent vertices
         *
         * */
        List<Node> _graph = new List<Node>();

        /*
         * Lookup data is a dictionary which pairs a string of text to the words that contain that text.
         * 
         * This dictionary doesn't add any new data, therefore it is just a optimization tool.
         * 
         * There is a tradeoff between the added performance and the added memory burden, but I decided that
         * this way is optimal because lookup is going to be the most used functionality and the nodes that
         * are stored in the dictionary are just references to the original nodes in the graph, so memory burden is minimal.
         * 
         * This way the most used funcitonality is reduced from O(n) time complexity to O(1)
         * 
         */
        Dictionary<string, List<Node>> _lookupData = new Dictionary<string, List<Node>>();

        /*
         * Word IDs correspond to the number of elements when added. This assures that it will be unique, and 
         * that the fetch time is O(1) since the location within the array is always known
         */
        int _currentID = 0;


        /*
         * Edges could also be added to every synonym in the tree, making a mesh topology. This result in performance
         * improvement since there is no need to build a synonym tree since we have the complete synonym list in
         * the adjacency matrix. 
         * 
         * I decided not to do that because this results in a cleaner topology with clear relationships that correspond 
         * to the way that they were added. Also the current way makes it possible to enable editing/removing
         * relationships in the future without violating the required transitive rule.
         * 
         */
        public Word InsertWord(Word word, IEnumerable<Node> synonyms)
        {
            word.Id = _currentID++;
            // Create a new node based on the supplied word
            var node = new Node(word);

            // For each synonym
            foreach (var synonym in synonyms)
            { 
                // Add a reflexive relationship between the word and synonym
                node.AdjacentNodes.Add(synonym);
                synonym.AdjacentNodes.Add(node);
            }
            // Insert the node into the graph
            _graph.Add(node);


            // Add the new node to lookup data
            if (!_lookupData.ContainsKey(node.Text))
            {
                _lookupData.Add(node.Text, new List<Node>());
            }
            _lookupData[node.Text].Add(node);
            

            return node;
        }

        public Node GetNode(int id)
        { 
            return _graph[id];
        }

        public Node GetFullNode(int id)
        {
            // Fetch the node from the graph based on the ID
            var word = _graph[id];
            // Make a new node from the fetched one so the adjacency list does't get changed
            var item = new Node(word);
            // Store all the synonyms into this nodes adjacency list
            BuildSynonymTree(word, word, item.AdjacentNodes);
            return item;
        }

        public IEnumerable<Node> Lookup(string input)
        {
            // Get the list of words corresponding to the input or throw KeyNotFoundException if no words are found
            var wordList = _lookupData[input];

            var result = new List<Node>();
            foreach (var item in wordList)
            { 
                // Create a new node based on the original, get all the synonyms and then add it to the results
                var word = new Node(item);
                BuildSynonymTree(item, item, word.AdjacentNodes);
                result.Add(word);
            }

            return result;
        }

        public IEnumerable<Word> GetWords()
        {
            return _graph;
        }

        /*
         * A simple recursive DFS algorithm which builds a tree of all the nodes that are
         * connected to the StartNode
         * 
         */
        public void BuildSynonymTree(Node StartNode, Node CurrentNode, ICollection<Node> List)
        {
            // For every adjacent node
            foreach (var synonym in CurrentNode.AdjacentNodes)
            {
                // If the word hasn't been added and the word is not the StartNode
                if (!List.Contains(synonym) && synonym.Id != StartNode.Id)
                {
                    // Fetch the node from the graph
                    var item = _graph[synonym.Id];

                    // Add the node to the Tree
                    List.Add(item);

                    // Call the function for the added node
                    BuildSynonymTree(StartNode, item, List);
                }
            }
        }
    }
}
