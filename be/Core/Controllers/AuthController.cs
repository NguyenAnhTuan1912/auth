using Microsoft.AspNetCore.Mvc;
using Core.Contexts;
using Core.DataTransferModels;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Core.Utils;
using MailKit.Security;
using MailKit.Net.Smtp;
using MimeKit.Text;
using MimeKit;
using static Org.BouncyCastle.Math.EC.ECCurve;
using System.Text;

namespace Core.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly MainDBContext __db;
        private readonly IConfiguration __config;

        public AuthController(MainDBContext db, IConfiguration config)
        {
            __db = db;
            __config = config;
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
            HTTPResponseDataDTModel<Object> response = new HTTPResponseDataDTModel<Object>();

            try
            {
                // 1. Check if user is null
                if (registra == null)
                    throw new Exception("User information is null");

                // 2. Check if username exist
                bool doesUserExist = await __db.Users.AnyAsync(u => u.username.Equals(registra.username));
                if (doesUserExist)
                    throw new Exception("This username existed");

                // 3. Check if email exist
                doesUserExist = await __db.Users.AnyAsync(u => u.email.Equals(registra.email));
                if (doesUserExist)
                    throw new Exception("This email is used to sign up before");

                // 4. Check password and confirm password
                if (registra.confirmedPassword != registra.password)
                    throw new Exception("Confirmed Password and Password doesn't match");

                UserModel newUser = new UserModel
                {
                    username = registra.username,
                    email = registra.email,
                    password = registra.password,
                    isActive = false
                };

                // Generate active code
                string codeContent = StringUtil.GenerateRandomly();
                int expirePeriod = 65;

                CodeModel activeCode = new CodeModel
                {
                    code = codeContent,
                    type = CodeType.ActiveEmailCode,
                    expire = DateTimeUtil.GetUnixTimestamp() + expirePeriod
                };

                // Repare mail
                var email = new MimeMessage();

                email.From.Add(MailboxAddress.Parse(__config.GetSection("EmailHost").Value));
                email.To.Add(MailboxAddress.Parse(registra.email));

                email.Subject = "Welcome to our ecosystem!!";

                StringBuilder body = new StringBuilder();

                body.Append("<html>");
                body.Append("<body>");
                body.Append($"<h4>Welcome to our ecosystem!!</h4>");
                body.Append("<h4>Thank you for your registering!</h4>");
                body.Append("<img src='https://vcdn1-vnexpress.vnecdn.net/2018/01/19/cach-noi-cam-on-trong-tieng-An-3448-1985-1516356573.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=vakSrmLja-2-toizNzfKPw' style={{width :250px; height=250px;}} />");
                body.Append($"<p>Your activation code: <strong>{codeContent}</strong></p>");
                body.Append("<p>This link will be valid for 60 seconds, please don't share this code and verify as quick as you can!!</p>");
                body.Append("<h4>Best Regards, ??? team !</h4>");
                body.Append("</body>");
                body.Append("</html>");

                email.Body = new TextPart(TextFormat.Html) { Text = body.ToString() };

                SmtpClient smtp = new SmtpClient();
                smtp.Connect(__config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(__config.GetSection("EmailUserName").Value, __config.GetSection("EmailPassword").Value);
                await smtp.SendAsync(email);
                smtp.Disconnect(true);

                var data = new { expire = expirePeriod };

                // Write to Codes table and save change
                // Write to Users table and save change
                await __db.Codes.AddAsync(activeCode);
                await __db.Users.AddAsync(newUser);
                await __db.SaveChangesAsync();

                response.code = StatusCodes.Status200OK;
                response.setSuccess("You sign up successfully", data);

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.code = StatusCodes.Status400BadRequest;
                response.setError(ex.Message, null);

                return BadRequest(response);
            }
        }

        [HttpPost("activate-account")]
        public async Task<IActionResult> ActiveAccount([FromBody] ActivationDTModel activation)
        {
            HTTPResponseDataDTModel<Object> response = new HTTPResponseDataDTModel<Object>();

            try
            {
                // 1. Check if code exist
                CodeModel? code = await __db.Codes.FirstOrDefaultAsync(c => c.code.Equals(activation.code));
                if (code == null)
                    throw new Exception("Activation code does't exist");

                // 2. Check if code is valid type
                if (code.type != CodeType.ActiveEmailCode)
                    throw new Exception("This code isn't used for active account");

                // 3. Check code expiration
                if (code.expire <= DateTimeUtil.GetUnixTimestamp())
                    throw new Exception("Your activation code is expired");

                UserModel user = await __db.Users.FirstOrDefaultAsync(u => u.username.Equals(activation.username));
                user.isActive = true;

                // Remove code from table and save change
                // Update user and save change
                __db.Codes.Remove(code);
                __db.Users.Update(user);
                await __db.SaveChangesAsync();

                response.code = StatusCodes.Status200OK;
                response.setSuccess("You activate your account successfully", null);

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.code = StatusCodes.Status400BadRequest;
                response.setError(ex.Message, null);

                return BadRequest(response);
            }
        }
    }
}
