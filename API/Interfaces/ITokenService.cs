using API.Entities ;

//namespace Api.Services ;

public interface ITokenService
{
    string CreateToken(AppUser user);
}