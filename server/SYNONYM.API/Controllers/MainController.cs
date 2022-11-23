using Microsoft.AspNetCore.Mvc;
using SYNONYM.API.Helpers;
using SYNONYM.Model.Requests;
using SYNONYM.Services.Interfaces;
using SYNONYM.Model;

namespace SYNONYM.API.Controllers
{
    [ApiController]
    [Route("")]
    public class MainController : ControllerBase
    {
        IWordService _wordService;

        public MainController(IWordService wordService)
        {
            _wordService = wordService;
        }

        [HttpGet("{id}")]
        public virtual ActionResult<WordSynonyms> GetById(int id)
        {
            try
            {
                return Ok(_wordService.GetWord(id));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("search")]
        public virtual ActionResult<PagedList<Word>> SearchWords(string? filter, int itemsPerPage, int pageNumber)
        {
            try
            {
                var results =_wordService.SearchWords(filter);
                return Ok(PagedList<Word>.Create(results.AsQueryable(), pageNumber, itemsPerPage));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("all")]
        public virtual ActionResult<IEnumerable<string>> GetAllWordNames()
        {
            try
            {
                return Ok(_wordService.GetAllWords());
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("all/id")]
        public virtual ActionResult<IEnumerable<string>> GetAllWordIDs()
        {
            try
            {
                return Ok(_wordService.GetAllWordIDs());
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public virtual ActionResult<WordSynonyms> Insert([FromBody] WordInsertRequest data)
        {
            try
            {
                return Ok(_wordService.InsertWord(data));
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest("The submitted synonyms were invalid! One or more ID/s didn't correspond to a word in the database.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest("The submitted synonyms were invalid! One or more synonyms referenced the same synonym tree.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("lookup/{word}")]
        public virtual ActionResult<WordSynonyms> Lookup(string word)
        {
            try
            {
                return Ok(_wordService.Lookup(word));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
