import { Injectable } from '@angular/core';

import { SearchCriteria } from 'src/Model/SearchCriteria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDetails } from 'src/Model/EmployeeDetails';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private url = 'http://localhost:44330/api/Employees/';
  constructor(private http: HttpClient) { }

  GetEmployee(searchCriteria: SearchCriteria): Observable<EmployeeDetails[]> {
    return this.http.post<EmployeeDetails[]>(this.url, searchCriteria);
  }

}
