using BBTools.Application.Interfaces;
using BBTools.Domain.Interfaces;
using BBTools.Domain.Models;

namespace BBTools.Application.Services
{
    public class AntigenSystemService : IAntigenSystemService
    {
        private readonly IRepository _bbrepository;
        public AntigenSystemService(IRepository bbrepository)
        {
            _bbrepository = bbrepository;
        }

        public async Task<IEnumerable<AntigenSystem>> GetAllObjectsAsync()
        {
            return await _bbrepository.GetAllAsync<AntigenSystem>();
        }

        public async Task<AntigenSystem?> GetObjectByIdAsync(string systemId)
        {
            if (!int.TryParse(systemId, out int id))
            {
                throw new ArgumentException("System ID must be a valid integer.");
            }
            return await _bbrepository.GetObjectAsync<AntigenSystem, int>(id);
        }

        public async Task CreateObjectAsync(AntigenSystem antigenSystem)
        {
            // Check if system with same ID already exists
            var existingSystem = await _bbrepository.GetObjectAsync<AntigenSystem, int>(antigenSystem.SystemId);
            if (existingSystem != null)
            {
                throw new InvalidOperationException($"An antigen system with ID '{antigenSystem.SystemId}' already exists.");
            }

            await _bbrepository.CreateObjectAsync<AntigenSystem>(antigenSystem);
        }

        public async Task EditObjectAsync(AntigenSystem antigenSystem)
        {
            // Check if system exists
            var existingSystem = await _bbrepository.GetObjectAsync<AntigenSystem, int>(antigenSystem.SystemId);
            if (existingSystem == null)
            {
                throw new InvalidOperationException($"Antigen system with ID '{antigenSystem.SystemId}' not found.");
            }

            await _bbrepository.EditObjectAsync<AntigenSystem>(antigenSystem);
        }

        public async Task DeleteObjectAsync(AntigenSystem antigenSystem)
        {
            // Check if system exists
            var existingSystem = await _bbrepository.GetObjectAsync<AntigenSystem, int>(antigenSystem.SystemId);
            if (existingSystem == null)
            {
                throw new InvalidOperationException($"Antigen system with ID '{antigenSystem.SystemId}' not found.");
            }

            await _bbrepository.DeleteObjectAsync<AntigenSystem>(antigenSystem);
        }
    }
} 