using AutoMapper;
using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;

namespace RiskDashboard.Api.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<ProjectDetailsViewModel,ProjectDetails>();
            CreateMap<RiskInformationViewModel,RiskInformation>();
            CreateMap<RiskDashboardViewModel, RiskInformation>();
        }
    }
}