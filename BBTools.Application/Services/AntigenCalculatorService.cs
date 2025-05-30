using BBTools.Application.Interfaces;
using BBTools.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BBTools.Application.Services
{
    public class AntigenCalculatorService : IAntigenCalculatorService
    {
        public AntigenCalculatorService() { }
        async Task<Dictionary<string, decimal>> IAntigenCalculatorService.GetAntigenFrequenciesAsync()
        {
            var globalAntigenFrequncies = new GlobalAntigenFrequencies();
            var result = typeof(GlobalAntigenFrequencies)
                .GetProperties()
                .ToDictionary(prop => prop.Name, prop => (decimal)prop.GetValue(globalAntigenFrequncies)!);
            return await Task.FromResult(result);
        }
    }
}
