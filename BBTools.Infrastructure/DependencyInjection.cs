using BBTools.Domain.Interfaces;
using BBTools.Infrastructure.Data;
using BBTools.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BBTools.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContextFactory<BBContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection") ?? 
                throw new InvalidOperationException("Connection string 'DefaultConnection' not found."),
                sqlOptions => sqlOptions.EnableRetryOnFailure()
            ));

        services.AddScoped<IRepository, BBRepository>();

        return services;
    }
} 