using RiskDashboard.API.Repositories.RepositoriesContracts;
using RiskDashboard.API.Repositories.RepositoriesContracts.Base;
using RiskDashboard_RESTAPI.Models.Common;

namespace RiskDashboard.API.Repositories.Repositories.Base
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private DatabaseContext _dbContext;
        private IFileImportDetailsRepository _FileImportDetailsRepository;
        private IProjectDetailsRepository _ProjectDetailsRepository;
        private IRiskInformationRepository _RiskInformationRepository;
        private IRowIdentifierRepository _RowIdentifierRepository;
        private IUserRepository _UserRepository;
        private IUserToDoListRepository _UserToDoListRepository;
        public RepositoryWrapper(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IFileImportDetailsRepository FileImportDetailsRepository
        {
            get 
            { 
                if (_FileImportDetailsRepository == null)
                {
                    _FileImportDetailsRepository = new FileImportDetailsRepository(_dbContext);
                }
                return _FileImportDetailsRepository; 
            }
        }
        public IProjectDetailsRepository ProjectDetailsRepository
        {
            get
            {
                if (_ProjectDetailsRepository == null)
                {
                    _ProjectDetailsRepository = new ProjectDetailsRepository(_dbContext);
                }
                return _ProjectDetailsRepository;
            }
        }

        public IRiskInformationRepository RiskInformationRepository
        {
            get
            {
                if (_RiskInformationRepository  == null)
                {
                    _RiskInformationRepository = new RiskInformationRepository(_dbContext);
                }
                return _RiskInformationRepository;
            }            
        }

        public IRowIdentifierRepository RowIdentifierRepository
        {
            get
            {
                if (_RowIdentifierRepository == null)
                {
                    _RowIdentifierRepository = new RowIdentifierRepository(_dbContext);
                }
                return _RowIdentifierRepository;
            }
        }public IUserRepository UserRepository
        {
            get
            {
                if (_UserRepository == null)
                {
                    _UserRepository = new UserRepository(_dbContext);
                }
                return _UserRepository;
            }
        }public IUserToDoListRepository UserToDoListRepository
        {
            get
            {
                if (_UserToDoListRepository == null)
                {
                    _UserToDoListRepository = new UserToDoListRepository(_dbContext);
                }
                return _UserToDoListRepository;
            }
        }
    }
}
