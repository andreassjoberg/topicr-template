using Microsoft.AspNetCore.Mvc;
using System.Linq;
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
    }
}