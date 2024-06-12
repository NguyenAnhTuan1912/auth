using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Core.Models
{
    public class UserModel
    {
        public Guid id { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string email { get; set; }
        public bool isActive { get; set; } = false;
    }
}
