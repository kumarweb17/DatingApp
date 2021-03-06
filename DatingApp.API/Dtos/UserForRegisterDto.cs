using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
     //[Required(ErrorMessage = "Username Name should not be empty")]
       public string Username {get; set;} 

       [Required]
       [StringLength(8, MinimumLength=6,ErrorMessage="Password Should Between 4 and 8 chars")]
     
        //[RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Special character should not be entered")]
        public string Password {get; set;} 
    }
}