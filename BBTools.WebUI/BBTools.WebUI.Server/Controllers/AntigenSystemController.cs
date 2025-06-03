using BBTools.Application.Interfaces;
using BBTools.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BBTools.WebUI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AntigenSystemController : ControllerBase
    {
        private readonly IAntigenSystemService _antigenSystemService;
        private readonly ILogger<AntigenSystemController> _logger;

        public AntigenSystemController(IAntigenSystemService antigenSystemService, ILogger<AntigenSystemController> logger)
        {
            _antigenSystemService = antigenSystemService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AntigenSystem>>> GetAll()
        {
            try
            {
                _logger.LogInformation("Getting all antigen systems");
                var systems = await _antigenSystemService.GetAllObjectsAsync();
                _logger.LogInformation("Retrieved {Count} antigen systems", systems.Count());
                foreach (var system in systems)
                {
                    _logger.LogInformation("System details - ID: {Id}, Name: {Name}, Genes: {Genes}, PhenoTypes: {PhenoTypes}",
                        system.SystemId,
                        system.SystemName,
                        system.Genes != null ? string.Join(",", system.Genes) : "null",
                        system.PhenoTypes != null ? string.Join(",", system.PhenoTypes) : "null");
                }
                var result = Ok(systems);
                _logger.LogInformation("Returning response: {@Response}", result.Value);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all antigen systems");
                return StatusCode(500, "An error occurred while retrieving antigen systems");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AntigenSystem>> GetById(string id)
        {
            try
            {
                _logger.LogInformation("Getting antigen system with ID: {Id}", id);
                var system = await _antigenSystemService.GetObjectByIdAsync(id);
                if (system == null)
                {
                    _logger.LogWarning("Antigen system with ID {Id} not found", id);
                    return NotFound();
                }
                return Ok(system);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting antigen system with ID: {Id}", id);
                return StatusCode(500, "An error occurred while retrieving the antigen system");
            }
        }

        [HttpPost]
        public async Task<ActionResult<AntigenSystem>> Create(AntigenSystem system)
        {
            try
            {
                _logger.LogInformation("Creating new antigen system: {@System}", system);
                await _antigenSystemService.CreateObjectAsync(system);
                return CreatedAtAction(nameof(GetById), new { id = system.SystemId }, system);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, "Invalid operation while creating antigen system");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating antigen system");
                return StatusCode(500, "An error occurred while creating the antigen system");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, AntigenSystem system)
        {
            try
            {
                if (!int.TryParse(id, out int systemId) || systemId != system.SystemId)
                {
                    _logger.LogWarning("Invalid system ID in update request. Path ID: {PathId}, System ID: {SystemId}", id, system.SystemId);
                    return BadRequest("Invalid system ID");
                }

                _logger.LogInformation("Updating antigen system: {@System}", system);
                await _antigenSystemService.EditObjectAsync(system);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, "Invalid operation while updating antigen system");
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating antigen system");
                return StatusCode(500, "An error occurred while updating the antigen system");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                _logger.LogInformation("Deleting antigen system with ID: {Id}", id);
                var system = await _antigenSystemService.GetObjectByIdAsync(id);
                if (system == null)
                {
                    _logger.LogWarning("Antigen system with ID {Id} not found for deletion", id);
                    return NotFound();
                }

                await _antigenSystemService.DeleteObjectAsync(system);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting antigen system with ID: {Id}", id);
                return StatusCode(500, "An error occurred while deleting the antigen system");
            }
        }
    }
} 