using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BBTools.Application.Interfaces
{
    public interface IGenericService<T> where T : class
    {
        Task<IEnumerable<T>> GetAllObjectsAsync();
        Task<T?> GetObjectByIdAsync(string id);
        Task CreateObjectAsync(T entity);
        Task EditObjectAsync(T entity);
        Task DeleteObjectAsync(T entity);
    }
} 