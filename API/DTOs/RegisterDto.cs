namespace API ;
using System.ComponentModel.DataAnnotations;

public class RegisterDto
{
    [Required]
    public required string Username { get; set; }
    [Required]
    public required string Password { get; set; }
}