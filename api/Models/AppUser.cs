using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {  
        
        [Required]
        [EmailAddress]
        [MaxLength(256)]
        public override string Email { get; set; }

        // Navigation property for related searches
        public ICollection<Search> Searches { get; set; }
    }
}