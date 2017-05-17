using System;
using System.Collections.Generic;

namespace topicr.Models
{
    public class Poll
    {
        public Poll()
        {
            CreatedDateTime = DateTime.Now;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public DateTime CreatedDateTime { get; set; }

        public virtual ICollection<Alternative> Alternatives { get; set; }
    }
}
