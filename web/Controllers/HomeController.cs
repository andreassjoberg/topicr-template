using Microsoft.AspNetCore.Mvc;

namespace topicr.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
        }

        public IActionResult Index(string link = null)
        {
            if (!string.IsNullOrWhiteSpace(link))
            {
                ViewBag.Link = link;
            }
            return View();
        }

        [HttpGet("/error/{statusCode}")]
        public IActionResult Error(int statusCode)
        {
            return View(statusCode);
        }
    }
}
