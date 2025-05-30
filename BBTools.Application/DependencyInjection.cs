using BBTools.Application.Interfaces;
using BBTools.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BBTools.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IAntigenCalculatorService, AntigenCalculatorService>();
        // Register application services here
        // Example: services.AddScoped<IYourService, YourService>();

        return services;
    }
} 