using CovidBackend.Database;
using CovidBackend.Services;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CovidBackend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DealController : ApiController
    {
        [HttpPost]
        public IHttpActionResult AddNewDeal(Deal deal)
        {
            return Json(new DealService().AddDeal(deal));
        }
    }
}
