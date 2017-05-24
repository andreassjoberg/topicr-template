using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using topicr.ContractResolvers;
using topicr.Models;

namespace topicr
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // SignalR
            services.Add(new ServiceDescriptor(typeof(JsonSerializer), provider => JsonSerializer.Create(new JsonSerializerSettings
                                                                                                         {
                                                                                                             ContractResolver = new SignalRContractResolver()
                                                                                                         }), ServiceLifetime.Transient));
            services.AddSignalR(options => { options.Hubs.EnableDetailedErrors = true; });

            // Database
            services.AddDbContext<PollContext>(options =>
                                                    options.UseSqlServer(Configuration.GetConnectionString("PollsDatabase")));


            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
                       {
                           routes.MapRoute("default", "{controller=Home}/{action=Index}");
                           routes.MapRoute("poll", "{link}", new { controller = "Home", action = "Index" });
                       });

            app.UseWebSockets();
            app.UseSignalR();
        }
    }
}
