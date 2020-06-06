using CovidBackend.Database;
using CovidBackend.Services;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CovidBackend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
        public IHttpActionResult LoginUser(string name, string password)
        {
            return Json(new UserService().LoginUser(name, password));
        }

        [HttpGet]
        [ActionName("RefreshLoggedUser")]
        public IHttpActionResult RefreshLoggedUser(int id)
        {
            return Json(new UserService().GetUserById(id));
        }
    }
}
