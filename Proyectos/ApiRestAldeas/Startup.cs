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
using ApiRestAldeas.Repositories.User;
using ApiRestAldeas.Services;
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
            services.AddScoped(typeof(IUserModelRepository), typeof(UserModelRepository));
            // configure DI for application services para el llamado al servicio de 
            services.AddScoped<IUserService, UserService>();
            services.AddDbContext<Aldeas_Context>();
            services.AddControllers();
            services.AddMvc(options=> {
                options.InputFormatters.Add(new BypassFormDataInputFormatter());
            });
            //// configure strongly typed settings objects
            //var appSettingsSection = Configuration.GetSection("Token");
            //services.Configure<Appsettings>(appSettingsSection);

            //// configure jwt authentication
            //var appSettings = appSettingsSection.Get<Appsettings>();
            //var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            //services.AddAuthentication(x =>
            //{
            //    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //.AddJwtBearer(x =>
            //{
            //    x.RequireHttpsMetadata = false;
            //    x.SaveToken = true;
            //    x.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(key),
            //        ValidateIssuer = false,
            //        ValidateAudience = false
            //    };
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //else
            //{
            //    app.UseExceptionHandler(errorApp =>
            //    {
            //        errorApp.Run(async context =>
            //        {
            //            context.Response.StatusCode = 500;

            //        });
            //    });
            //}

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
                c.SwaggerEndpoint(swaggerEndPoint, "API DataModel V1");

            });
          

        }
    }
}
