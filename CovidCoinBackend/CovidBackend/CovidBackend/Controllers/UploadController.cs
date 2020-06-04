using System.IO;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CovidBackend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UploadController : ApiController
    {
        [HttpPost()]
        public IHttpActionResult UploadFiles()
        {
            string sPath = "";
            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Images/");
            var request = System.Web.HttpContext.Current.Request;
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];
                if (hpf.ContentLength > 0)
                {
                    string FileName = (Path.GetFileName(hpf.FileName));
                    if (!File.Exists(sPath + FileName))
                    {
                        hpf.SaveAs(sPath + FileName);
                        return Json(FileName);
                    }
                }
            }
            return Json("Upload Failed");
        }
    }
}
