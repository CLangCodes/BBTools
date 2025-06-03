using BBTools.Application.Interfaces;
using BBTools.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace BBTools.WebUI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AntigensController : ControllerBase
    {
        private readonly IAntigenService _antigenService;
        private readonly ILogger<AntigensController> _logger;

        public AntigensController(IAntigenService antigenService, ILogger<AntigensController> logger)
        {
            _antigenService = antigenService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Antigen>>> GetAll()
        {
            try
            {
                var antigens = await _antigenService.GetAllObjectsAsync();
                return Ok(antigens);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all antigens");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{isbtNumber}")]
        public async Task<ActionResult<Antigen>> GetById(string isbtNumber)
        {
            try
            {
                var antigen = await _antigenService.GetObjectByIdAsync(isbtNumber);
                if (antigen == null)
                    return NotFound();

                return Ok(antigen);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting antigen {IsbtNumber}", isbtNumber);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(Antigen antigen)
        {
            try
            {
                await _antigenService.CreateObjectAsync(antigen);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating antigen");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{isbtNumber}")]
        public async Task<IActionResult> Update(string isbtNumber, Antigen antigen)
        {
            try
            {
                await _antigenService.EditObjectAsync(antigen);
                return Ok();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating antigen {IsbtNumber}", isbtNumber);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{isbtNumber}")]
        public async Task<IActionResult> Delete(string isbtNumber)
        {
            try
            {
                var antigen = await _antigenService.GetObjectByIdAsync(isbtNumber);
                if (antigen == null)
                    return NotFound();

                await _antigenService.DeleteObjectAsync(antigen);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting antigen {IsbtNumber}", isbtNumber);
                return StatusCode(500, "Internal server error");
            }
        }
    }
} 