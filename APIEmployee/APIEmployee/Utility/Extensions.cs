using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIEmployee.Utility
{
    public static class Extensions
    {
        public static bool ContainsWithIgnoreCase(this string text, string value,
            StringComparison stringComparison = StringComparison.CurrentCultureIgnoreCase)
        {
            return text.IndexOf(value, stringComparison) >= 0;
        }
    }
}