using System.Linq.Expressions;

namespace BBTools.Domain.Interfaces
{
    public interface IRepository 
    {
        Task CreateObjectAsync<T>(T entity) where T : class;
        Task<T?> GetObjectAsync<T, TKey>(TKey id) where T : class;
        Task<IEnumerable<T>> GetAllAsync<T>() where T : class;
        Task<IEnumerable<T>> GetWhereAsync<T>(Expression<Func<T, bool>> predicate) where T : class;
        Task DeleteObjectAsync<T>(T entity) where T : class;
        Task EditObjectAsync<T>(T entity) where T : class;
        Task<bool> ExistsAsync<T, TKey>(TKey id) where T : class;
    }
} 