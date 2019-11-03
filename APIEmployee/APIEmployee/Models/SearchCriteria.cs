using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIEmployee.Models
{
    public class SearchCriteria
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}