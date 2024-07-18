
using api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }
        public DbSet<Search> Searches { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
   

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

       
                // Configure one-to-many relationship and ensure UserId is required
            modelBuilder.Entity<Search>(entity =>
            {   
                entity.HasKey(e => e.Id);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(45);

                entity.Property(e => e.SearchName)
                    .HasMaxLength(45);

                entity.Property(e => e.SearchUrl)
                    .HasMaxLength(45);

                entity.Property(e => e.IsActive)
                    .HasDefaultValue(false);

                entity.Property(e => e.NotificationFrequency)
                    .HasDefaultValue(30);

                entity.HasOne(s => s.User)
                      .WithMany(u => u.Searches)
                      .HasForeignKey(s => s.UserId);

                entity.Property(s => s.UserId)
                      .IsRequired();
            });

            // Add a unique index on the Email column for AppUser
            modelBuilder.Entity<AppUser>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });
        
    }

    }
}