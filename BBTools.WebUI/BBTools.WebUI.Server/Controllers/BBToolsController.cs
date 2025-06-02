using BBTools.Application.Interfaces;
using BBTools.Domain.Models;
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

        [HttpGet("frequencies")]
        public async Task<ActionResult<Dictionary<string, decimal>>> GetFrequencies()
        {
            try
            {
                _logger.LogInformation("Getting antigen frequencies");
                var result = await _antigenCalculatorService.GetAntigenFrequenciesAsync();
                _logger.LogInformation($"Retrieved {result.Count} antigen frequencies");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting antigen frequencies");
                return StatusCode(500, "An error occurred while retrieving antigen frequencies");
            }
        }

        [HttpPost("calculateUnits")]
        public ActionResult<int?> CalculateUnits([FromBody] AntigenSelection[] antigenSelections, [FromQuery] int unitsReq)
        {
            try
            {
                _logger.LogInformation("Calculating screening target quantity");
                var result = _antigenCalculatorService.CalculateUnitScreening(antigenSelections, unitsReq);
                _logger.LogInformation($"Calculated screening target quantity: {result}");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calculating screening target quantity");
                return StatusCode(500, "An error occurred while calculating screening target quantity");
            }
        }
    }
}
