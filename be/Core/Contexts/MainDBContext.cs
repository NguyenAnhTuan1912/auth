using Microsoft.EntityFrameworkCore;
using Core.Models;
using System;

namespace Core.Contexts
{
    public class MainDBContext : DbContext
    {
        public MainDBContext(DbContextOptions<MainDBContext> options) : base(options) { }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<CodeModel> Codes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Create Users Table
            builder.Entity<UserModel>().ToTable("users");
            builder.Entity<CodeModel>().ToTable("codes");
        }
    }
}
