using Microsoft.EntityFrameworkCore;

namespace topicr.Models
{
    public class TopicContext : DbContext
    {
        public TopicContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Topic> Topics { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}