using Microsoft.AspNetCore.Mvc;

namespace topicr.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
