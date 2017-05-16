using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using topicr.Hubs;
using topicr.Models;

namespace topicr.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/topics")]
    public class TopicController : Controller
    {
        private readonly TopicContext _db;
        private readonly IConnectionManager _connectionManager;

        public TopicController(TopicContext db, IConnectionManager connectionManager)
        {
            _db = db;
            _connectionManager = connectionManager;
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
        public IActionResult PostTopic([FromBody] Topic topic)
        {
            _db.Topics.Add(topic);
            _db.SaveChanges();
            _connectionManager.GetHubContext<TopicsHub>().Clients.All.refreshTopics();
            return Ok();
        }

        [HttpPost]
        [Route("clear")]
        public IActionResult ClearTopics()
        {
            foreach (var topic in _db.Topics)
            {
                _db.Topics.Remove(topic);
            }
            _db.SaveChanges();
            _connectionManager.GetHubContext<TopicsHub>().Clients.All.refreshTopics();
            return Ok();
        }
    }
}
