using Microsoft.AspNetCore.Mvc;

namespace topicr.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(string link = null)
        {
            return View();
        }
    }
}
