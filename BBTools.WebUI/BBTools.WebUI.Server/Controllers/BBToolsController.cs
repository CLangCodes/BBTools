using BBTools.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BBTools.WebUI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BBToolsController(IAntigenCalculatorService antigenCalculatorService, ILogger<BBToolsController> logger) : ControllerBase
    {
        private readonly IAntigenCalculatorService _antigenCalculatorService = antigenCalculatorService;
        private readonly ILogger<BBToolsController> _logger = logger;

        [HttpGet("test")]
        public IActionResult Test()
        {
            _logger.LogInformation("Test endpoint called");
            return Ok(new { message = "API is working" });
        }

        [HttpGet("frequencies")]
        public async Task<ActionResult<Dictionary<string, decimal>>> GetFrequencies()
        {
            try
            {
                _logger.LogInformation("Getting antigen frequencies");
                var result = await _antigenCalculatorService.GetAntigenFrequenciesAsync();
                _logger.LogInformation("Retrieved {Count} antigen frequencies", result.Count);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting antigen frequencies");
                return StatusCode(500, "An error occurred while retrieving antigen frequencies");
            }
        }
    }
}
