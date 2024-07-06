namespace RiskDashboard.API.Repositories.RepositoriesContracts.Base
{
    public interface IRepositoryWrapper
    {
        IFileImportDetailsRepository FileImportDetailsRepository { get; }
        IProjectDetailsRepository ProjectDetailsRepository { get; }
        IRiskInformationRepository RiskInformationRepository { get; }
        IRowIdentifierRepository RowIdentifierRepository { get; }
        IUserRepository UserRepository { get; }
        IUserToDoListRepository UserToDoListRepository { get; }
    }
}