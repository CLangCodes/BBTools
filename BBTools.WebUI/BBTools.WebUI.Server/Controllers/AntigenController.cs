using BBTools.Application.Interfaces;
using BBTools.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BBTools.WebUI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AntigenController : ControllerBase
    {
        private readonly IAntigenService _antigenService;
        private readonly ILogger<AntigenController> _logger;

        public AntigenController(IAntigenService antigenService, ILogger<AntigenController> logger)
        {
            _antigenService = antigenService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Antigen>>> GetAll()
        {
            try
            {
                _logger.LogInformation("Getting all antigens");
                var antigens = await _antigenService.GetAllObjectsAsync();
                _logger.LogInformation("Retrieved {Count} antigens", antigens.Count());
                foreach (var antigen in antigens)
                {
                    _logger.LogInformation("Antigen details - ISBT: {ISBT}, Name: {Name}, SystemId: {SystemId}, SystemName: {SystemName}",
                        antigen.ISBTNumber,
                        antigen.Name,
                        antigen.SystemId,
                        antigen.SystemName);
                }
                var result = Ok(antigens);
                _logger.LogInformation("Returning response: {@Response}", result.Value);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all antigens");
                return StatusCode(500, "An error occurred while retrieving antigens");
            }
        }

        [HttpGet("{isbtNumber}")]
        public async Task<ActionResult<Antigen>> GetById(string isbtNumber)
        {
            try
            {
                _logger.LogInformation("Getting antigen with ISBT Number: {ISBT}", isbtNumber);
                var antigen = await _antigenService.GetObjectByIdAsync(isbtNumber);
                if (antigen == null)
                {
                    _logger.LogWarning("Antigen with ISBT Number {ISBT} not found", isbtNumber);
                    return NotFound();
                }
                return Ok(antigen);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting antigen with ISBT Number: {ISBT}", isbtNumber);
                return StatusCode(500, "An error occurred while retrieving the antigen");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Antigen>> Create(Antigen antigen)
        {
            try
            {
                _logger.LogInformation("Creating new antigen: {@Antigen}", antigen);
                await _antigenService.CreateObjectAsync(antigen);
                return CreatedAtAction(nameof(GetById), new { isbtNumber = antigen.ISBTNumber }, antigen);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, "Invalid operation while creating antigen");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating antigen");
                return StatusCode(500, "An error occurred while creating the antigen");
            }
        }

        [HttpPut("{isbtNumber}")]
        public async Task<IActionResult> Update(string isbtNumber, Antigen antigen)
        {
            try
            {
                if (isbtNumber != antigen.ISBTNumber)
                {
                    _logger.LogWarning("ISBT Number mismatch in update request");
                    return BadRequest();
                }

                _logger.LogInformation("Updating antigen: {@Antigen}", antigen);
                await _antigenService.EditObjectAsync(antigen);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, "Invalid operation while updating antigen");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating antigen");
                return StatusCode(500, "An error occurred while updating the antigen");
            }
        }

        [HttpDelete("{isbtNumber}")]
        public async Task<IActionResult> Delete(string isbtNumber)
        {
            try
            {
                _logger.LogInformation("Deleting antigen with ISBT Number: {ISBT}", isbtNumber);
                var antigen = await _antigenService.GetObjectByIdAsync(isbtNumber);
                if (antigen == null)
                {
                    _logger.LogWarning("Antigen with ISBT Number {ISBT} not found", isbtNumber);
                    return NotFound();
                }

                await _antigenService.DeleteObjectAsync(antigen);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting antigen with ISBT Number: {ISBT}", isbtNumber);
                return StatusCode(500, "An error occurred while deleting the antigen");
            }
        }
    }
} 