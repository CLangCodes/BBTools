using Microsoft.AspNetCore.Mvc;
using BBTools.Application.Interfaces;

namespace BBTools.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class GenericController<T> : ControllerBase where T : class
    {
        protected readonly IGenericService<T> _service;

        protected GenericController(IGenericService<T> service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<T>>> GetAll()
        {
            var items = await _service.GetAllObjectsAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetById(string id)
        {
            var item = await _service.GetObjectByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<T>> Create(T entity)
        {
            try
            {
                await _service.CreateObjectAsync(entity);
                return CreatedAtAction(nameof(GetById), new { id = GetEntityId(entity) }, entity);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(T entity)
        {
            try
            {
                await _service.EditObjectAsync(entity);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(T entity)
        {
            try
            {
                await _service.DeleteObjectAsync(entity);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        protected abstract string GetEntityId(T entity);
    }
} 