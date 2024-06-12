using Microsoft.AspNetCore.Mvc;
using Core.Contexts;
using Core.DataTransferModels;

namespace Core.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private MainDBContext __db;

        public AuthController(MainDBContext db)
        {
            __db = db;
        }
        public async Task<IActionResult> Handshake()
        {
            HTTPResponseDataDTModel<string> response = new HTTPResponseDataDTModel<string>();
            response.code = StatusCodes.Status200OK;
            response.setSuccess("Hello from server", null);
            return Ok(response);
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> Signup([FromBody] RegisterUserDTModel registra)
        {
            try
            {

                await __db.SaveChangesAsync();
                return Ok("You sign up successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
