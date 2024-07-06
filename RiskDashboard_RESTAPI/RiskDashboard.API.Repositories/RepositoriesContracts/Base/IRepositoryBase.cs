using System.Linq.Expressions;

namespace RiskDashboard.API.Repositories.RepositoriesContracts.Base
{
    public interface IRepositoryBase<T>
    {
        Task<T> Get(Guid id);
        Task<T> Get(int id);
        Task<List<T>> GetAll();
        Task<List<T>> FindByCondition(Expression<Func<T, bool>> expression);
        Task<T> Get(Expression<Func<T, bool>> expression);
        Task<T> Create(T entity);
        Task<List<T>> CreateRange(T[] entities);
        Task<T> Update(T entity);
        Task<List<T>> UpdateRange(T[] entities);
        Task<T> Delete(Guid id);
        Task<bool> DeleteRange(T[] entities);
        Task Save();
        Task<List<T>> FromSqlRaw(string sql, params object[] parameters);
        Task<int> ExecuteSQLCommand(string sql, params object[] parameters);
    }
}
