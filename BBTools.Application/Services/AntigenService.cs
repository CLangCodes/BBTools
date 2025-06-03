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

        public async Task<IEnumerable<Antigen>> GetAllObjectsAsync()
        {
            return await _bbrepository.GetAllAsync<Antigen>();
        }

        public async Task<Antigen?> GetObjectByIdAsync(string isbtNumber) 
        {
            return await _bbrepository.GetObjectAsync<Antigen, string>(isbtNumber);
        }

        public async Task CreateObjectAsync(Antigen antigen)
        {
            // Check if antigen with same ISBTNumber already exists
            var existingAntigen = await _bbrepository.GetObjectAsync<Antigen, string>(antigen.ISBTNumber);
            if (existingAntigen != null)
            {
                throw new InvalidOperationException($"An antigen with ISBT Number '{antigen.ISBTNumber}' already exists.");
            }

            await _bbrepository.CreateObjectAsync<Antigen>(antigen);
        }

        public async Task EditObjectAsync(Antigen antigen)
        {
            // Check if antigen exists
            var existingAntigen = await _bbrepository.GetObjectAsync<Antigen, string>(antigen.ISBTNumber);
            if (existingAntigen == null)
            {
                throw new InvalidOperationException($"Antigen with ISBT Number '{antigen.ISBTNumber}' not found.");
            }

            await _bbrepository.EditObjectAsync<Antigen>(antigen);
        }

        public async Task DeleteObjectAsync(Antigen antigen)
        {
            // Check if antigen exists
            var existingAntigen = await _bbrepository.GetObjectAsync<Antigen, string>(antigen.ISBTNumber);
            if (existingAntigen == null)
            {
                throw new InvalidOperationException($"Antigen with ISBT Number '{antigen.ISBTNumber}' not found.");
            }

            await _bbrepository.DeleteObjectAsync<Antigen>(antigen);
        }
    }
} 