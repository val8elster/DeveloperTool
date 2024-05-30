import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee_model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) {}
   
  api = "http://localhost:3000/employees"

  public saveEmployee(employee: Employee) : Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.api}`, employee);
  }

  public getEmployees() : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.api}`);
  }

  public getEmployee(id: Number){
    return this.httpClient.get<Employee>(`${this.api}/${id}`);
  }

  public deleteEmployee(employeeId: Number){
    return this.httpClient.delete(`${this.api}/${employeeId}`);
  }

  public updateEmployee(employee: Employee, id: Number){
    return this.httpClient.put<Employee>(`${this.api}/${id}`, employee);
  }
}
