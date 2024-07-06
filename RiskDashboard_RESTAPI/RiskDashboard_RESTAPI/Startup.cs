using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using RiskDashboard.Api.Services;
using RistDashboard.Api.Entities;
using System.Configuration;
using System.Text;

namespace RiskDashboard_RESTAPI
{
    public class Startup
    {
        /// <summary>
        /// Startup Constructor
        /// </summary>
        /// <param name="configuration"></param>        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        /// <summary>
        /// ConfigureServices
        /// </summary>
        /// <param name="services"></param>
        /// This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddAuthentication(x => {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
             {
                 options.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidIssuer = AppSettings.JWTIssuer,
                     ValidateIssuer = true,
                     ValidateIssuerSigningKey = true,
                     IssuerSigningKey = new SymmetricSecurityKey(
                         Encoding.UTF8.GetBytes(AppSettings.JWTKey)
                     ),
                     ClockSkew = TimeSpan.Zero,
                     ValidateAudience = true,
                     ValidAudience = AppSettings.Audience
                 };
                 options.Events = new JwtBearerEvents
                 {
                     OnAuthenticationFailed = context => {
                         if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                         {
                             context.Response.Headers.Add("IS-TOKEN-EXPIRED", "true");
                         }
                         return Task.CompletedTask;
                     }
                 };
             });
            services.AddSwaggerGen();
            services.AddAutoMapper(typeof(MappingProfile));           
            services.ConfigureSqlContext(Configuration);
            services.ConfigureServices(Configuration);
            services.ConfigureRepositoryWrapper();
            services.AddSingleton<ILog, LogNLog>();

        }

        /// <summary>
        /// Configure
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use(async (context, next) =>
            {
                await next.Invoke();
                if (context.Response.StatusCode == 204)
                {
                    context.Response.ContentLength = 0;
                }
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Risk Portal API V1"));
            }
            else
            {
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
