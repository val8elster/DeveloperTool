import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Employee } from '../../models/employee_model';
import { Project } from 'src/app/models/project_model';

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
  public updateEmployeeProjects(employees: Employee[], project: Project): Observable<Employee[]> {
    // Map each update operation to an Observable
    const updateOperations = employees.map((employee) => {
      employee.projects.push(project);
      return this.httpClient.put<Employee>(`${this.api}/${employee.id}`, employee);
    });
  
    // Use forkJoin to execute all operations simultaneously and wait for all to complete
    return forkJoin(updateOperations);
  }
}
