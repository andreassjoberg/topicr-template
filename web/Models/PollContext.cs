using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

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

    /// <summary>
    ///     Used when running Update-Database (Azure)
    /// </summary>
    public class PollContextFactory : IDesignTimeDbContextFactory<PollContext>
    {
        public PollContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<PollContext>();
            builder.UseSqlServer("<ConnectionString>");
            return new PollContext(builder.Options);
        }
    }
}
