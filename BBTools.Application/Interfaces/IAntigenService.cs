using BBTools.Domain.Models;

namespace BBTools.Application.Interfaces
{
    public interface IAntigenService
    {
        Task<IEnumerable<Antigen>> GetAllObjectsAsync();
        Task<Antigen?> GetObjectByIdAsync(string isbtNumber);
        Task CreateObjectAsync(Antigen antigen);
        Task EditObjectAsync(Antigen antigen);
        Task DeleteObjectAsync(Antigen antigen);
    }
} 