using Microsoft.EntityFrameworkCore;

namespace topicr.Models
{
    public class PollContext : DbContext
    {
        public PollContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Poll>()
                        .HasIndex(p => p.Link)
                        .IsUnique();
        }

        public DbSet<Poll> Polls { get; set; }
        public DbSet<Alternative> Alternatives { get; set; }
        public DbSet<Reply> Replies { get; set; }
    }
}
