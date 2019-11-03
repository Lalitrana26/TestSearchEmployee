import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeDetails } from 'src/Model/EmployeeDetails';
import { SearchCriteria } from 'src/Model/SearchCriteria';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', []),
    startDate: new FormControl('', []),
    endDate: new FormControl('', [])
  });
  employeeDetailsList: EmployeeDetails[];
  errorText: string;
  showError: boolean;
  startDate: string;
  endDate: string;
  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit() {
  }

  onSubmit() {

    if (this.userForm.get('name').value === '' && this.userForm.get('startDate').value === '' && this.userForm.get('endDate').value=='' ){
        this.errorText = 'Please select either Employee Name or Employment Start and End Date';
        this.showError = true;
        return;
    }
    if (this.userForm.get('startDate').value !== '') {
      if (this.userForm.get('endDate').value ===  '') {
        this.errorText = 'Please select Employment End date';
        this.showError = true;
        return;
      }

    }
    if (this.userForm.get('endDate').value !== '' ) {
      if (this.userForm.get('startDate').value === '') {
        this.errorText = 'Please select Employment Start date';
        this.showError = true;
        return;
      }
      if (!this.checkDate(this.userForm.get('startDate').value, this.userForm.get('endDate').value)) {
        this.errorText = 'Please Enter Valid Date';
        this.showError = true;
        return;
      }
    }

    this.showError = false;

   let model =<SearchCriteria> {
   Name: this.userForm.get('name').value,
   StartDate: this.startDate,
   EndDate: this.endDate
   }

   this.employeeService.GetEmployee(model).subscribe(res=> {
     this.employeeDetailsList = res
   },
   (error) => {
    this.errorText = 'No match found';
    this.showError = true;
    return;
   })
  }

  checkDate(startDate: string,endDate: string){
    let stDate: string[] = startDate.split('/');
    let edDate: string[] = endDate.split('/');
    if (stDate && edDate){
        let newDate: Date = new Date(Number(stDate[2]), Number(stDate[1]) - 1, Number(stDate[0]));
        let endDate: Date = new Date(Number(edDate[2]), Number(edDate[1]) - 1, Number(edDate[0]));
        if(newDate.getDate() && endDate.getDate()){
          if (newDate > endDate) {
            return false;
          }
          this.startDate = this.convertdate(newDate);
          this.endDate = this.convertdate(endDate);
          return true;
        }
    }
    return false;
  }
convertdate(date:Date) {

var day = date.getDate();
var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
var year = date.getFullYear();  // yields year

// After this construct a string with the above results as below
return month  + '/' + day + '/' + year;
}

}
