using System;

namespace topicr.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDateTime { get; set; }

        public int TopicId { get; set; }
        public virtual Topic Topic { get; set; }
    }
}