using Org.BouncyCastle.Asn1.Ocsp;

namespace Core.DataTransferModels
{
    public class ResponseData<T>
    {
        public T? data {  get; set; }
        public string message { get; set; }
    }

    public class HTTPResponseDataDTModel<T>
    {
        public int code { get; set; } = 200;
        public ResponseData<T> error { get; set; }
        public ResponseData<T> success { get; set; }
    
        public void setError(string message, T? data)
        {
            error = new ResponseData<T>
            {
                data = data,
                message = message
            };
        }

        public void setSuccess(string message, T? data)
        {
            success = new ResponseData<T>
            {
                data = data,
                message = message
            };
        }
    }
}
