using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using topicr.ContractResolvers;
using topicr.Models;

namespace topicr
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

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
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStatusCodePagesWithReExecute("/error/{0}");
            app.UseStaticFiles();

            app.UseMvc(routes =>
                       {
                           routes.MapRoute("default", "", new { controller = "Home", action = "Index" });
                           routes.MapRoute("poll", "p/{link}", new { controller = "Home", action = "Index" });
                       });

            app.UseWebSockets();
            app.UseSignalR();
        }
    }
}
