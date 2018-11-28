using System;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

              user.PasswordHash=passwordHash;
              user.PasswordSalt=passwordSalt;

              await _context.AddAsync(user);
              await _context.SaveChangesAsync();

                return user;
        }

       

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            // hash based message authentication code
            using(var hmac= new System.Security.Cryptography.HMACSHA512())
            {

                     passwordSalt=hmac.Key;
                     passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        public Task<User> Login(string username, string password)
        {
            throw new NotImplementedException();
        }

         public Task<User> UserExists(string username)
        {
            throw new NotImplementedException();
        }


    }
}