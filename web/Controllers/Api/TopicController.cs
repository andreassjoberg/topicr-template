using System.Linq;
using Microsoft.AspNetCore.Mvc;
using topicr.Models;

namespace topicr.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/topics")]
    public class TopicController : Controller
    {
        private readonly TopicContext _db;

        public TopicController(TopicContext db)
        {
            _db = db;
        }

        [HttpGet]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult GetTopics()
        {
            return Json(_db.Topics
                           .Select(p => new
                                        {
                                            p.Id,
                                            p.Title,
                                            p.Description
                                        })
                           .ToList());
        }

        [HttpPost]
        [Route("new")]
        public IActionResult PostTopic(Topic topic)
        {
            _db.Topics.Add(topic);
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("clear")]
        public IActionResult ClearTopics()
        {
            foreach (var topic in _db.Topics)
            {
                _db.Topics.Remove(topic);
            }
            _db.SaveChanges();
            return Ok();
        }
    }
}
