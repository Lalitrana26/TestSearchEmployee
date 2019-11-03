using APIEmployee.DataBase;
using APIEmployee.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using APIEmployee.Utility;

namespace APIEmployee.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmployeesController : ApiController
    {
        // GET api/values
        public List<string> Get()
        {
            return new List<string> { "Value1", "Value2" };
        }

        // POST api/values
        public IHttpActionResult Post([FromBody] SearchCriteria searchCriteria)
        {
            var dbcontext = new MockEmployeeContext();

            if (
                !string.IsNullOrEmpty(searchCriteria.Name)
                &&
                (
                    (searchCriteria.StartDate == DateTime.MinValue)
                    &&
                    (searchCriteria.EndDate == DateTime.MinValue)
                )
                )
            {
                IEnumerable<EmployeeMaster> list = dbcontext.employee.First().Where(e => e.Name.ContainsWithIgnoreCase(searchCriteria.Name));
                
                if (list.Count() == 0)
                    return NotFound();
                else
                    return Ok(list);
            }
            else if (
                string.IsNullOrEmpty(searchCriteria.Name)
                &&
                (
                    (searchCriteria.StartDate != DateTime.MinValue)
                    &&
                    (searchCriteria.EndDate != DateTime.MinValue)
                )
                )
            {
                IEnumerable<EmployeeMaster> list = dbcontext.employee.ToList().First()
                    .Where(e => e.EmploymentStartDate >= searchCriteria.StartDate
                    && e.EmploymentEndDate <= searchCriteria.EndDate);
                if (list.Count() == 0)
                    return NotFound();
                else
                    return Ok(list);
            }
            else if (
                !string.IsNullOrEmpty(searchCriteria.Name)
                &&
                (
                    (searchCriteria.StartDate != DateTime.MinValue)
                    &&
                    (searchCriteria.EndDate != DateTime.MinValue)
                )
                )
            {
                IEnumerable<EmployeeMaster> list = dbcontext.employee.ToList().First()
                    .Where(e => e.Name.ContainsWithIgnoreCase(searchCriteria.Name)
                    && (e.EmploymentStartDate >= searchCriteria.StartDate
                    && e.EmploymentEndDate <= searchCriteria.EndDate));
                if (list.Count() == 0)
                    return NotFound();
                else
                    return Ok(list);
            }
            else
                return NotFound();
        }
    }
}
