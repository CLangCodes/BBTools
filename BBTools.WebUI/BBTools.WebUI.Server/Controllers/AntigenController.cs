using BBTools.Application.Interfaces;
using BBTools.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace BBTools.WebUI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AntigenController : ControllerBase
    {
        private readonly IAntigenService _antigenService;

        public AntigenController(IAntigenService antigenService)
        {
            _antigenService = antigenService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Antigen>>> GetAll()
        {
            var antigens = await _antigenService.GetAllObjectsAsync();
            return Ok(antigens);
        }

        [HttpGet("{isbtNumber}")]
        public async Task<ActionResult<Antigen>> GetById(string isbtNumber)
        {
            var antigen = await _antigenService.GetObjectByIdAsync(isbtNumber);
            if (antigen == null)
                return NotFound();
            return Ok(antigen);
        }

        [HttpPost]
        public async Task<ActionResult<Antigen>> Create(Antigen antigen)
        {
            await _antigenService.CreateObjectAsync(antigen);
            return CreatedAtAction(nameof(GetById), new { isbtNumber = antigen.ISBTNumber }, antigen);
        }

        [HttpPut("{isbtNumber}")]
        public async Task<IActionResult> Update(string isbtNumber, Antigen antigen)
        {
            if (isbtNumber != antigen.ISBTNumber)
                return BadRequest();

            await _antigenService.EditObjectAsync(antigen);
            return NoContent();
        }

        [HttpDelete("{isbtNumber}")]
        public async Task<IActionResult> Delete(string isbtNumber)
        {
            var antigen = await _antigenService.GetObjectByIdAsync(isbtNumber);
            if (antigen == null)
                return NotFound();

            await _antigenService.DeleteObjectAsync(antigen);
            return NoContent();
        }
    }
} 