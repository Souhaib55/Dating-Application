using API.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        // Constructor Injection for IConfiguration
        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string CreateToken(AppUser user)
        {
            // Access the token key from appsettings.json
            var tokenKey = _config["TokenKey"] ?? throw new Exception("Cannot access TokenKey from appsettings.json");
            if (tokenKey.Length < 64) throw new Exception("You Token key needs to be longer");

            // Create a symmetric security key using the token key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            // Define claims (information about the user)
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName ?? "UnknownUser")
            };

            // Create signing credentials with the security key and HMAC-SHA512 algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Define the security token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7), // Token expiration set to 7 days
                SigningCredentials = creds
            };

            // Generate the token using JwtSecurityTokenHandler
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Return the generated JWT token as a string
            return tokenHandler.WriteToken(token);
        }
    }
}
