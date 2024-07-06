using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RiskDashboard.Api.Services.Constants;
using RiskDashboard.Api.Services.ServiceContracts;
using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;
using System.Globalization;

namespace RiskDashboard_RESTAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class RiskDashboardController : ControllerBase
    {
        private readonly IRiskInformationService _riskInformationService;
        private readonly ILog _logger;
        public RiskDashboardController(IRiskInformationService riskInformationService, ILog logger)
        {
            _riskInformationService = riskInformationService;
            _logger = logger;
        }        

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            try
            {
                List<ProjectDetails> projectDetails = await _riskInformationService.GetProjectDetails();
                return Ok(projectDetails);
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        
        [HttpGet("{startYear?}/{startMonth?}/{startDate?}/{endYear?}/{endMonth?}/{endDate?}/{riskType?}")]
        public async Task<IActionResult> GetRisks(int? startYear, int? startMonth, int? startDate, int? endYear, int? endMonth, int? endDate, string? riskType)
        {
            try
            {
                var risks = await _riskInformationService.GetRiskInformation(startYear, startMonth, startDate, endYear, endMonth, endDate, riskType);
                if (risks == null)
                {
                    return NoContent();
                }
                else
                {
                    return Ok(risks);
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetLastImportedFileDetails()
        {
            List<FileImportDetails> importDetails = await _riskInformationService.GetLastImportedFileDetails();
            return Ok(importDetails);
        }
        
        [HttpPost]
        public async Task<IActionResult> SaveRisks(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Invalid file.");
            try
            {               
                    List<string> expectedHeaders = RiskDashboardConstants.ExpectedHeaders.Split(',').ToList();

                    bool headersMatch = VerifyCsvHeaders(file, expectedHeaders);

                    if (headersMatch)
                    {
                        List<RiskDashboardViewModel> riskDetails = ReadRiskDetails(file);
                        if (riskDetails == null || riskDetails.Count == 0)
                        {
                            return Ok("No risk data found in the imported file");
                        }
                        else
                        {
                            await _riskInformationService.SaveRiskDetails(riskDetails, file.FileName);
                            return Ok("CSV data imported successfully.");
                        }
                    }
                return Ok("Please upload valid Risk information CSV file.");
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        private List<RiskDashboardViewModel> ReadRiskDetails(IFormFile file)
        {
            List<RiskDashboardViewModel> riskDashboardDtls;
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
                {
                    riskDashboardDtls = csv.GetRecords<RiskDashboardViewModel>().ToList();
                }
            }
            return riskDashboardDtls;
        }

        private static bool VerifyCsvHeaders(IFormFile file, List<string> expectedHeaders)
        {
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
                {
                    csv.Read();
                    csv.ReadHeader();
                    if (csv.HeaderRecord != null)
                    {
                        var actualHeaders = csv.HeaderRecord.ToList();

                        // Check if all expected headers are present in the actual headers
                        return expectedHeaders.All(header => actualHeaders.Contains(header));
                    }
                }
            }
            return false;
        }
    }
}
