using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using RiskDashboard.Api.Services.ServiceContracts;
using RiskDashboard.Api.Services.Services;
using RiskDashboard.API.Repositories.Repositories.Base;
using RiskDashboard.API.Repositories.RepositoriesContracts.Base;
using RiskDashboard_RESTAPI.Models.Common;
using RistDashboard.Api.Entities;

namespace RiskDashboard_RESTAPI
{
    public static class ServiceExtensions
    {
        /// <summary>
        /// Add Config
        /// </summary>
        /// <typeparam name="TSettings"></typeparam>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static TSettings AddConfig<TSettings>(this IServiceCollection services, IConfiguration configuration)
        where TSettings : class, new()
        {
            return services.AddConfig<TSettings>(configuration, options => { });
        }

        /// <summary>
        /// Add Config
        /// </summary>
        /// <typeparam name="TSettings"></typeparam>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <param name="configureOptions"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public static TSettings AddConfig<TSettings>(this IServiceCollection services, IConfiguration configuration, Action<BinderOptions> configureOptions)
            where TSettings : class, new()
        {
            if (services == null) 
            { 
                throw new ArgumentNullException(nameof(services)); 
            }
            if (configuration == null) 
            { 
                throw new ArgumentNullException(nameof(configuration)); 
            }

            TSettings setting = configuration.Get<TSettings>(configureOptions);
            services.TryAddSingleton(setting);
            return setting;
        }

        /// <summary>
        /// Configure Repository Wrapper
        /// </summary>
        /// <param name="services"></param>
        public static void ConfigureRepositoryWrapper(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
        }

        /// <summary>
        /// Configure Services
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        public static void ConfigureServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddConfig<AppSettings>(config.GetSection("AppSettings"));
            services.AddScoped<IRiskInformationService, RiskInformationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
        }

        /// <summary>
        /// Configure SqlContext
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config.GetConnectionString("RiskDashboardDB");
            if(connectionString != null)
            services.AddDbContext<DatabaseContext>((serviceProvider, dbContextBuilder) =>
                dbContextBuilder.UseSqlServer(connectionString));
        }
    }
}
