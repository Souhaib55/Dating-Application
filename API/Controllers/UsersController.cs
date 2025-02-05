using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore; // Ensure this is included for ToListAsync()/FindAsync()

namespace API.Controllers;

[Authorize]

public class UsersController : BaseApiController
{
    private readonly DataContext _context;
    
    public UsersController(DataContext context)
    {
        _context = context;
    }
    
    [AllowAnonymous]
    [HttpGet]
    public ActionResult<IEnumerable<AppUser>> GetUsers()
    {
        var users = _context.Users.ToList();
        return users; 
    }

    [Authorize]
    [HttpGet("{id}")]
    public ActionResult<AppUser> GetUser(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null) return NotFound();
        return user; // Implicit OkResult wrapping
    }
}