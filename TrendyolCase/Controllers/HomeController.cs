using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TrendyolCase.Controllers
{
    [RoutePrefix("")]
    public class HomeController : Controller
    {
        [Route]
        public ActionResult Index()
        {
            return View();
        }

        [Route("poker-planning-add-story-list")]
        public ActionResult PokerPlanningAddStoryList()
        {
            return View();
        }

        [Route("poker-planning-view-as-scrummaster")]
        public ActionResult PokerPlanningViewAsScrumMaster()
        {
            return View();
        }
        [Route("poker-planning-view-as-developer")]
        public ActionResult PokerPlanningViewAsDeveloper()
        {
            return View();
        }
    }
}