using System.ComponentModel.DataAnnotations;

namespace Core.DataTransferModels
{
    public class RegisterUserDTModel
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string confirmedPassword { get; set; }
        [Required]
        public string email { get; set; }
    }
}
