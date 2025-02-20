using API.Entities;

namespace API;

public interface ITokenService
{
    string CreateToken(AppUser user); // Changed from Task<string> to string
}