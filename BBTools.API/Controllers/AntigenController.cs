using Microsoft.AspNetCore.Mvc;
using BBTools.Application.Interfaces;
using BBTools.Domain.Models;

namespace BBTools.API.Controllers
{
    public class AntigenController : GenericController<Antigen>
    {
        public AntigenController(IAntigenService service) : base(service)
        {
        }

        protected override string GetEntityId(Antigen entity)
        {
            return entity.ISBTNumber;
        }
    }
} 