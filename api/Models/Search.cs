using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace api.Models
{
    public class Search
    {
        [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(45)]
    public string UserId { get; set; }

    [MaxLength(45)]
    public string SearchName { get; set; }

    [MaxLength(45)]
    public string SearchUrl { get; set; }

    public bool IsActive { get; set; } = false;

    public int NotificationFrequency { get; set; } = 30;

    // Navigation property for the related user
    [ForeignKey("UserId")]
    public AppUser User { get; set; }

    }

}