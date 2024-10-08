using api.Data;
using api.Dtos.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Models;
using api.Dtos;
using Microsoft.AspNetCore.JsonPatch;

namespace api.Controllers
{
    [Authorize]
    [Route("api/searches")]
    [ApiController]
    public class SearchesController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public SearchesController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/Searches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Search>>> GetSearches()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _context.Searches.Where(s => s.UserId == userId).ToListAsync();
        }

        // GET: api/Searches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Search>> GetSearch(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var search = await _context.Searches.FindAsync(id);

            if (search == null || search.UserId != userId)
            {
                return NotFound();
            }

            return search;
        }

        [HttpPatch("{id}")]
    public async Task<IActionResult> PatchSearch(int id, [FromBody] JsonPatchDocument<SearchUpdateDto> patchDoc)
    {
        if (patchDoc == null)
        {
            return BadRequest();
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var search = await _context.Searches.FindAsync(id);

        if (search == null)
        {
            return NotFound();
        }

        if (search.UserId != userId)
        {
            return Unauthorized();
        }

        var searchToPatch = new SearchUpdateDto
        {
            Id = search.Id,
            UserId = search.UserId,
            SearchName = search.SearchName,
            SearchUrl = search.SearchUrl,
            IsActive = search.IsActive,
            NotificationFrequency = search.NotificationFrequency
        };

        patchDoc.ApplyTo(searchToPatch, ModelState);

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Manually map the updated fields back to the original entity
        search.SearchName = searchToPatch.SearchName;
        search.SearchUrl = searchToPatch.SearchUrl;
        search.IsActive = searchToPatch.IsActive;
        search.NotificationFrequency = searchToPatch.NotificationFrequency;

        _context.Entry(search).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SearchExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }




        // POST: api/Searches
        [HttpPost]
        public async Task<ActionResult<Search>> PostSearch(SearchCreateDto searchCreateDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
            var search = new Search
            {
                SearchName = searchCreateDto.SearchName ?? "Put Name Here",
                SearchUrl = searchCreateDto.SearchUrl,
                NotificationFrequency = searchCreateDto.NotificationFrequency,
                IsActive = searchCreateDto.IsActive,
                UserId = userId,
            };
            _context.Searches.Add(search);
            await _context.SaveChangesAsync();
        
            return CreatedAtAction("GetSearch", new { id = search.Id }, search);
        }

        // DELETE: api/Searches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSearch(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var search = await _context.Searches.FindAsync(id);

            if (search == null || search.UserId != userId)
            {
                return NotFound();
            }

            _context.Searches.Remove(search);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SearchExists(int id)
        {
            return _context.Searches.Any(e => e.Id == id);
        }
        
    }
}
