using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TrendyolCase.Startup))]
namespace TrendyolCase
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}