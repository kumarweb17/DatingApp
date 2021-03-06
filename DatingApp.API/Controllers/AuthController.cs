using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config,IMapper mapper)
        {
           _mapper = mapper;
           
           _config = config;
           _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("User Already Exists");

            var UserToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var CreatedUser = await _repo.Register(UserToCreate, userForRegisterDto.Password);

            return StatusCode(201);

        }


        [HttpPost("login")]

        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {

            var UserFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
            if (UserFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
               new Claim(ClaimTypes.NameIdentifier, UserFromRepo.Id.ToString()),
               new Claim(ClaimTypes.Name,UserFromRepo.Username)
            };


    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

    var creds= new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

    var tokenDescripor= new SecurityTokenDescriptor{
         
           Subject = new ClaimsIdentity(claims),
           Expires =DateTime.Now.AddDays(1),
           SigningCredentials=creds
            };
    var tokenHandler=new JwtSecurityTokenHandler();

    var token=tokenHandler.CreateToken(tokenDescripor);

    var user =_mapper.Map<UserForListDto>(UserFromRepo);

    return Ok(new {
        token = tokenHandler.WriteToken(token),
        user
        });
            
        }
    }
}