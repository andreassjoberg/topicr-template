using System.Collections.Generic;

namespace topicr.Models
{
    public class Alternative
    {
        public int Id { get; set; }
        public string Description { get; set; }

        public int PollId { get; set; }
        public virtual Poll Poll { get; set; }

        public virtual ICollection<Reply> Replies { get; set; }
    }
}
