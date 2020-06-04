using CovidBackend.Database;
using CovidBackend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CovidBackend.Controllers
{
    public class UserController : ApiController
    {
        [HttpPost]
        public IHttpActionResult AddUser(User u)
        {
            return Json(new UserService().AddUser(u));
        }

        [HttpGet]
        public IHttpActionResult GetUsers()
        {
            return Json(new UserService().GetAllUser());
        }

        [HttpGet]
        public IHttpActionResult LoginUser(string name,string password)
        {
            return Json(new UserService().LoginUser(name,password));
        }
    }
}
