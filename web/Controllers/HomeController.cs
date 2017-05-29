using Microsoft.AspNetCore.Mvc;
using System.Linq;
using topicr.Models;

namespace topicr.Controllers
{
    public class HomeController : Controller
    {
        private readonly PollContext _db;

        public HomeController(PollContext db)
        {
            _db = db;
        }

        public IActionResult Index(string link = null)
        {
            if (!string.IsNullOrWhiteSpace(link) && _db.Polls.Any(p => p.Link.Equals(link)))
            {
                ViewBag.Link = link;
            }
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
