using CovidBackend.Database;
using CovidBackend.Models;
using CovidBackend.Services;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CovidBackend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DealController : ApiController
    {
        [HttpPost]
        [ActionName("AddNewDeal")]
        public IHttpActionResult AddNewDeal(Deal deal)
        {
            return Json(new DealService().AddDeal(deal));
        }

        [HttpGet]
        [ActionName("GetDeals")]
        public IHttpActionResult GetDeals()
        {
            return Json(new DealService().GetAllDeals());
        }

        [HttpPost]
        [ActionName("UserBuyDeal")]
        public IHttpActionResult UserBuyDeal([FromBody]BuyDealModel buyDealModel)
        {
            return Json(new DealService().BuyDeal(buyDealModel));
        }

        [HttpPost]
        [ActionName("CloseDeal")]
        public IHttpActionResult CloseDeal([FromBody]CloseDealInput closeDealInput)
        {
            return Json(new DealService().CloseDeal(closeDealInput));
        }
    }
}
