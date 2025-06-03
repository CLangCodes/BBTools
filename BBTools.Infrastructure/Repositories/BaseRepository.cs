using BBTools.Domain.Interfaces;
using BBTools.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BBTools.Infrastructure.Repositories
{
    public abstract class BaseRepository : IRepository 
    {
        protected readonly IDbContextFactory<BBContext> _dbContextFactory;

        protected BaseRepository(IDbContextFactory<BBContext> dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public virtual async Task CreateObjectAsync<T>(T entity) where T : class
        {
            using var dbContext = _dbContextFactory.CreateDbContext();
            await dbContext.Set<T>().AddAsync(entity);
            await dbContext.SaveChangesAsync();
        }

        public virtual async Task<T?> GetObjectAsync<T, TKey>(TKey id) where T : class
        {
            using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Set<T>().FindAsync(id);
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync<T>() where T : class
        {
            using var dbContext = _dbContextFactory.CreateDbContext();
            var query = dbContext.Set<T>().AsQueryable();

            // Include navigation properties based on the entity type
            if (typeof(T) == typeof(BBTools.Domain.Models.Antigen))
            {
                query = query.Include("AntigenSystem");
            }

            return await query.ToListAsync();
        }

        public virtual async Task<IEnumerable<T>> GetWhereAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Set<T>().Where(predicate).ToListAsync();
        }

        public virtual async Task DeleteObjectAsync<T>(T entity) where T : class
        {
            using var dbContext = _dbContextFactory.CreateDbContext();
            dbContext.Set<T>().Remove(entity);
            await dbContext.SaveChangesAsync();
        }

        public virtual async Task EditObjectAsync<T>(T entity) where T : class
        {
            using var dbContext = _dbContextFactory.CreateDbContext();
            dbContext.Set<T>().Update(entity);
            await dbContext.SaveChangesAsync();
        }

        public virtual async Task<bool> ExistsAsync<T, TKey>(TKey id) where T : class
        {
            using var dbContext = _dbContextFactory.CreateDbContext();
            return await dbContext.Set<T>().FindAsync(id) != null;
        }
    }
}
