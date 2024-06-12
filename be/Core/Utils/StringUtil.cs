namespace Core.Utils
{
    public class StringUtil
    {
        public static string GenerateRandomly()
        {
            string str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string separator = "-";
            string result = "";
            Random rnd = new Random();
            int len = str.Length;
            int partLen = 5;
            int partQuantity = 3;

            for (int i = 0; i < partQuantity; i++)
            {
                for (int j = 0; j < partLen; j++)
                {
                    result += str[rnd.Next(len)];
                }

                if (i < partQuantity - 1)
                {
                    result += separator;
                }
            }

            return result;
        }
    }
}
