using System;
using System.Collections.Generic;

namespace topicr.Models
{
    public class Topic
    {
        public Topic()
        {
            CreatedDateTime = DateTime.Now;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDateTime { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}