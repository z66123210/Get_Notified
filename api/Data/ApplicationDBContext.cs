using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
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

        modelBuilder.Entity<Search>(entity =>
        {
            entity.ToTable("searches");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .IsRequired();

            entity.Property(e => e.UserId)
                .HasColumnName("userId")
                .HasMaxLength(45)
                .IsRequired();

            entity.Property(e => e.SearchName)
                .HasColumnName("searchName")
                .HasMaxLength(45)
                .IsRequired(false);

            entity.Property(e => e.SearchUrl)
                .HasColumnName("searchUrl")
                .HasMaxLength(45)
                .IsRequired(false);

            entity.Property(e => e.IsActive)
                .HasColumnName("isActive")
                .HasDefaultValue(false);

            entity.Property(e => e.NotificationFrequency)
                .HasColumnName("notificationFrequency")
                .HasDefaultValue(30);

            entity.HasIndex(e => e.UserId)
                .HasDatabaseName("fk_searches_user");

            entity.HasOne(d => d.User)
                .WithMany(p => p.Searches)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.NoAction)
                .HasConstraintName("fk_searches_user");
        });
    }

    }
}