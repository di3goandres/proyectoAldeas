using System;
using ApiRestAldeas.Entities;
using ApiRestAldeas.Repositories;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using static ApiRestAldeas.Entities.Appsettings;

namespace ApiRestAldeas.Services
{
    public static class ConfigureService
    {

        public static void AddConfigureService(this IServiceCollection services,
            IConfiguration Configuration)
        {
            if(Configuration!= null)
            {
                var connexion = Configuration.GetSection("ConnectionDB");
                services.Configure<ConnectionDB>(Configuration.GetSection("ConnectionDB"));
                services.Configure<Token>(Configuration.GetSection("Token"));
                services.Configure<LdapConfig>(Configuration.GetSection("Ldap"));


            }
        }
        
        /// <summary>
        /// Configuaracion para permitir el llamado a las operaciones
        /// </summary>
        /// <param name="services"></param>
        public static void AddCorsService(this IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .WithOrigins("http://10.4.0.159/");



                    });
            });
           
        }

        public static void AddSingletonServices(this IServiceCollection services)
        {
            services.AddSingleton<IDataModelRepository, DataModelRepository>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

        }

      
    }
}
