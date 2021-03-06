using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApiRestAldeas.Entities;
using ApiRestAldeas.EntityFrame;
using ApiRestAldeas.Factory;
using ApiRestAldeas.Helper;
using ApiRestAldeas.Repositories;
using ApiRestAldeas.Services;
using ApiRestAldeasPresupuesto.Repositories;
using ApiRestAldeasPresupuesto.Repositories.GestionPresupuesto;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ApiRestAldeas
{
    public class Startup
    {
        /// <summary>
        /// interface relacionada con la configuracion de la Api
        /// </summary>
        public IConfiguration Configuration { get; private set; }

        /// <summary>
        /// Interface relacionado con el entorno de la Api.
        /// </summary>
        public IHostEnvironment HostingEnvironment { get; private set; }

        
        public Startup(IHostEnvironment env)
        {
            if(env != null)
            {
                this.HostingEnvironment = env;
                var builder = new ConfigurationBuilder()
                    .SetBasePath(env.ContentRootPath)
                    .AddJsonFile($"{env.ContentRootPath}/appsettings.json", optional: true)
                    .AddEnvironmentVariables();
                Configuration = builder.Build();

            }
        }

     

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddConfigureService(this.Configuration);
            services.AddOptions();
            var value = this.Configuration.GetSection("CorsOrigins:Aldea").Value.Split(',');
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder
                            .WithOrigins(value)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                           

                    });
             

            });
            services.AddSwaggerGen();
            services.AddSingletonServices();
            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddScoped(typeof(IContextFactory), typeof(ContextFactory));
            services.AddScoped(typeof(IDataModelRepository), typeof(DataModelRepository));
            services.AddScoped(typeof(IDataModelPresupuesto), typeof(DataModelPresupuesto));
            services.AddScoped(typeof(IDataGestionPresupuesto), typeof(DataGestionPresupuesto));


            // configure DI for application services para el llamado al servicio de 
            services.AddScoped<IUserService, UserService>();

            services.AddDbContext<Aldeas_Context>();
            services.AddControllers();
            services.AddMvc(options=> {
                options.InputFormatters.Add(new BypassFormDataInputFormatter());
            });
      
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
          

            app.UseHttpsRedirection();
            app.UseCors("AllowAllOrigins");
          
            app.UseRouting();
           
            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });



            //para el tema de autorizacion.
            app.UseMiddleware<JwtMiddleware>();

            string swaggerEndPoint = Configuration.GetSection("SwaggerMap").GetSection("EndPoint").Value;
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(swaggerEndPoint, "API  Presupuesto V1");

            });
          

        }
    }
}
