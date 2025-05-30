using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBTools.Application.Interfaces
{
    public interface IAntigenCalculatorService
    {
        Task<Dictionary<string, decimal>> GetAntigenFrequenciesAsync();

    }
}
