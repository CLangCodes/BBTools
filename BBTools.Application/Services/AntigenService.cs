using BBTools.Application.Interfaces;
using BBTools.Domain.Interfaces;
using BBTools.Domain.Models;

namespace BBTools.Application.Services
{
    public class AntigenService : IAntigenService
    {
        private readonly IRepository _bbrepository;
        public AntigenService(IRepository bbrepository)
        {
            _bbrepository = bbrepository;
        }

        async Task<IEnumerable<Antigen>> IAntigenService.GetAllObjectsAsync()
        {
            return await _bbrepository.GetAllAsync<Antigen>();
        }

        public async Task<Antigen?> GetObjectByIdAsync(string isbtNumber) 
        {
            return await _bbrepository.GetObjectAsync<Antigen, string>(isbtNumber);
        }

        public async Task CreateObjectAsync(Antigen antigen)
        {
            await _bbrepository.CreateObjectAsync<Antigen>(antigen);
        }

        public async Task EditObjectAsync(Antigen antigen)
        {
            await _bbrepository.EditObjectAsync<Antigen>(antigen);
        }

        public async Task DeleteObjectAsync(Antigen antigen)
        {
            await _bbrepository.DeleteObjectAsync<Antigen>(antigen);
        }
    }
} 