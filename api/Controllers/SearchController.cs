using api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace YourNamespace.Controllers
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

        // PUT: api/Searches/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSearch(int id, Search search)
        {
            if (id != search.Id)
            {
                return BadRequest();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (search.UserId != userId)
            {
                return Unauthorized();
            }

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
        public async Task<ActionResult<Search>> PostSearch(Search search)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            search.UserId = userId;
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
