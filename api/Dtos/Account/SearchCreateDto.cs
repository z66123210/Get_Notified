using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Models;

namespace api.Dtos
{
        public class SearchCreateDto
        {
            public int Id { get; set; }

            [Required]
            [MaxLength(45)]
            public string SearchName { get; set; } = null!;

            [Required]
            [MaxLength(45)]
            public string SearchUrl { get; set; } = null!;
            
            public bool IsActive { get; set; } = false;

            public int NotificationFrequency { get; set; } = 30;

        }

    
}

