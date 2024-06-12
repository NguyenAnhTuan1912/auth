namespace Core.Models
{
    public class CodeType
    {
        public static string ActiveEmailCode = "active-email-code";
    }

    public class CodeModel
    {
        public Guid id { get; set; }
        public string code { get; set; }
        public Int32 expire { get; set; }
        public string type { get; set; }
    }
}
