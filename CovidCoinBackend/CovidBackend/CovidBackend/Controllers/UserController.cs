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
        [ActionName("AddUser")]
        public IHttpActionResult AddUser(User u)
        {
            return Json(new UserService().AddUser(u));
        }

        [HttpGet]
        [ActionName("GetUsers")]
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
        [ActionName("FindUserById")]
        public IHttpActionResult FindUserById(int id)
        {
            return Json(new UserService().GetUserById(id));
        }

        [HttpGet]
        [ActionName("RefreshLoggedUser")]
        public IHttpActionResult RefreshLoggedUser(int id)
        {
            return Json(new UserService().GetUserById(id));
        }

        [HttpPost]
        [ActionName("EditUser")]
        public IHttpActionResult EditUser(User user)
        {
            return Json(new UserService().EditUser(user));
        }
    }
}
