using Microsoft.AspNetCore.Mvc;
using System.Linq;
using topicr.Models;

namespace topicr.Controllers
{
    public class HomeController : Controller
    {
        private readonly TopicContext _topicContext;

        public HomeController(TopicContext topicContext)
        {
            _topicContext = topicContext;
        }

        public IActionResult Index()
        {
            return View(_topicContext.Topics
                                     .Take(100)
                                     .ToList());
        }

        [Route("topics")]
        public ActionResult GetTopics()
        {
            return Json(_topicContext.Topics
                                     .Take(100)
                                     .ToList());
        }

        [Route("topics/new")]
        public ActionResult AddTopic(Topic topic)
        {
            _topicContext.Topics.Add(topic);
            return Ok();
        }
    }
}