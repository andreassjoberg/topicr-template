namespace topicr.Models
{
    public class Reply
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public int AlternativeId { get; set; }
        public virtual Alternative Alternative { get; set; }
    }
}
