

using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class SearchUpdateDto
    {
        public int Id { get; set; }  // Identifier for the search

        [Required]
        [MaxLength(45)]
        public string UserId { get; set; }  // Identifier for the user

        [MaxLength(45)]
        public string SearchName { get; set; }  // Name of the search

        [MaxLength(45)]
        public string SearchUrl { get; set; }  // URL of the search

        public bool IsActive { get; set; } = false;  // Indicates if the search is active

        public int NotificationFrequency { get; set; } = 30;  // Frequency of notifications
    }
}
