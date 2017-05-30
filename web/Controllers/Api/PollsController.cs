using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
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
        private static Random random = new Random();

        public PollsController(PollContext db, IConnectionManager connectionManager)
        {
            _db = db;
            _connectionManager = connectionManager;
        }

        [HttpGet]
        [Route("{link}/user/{user}")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult GetPoll(string link, string user)
        {
            var poll = _db.Polls
                          .SingleOrDefault(p => p.Link.Equals(link));
            if (poll == null)
            {
                return NotFound();
            }
            var alternatives = _db.Alternatives
                                  .Where(p => p.PollId == poll.Id)
                                  .Include(p => p.Replies)
                                  .ToList();
            var hasVoted = HasVoted(poll.Id, user);
            return Json(new
                        {
                            poll.Id,
                            poll.Title,
                            poll.Description,
                            poll.Link,
                            HasVoted = hasVoted,
                            Alternatives = alternatives?
                                .Select(a => new
                                             {
                                                 a.Id,
                                                 a.Description,
                                                 Votes = a.Replies.Count
                                             })
                                .ToList()
                        });
        }

        [HttpPost]
        [Route("{link}/vote/{alternative:int}/user/{user}")]
        public IActionResult PostVote(string link, int alternative, string user)
        {
            var poll = _db.Polls
                          .SingleOrDefault(p => p.Link.Equals(link));
            if (poll == null)
            {
                return NotFound();
            }
            var alt = _db.Alternatives
                         .SingleOrDefault(p => p.PollId == poll.Id && p.Id == alternative);
            if (alt == null)
            {
                return NotFound();
            }

            if (HasVoted(poll.Id, user))
            {
                return StatusCode(StatusCodes.Status401Unauthorized, new { Message = "You've already voted in this poll." });
            }

            _db.Replies.Add(new Reply
                            {
                                AlternativeId = alt.Id,
                                UserId = user
                            });
            _db.SaveChanges();
            _connectionManager.GetHubContext<PollsHub>().Clients.All.refreshPolls();
            return Ok();
        }

        [HttpPost]
        [Route("{link}/clear")]
        public IActionResult ClearVotes(string link)
        {
            foreach (var reply in _db.Replies
                                     .Where(p => p.Alternative.Poll.Link.Equals(link)))
            {
                _db.Replies.Remove(reply);
            }
            _db.SaveChanges();
            _connectionManager.GetHubContext<PollsHub>().Clients.All.refreshPolls();
            return Ok();
        }

        private bool HasVoted(int pollId, string user)
        {
            var pollAlternatives = _db.Alternatives
                                      .Where(p => p.PollId == pollId)
                                      .Select(p => p.Id)
                                      .ToList();
            return _db.Replies
                      .Any(p => pollAlternatives.Contains(p.AlternativeId) && p.UserId.Equals(user));
        }

        [HttpPost]
        [Route("new")]
        public IActionResult PostPoll([FromBody] Poll poll)
        {
            if (string.IsNullOrWhiteSpace(poll.Title) ||
                string.IsNullOrWhiteSpace(poll.Description) ||
                poll.Alternatives == null ||
                poll.Alternatives.Count == 0 ||
                !poll.Alternatives.Any(p => !string.IsNullOrWhiteSpace(p.Description)))
            {
                return StatusCode(StatusCodes.Status406NotAcceptable);
            }

            poll.Alternatives = poll.Alternatives
                                    .Where(p => !string.IsNullOrWhiteSpace(p.Description))
                                    .ToList();

            string link;
            do
            {
                const string chars = "abcdefghijklmnopqrstuvwxyz";
                link = new string(Enumerable.Repeat(chars, 6)
                                            .Select(s => s[random.Next(s.Length)])
                                            .ToArray());
            } while (_db.Polls.Any(p => p.Link.Equals(link)));

            poll.Link = link;
            _db.Polls.Add(poll);
            _db.SaveChanges();
            return Json(new { link = link });
        }
    }
}
