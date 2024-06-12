namespace Core.Utils
{
    public class DateTimeUtil
    {
        public static Int32 GetUnixTimestamp()
        {
            Int32 unixTimestamp = (Int32)(DateTime.Now.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            return unixTimestamp;
        }
    }
}
