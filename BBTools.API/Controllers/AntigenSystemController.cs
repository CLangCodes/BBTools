using Microsoft.AspNetCore.Mvc;
using BBTools.Application.Interfaces;
using BBTools.Domain.Models;

namespace BBTools.API.Controllers
{
    public class AntigenSystemController : GenericController<AntigenSystem>
    {
        public AntigenSystemController(IAntigenSystemService service) : base(service)
        {
        }

        protected override string GetEntityId(AntigenSystem entity)
        {
            return entity.SystemId.ToString();
        }
    }
} 