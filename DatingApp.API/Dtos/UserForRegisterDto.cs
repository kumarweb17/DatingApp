using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
     //[Required(ErrorMessage = "Username Name should not be empty")]
       public string Username {get; set;} 

       [Required]
       [StringLength(8, MinimumLength=2,ErrorMessage="Password Should Between 2 and 8 chars")]
     
        //[RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Special character should not be entered")]
        public string Password {get; set;} 
    }
}