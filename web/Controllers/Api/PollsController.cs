using System;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Microsoft.EntityFrameworkCore;
using topicr.Hubs;
using topicr.Models;

namespace topicr.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PollsController : Controller
    {
        private readonly PollContext _db;
        private readonly IConnectionManager _connectionManager;

        public PollsController(PollContext db, IConnectionManager connectionManager)
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
                                            p.Link,
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

        [HttpGet]
        [Route("{link}")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult GetPoll(string link)
        {
            var poll = _db.Polls
                          .Include(p => p.Alternatives)
                          .SingleOrDefault(p => p.Link.Equals(link));
            if (poll == null)
            {
                return NotFound();
            }
            return Json(new
                        {
                            poll?.Id,
                            poll?.Title,
                            poll?.Description,
                            poll?.Link,
                            Alternatives = poll?.Alternatives?
                                               .Select(a => new
                                                            {
                                                                a.Id,
                                                                a.Description
                                                            })
                                               .ToList()
                        });
        }

        [HttpPost]
        [Route("new")]
        public IActionResult PostPoll([FromBody] Poll poll)
        {
            string link;
            do
            {
                link = Convert.ToBase64String(Encoding.UTF8.GetBytes(Guid.NewGuid()
                                                                         .ToString()
                                                                         .Replace("=", "")
                                                                         .Replace("+", "")
                                                                         .Substring(0, 12)));
            } while (!_db.Polls.Any(p => p.Link.Equals(link)));

            poll.Link = link;
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
