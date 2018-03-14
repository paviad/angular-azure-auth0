using System;
using System.Collections.Generic;
using System.Linq;
using Hangfire;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Jwt;
using Owin;

[assembly: OwinStartup(typeof(Backend.Startup))]

namespace Backend
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            const string domain = "https://my-auth0-username.eu.auth0.com/";
            var audience = "https://api.my-api-name.com";

            // ConfigureAuth(app);
            var keyResolver = new Auth0.Owin.OpenIdConnectSigningKeyResolver(domain);

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions {
                AuthenticationMode = AuthenticationMode.Active,
                TokenValidationParameters = new System.IdentityModel.Tokens.TokenValidationParameters {
                    ValidAudience = audience,
                    ValidIssuer = domain,
                    IssuerSigningKeyResolver = (token, securityToken, identifier, parameters) => keyResolver.GetSigningKey(identifier)
                },
            });

            Hangfire.GlobalConfiguration.Configuration.UseSqlServerStorage("DefaultConnection", new Hangfire.SqlServer.SqlServerStorageOptions {
                SchemaName = "MyAppHangfire"
            });

            app.UseHangfireDashboard();
            app.UseHangfireServer();
        }
    }
}
