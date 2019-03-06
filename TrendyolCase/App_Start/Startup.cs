using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;
using TrendyolCase;

[assembly: OwinStartup(typeof(Startup))]

namespace TrendyolCase
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR("/signalr_engine", new HubConfiguration
            {
                EnableDetailedErrors = true
            });

            //app.Map("/signalr_engine", map =>
            //{
            //    map.UseCors(CorsOptions.AllowAll); //TODO
            //    var hubConfiguration = new HubConfiguration
            //    {
            //        EnableDetailedErrors = true
            //    };
            //    map.RunSignalR(hubConfiguration);
            //});
        }
    }
}
