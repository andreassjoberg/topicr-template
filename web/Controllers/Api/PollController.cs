using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using topicr.Hubs;
using topicr.Models;

namespace topicr.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PollController : Controller
    {
        private readonly PollContext _db;
        private readonly IConnectionManager _connectionManager;

        public PollController(PollContext db, IConnectionManager connectionManager)
        {
            _db = db;
            _connectionManager = connectionManager;
        }

        [HttpGet]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Get()
        {
            return Json(_db.Polls
                           .Select(p => new
                                        {
                                            p.Id,
                                            p.Title,
                                            p.Description,
                                            Alternatives = p.Alternatives
                                                            .Select(a => new
                                                                         {
                                                                             a.Id,
                                                                             a.Description
                                                                         })
                                                            .ToList()
                                        })
                           .ToList());
        }

        [HttpPost]
        [Route("new")]
        public IActionResult PostTopic([FromBody] Poll poll)
        {
            _db.Polls.Add(poll);
            _db.SaveChanges();
            _connectionManager.GetHubContext<PollsHub>().Clients.All.refreshTopics();
            return Ok();
        }

        [HttpPost]
        [Route("clear")]
        public IActionResult ClearPolls()
        {
            foreach (var topic in _db.Polls)
            {
                _db.Polls.Remove(topic);
            }
            _db.SaveChanges();
            _connectionManager.GetHubContext<PollsHub>().Clients.All.refreshTopics();
            return Ok();
        }
    }
}
