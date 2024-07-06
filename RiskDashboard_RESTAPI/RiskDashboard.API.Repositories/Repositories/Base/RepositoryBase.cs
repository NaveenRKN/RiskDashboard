using Microsoft.EntityFrameworkCore;
using RiskDashboard.API.Repositories.RepositoriesContracts.Base;
using RiskDashboard_RESTAPI.Models.Common;
using System.Linq.Expressions;

namespace RiskDashboard.API.Repositories.Repositories.Base
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected DatabaseContext RepositoryContext { get; set; }

        public RepositoryBase(DatabaseContext repositoryContext)
        {
            RepositoryContext = repositoryContext;
        }

        public async Task<T> Get(Guid id)
        {
            return await RepositoryContext.Set<T>().FindAsync(id);
        }

        public async Task<T> Get(int id)
        {
            return await RepositoryContext.Set<T>().FindAsync(id);
        }
        public async Task<T> Get(Expression<Func<T, bool>> expression)
        {
            return await RepositoryContext.Set<T>().Where(expression).AsNoTracking().FirstOrDefaultAsync();
        }

        public async Task<List<T>> GetAll()
        {
            return await RepositoryContext.Set<T>().AsNoTracking().ToListAsync();
        }

        public async Task<List<T>> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return await RepositoryContext.Set<T>().Where(expression).AsNoTracking().ToListAsync();
        }

        public async Task<List<T>> CreateRange(T[] entities)
        {
            RepositoryContext.Set<T>().AddRange(entities);
            await RepositoryContext.SaveChangesAsync();
            return entities.ToList();
        }

        public async Task<T> Create(T entity)
        {
            RepositoryContext.Set<T>().Add(entity);
            await RepositoryContext.SaveChangesAsync();
            return entity;
        }

        public async Task<T> Update(T entity)
        {
            RepositoryContext.Entry(entity).State = EntityState.Modified;
            await RepositoryContext.SaveChangesAsync();
            return entity;
        }
        public async Task<List<T>> UpdateRange(T[] entities)
        {
            foreach (T entity in entities)
            {
                RepositoryContext.Entry(entity).State = EntityState.Modified;
            }
            await RepositoryContext.SaveChangesAsync();
            return entities.ToList();
        }

        public async Task<T> Delete(Guid id)
        {
            var entity = await RepositoryContext.Set<T>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            RepositoryContext.Set<T>().Remove(entity);
            await this.RepositoryContext.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteRange(T[] entities)
        {
            RepositoryContext.Set<T>().RemoveRange(entities);
            await this.RepositoryContext.SaveChangesAsync();
            return true;
        }

        public async Task Save()
        {
            await this.RepositoryContext.SaveChangesAsync();
        }
        public async Task<List<T>> FromSqlRaw(string sql, params object[] parameters)
        {
            return await this.RepositoryContext.Set<T>().FromSqlRaw<T>(sql, parameters).AsNoTracking().ToListAsync();
        }
        public async Task<int> ExecuteSQLCommand(string sql, params object[] parameters)
        {
            return await this.RepositoryContext.Database.ExecuteSqlRawAsync(sql, parameters);
        }
    }
}
