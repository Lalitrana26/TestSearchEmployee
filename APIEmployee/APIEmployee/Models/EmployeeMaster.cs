using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIEmployee.Models
{

    public class EmployeeMaster
    {
        [Key, Column(Order = 0)]
        public int Sno { get; set; }
        public string Name { get; set; }
        public string JobTitle { get; set; }
        public int Age { get; set; }
        public DateTime EmploymentStartDate { get; set; }
        public DateTime EmploymentEndDate { get; set; }
        
    }
}