using CovidBackend.Models;
using CovidBackend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CovidBackend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LeverageController : ApiController
    {
        [HttpPost]
        [ActionName("UpdateLeverage")]
        public IHttpActionResult UpdateLeverage([FromBody] LeverageInput leverageInput)
        {
            return Json(new LeverageService().UpdateLeverage(leverageInput.leverageId, leverageInput.userId));
        }

        [HttpGet]
        [ActionName("CheckLeverageCount")]
        public IHttpActionResult CheckCountLeverage(int userId)
        {
            return Json(new LeverageService().CheckCountLeverage(userId));
        }
    }

    
}
