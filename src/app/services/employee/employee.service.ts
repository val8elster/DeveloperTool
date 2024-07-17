import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, forkJoin, of, map} from 'rxjs';
import {Employee, Skill} from '../../models/employee.model';
import { Project } from 'src/app/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}
  baseUrl = "http://localhost:8788/employee"
  //baseUrl = "https://elster.dev:8788/employee"

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }

  getEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${employeeId}`);
  }

  checkLogin(employeeId: number, password: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${employeeId}/login/${password}`);
  }

  existsByMail(mail: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/mail/${mail}`);
  }

  existsByUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/name/${username}`);
  }

  getLeadersProject(employeeId: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${employeeId}/project`);
  }

  levelUp(employeeId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${employeeId}/levelUp`, {});
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${employeeId}`);
  }

  collaborate(employeeId: number, projectId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${employeeId}/collaborates/${projectId}`);
  }

  hasSkill(employeeId: number, skill: Skill): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${employeeId}/hasSkill/${skill}`);
  }

  saveEmployee(employee: Employee) : Observable<Employee>{
    return this.http.post<Employee>(`${this.baseUrl}/create`, employee);
  }

  public updateEmployee(employee: Employee, id: Number){
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }
  public updateEmployeeProjects(employees: Employee[], project: Project): Observable<Employee[]> {
    // Map each update operation to an Observable
    const updateOperations = employees.map((employee) => {
      employee.projects.push(project);
      return this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, employee);
    });

    // Use forkJoin to execute all operations simultaneously and wait for all to complete
    return forkJoin(updateOperations);
  }

  getNextId(): Observable<number> {
    return this.getEmployees().pipe(
      map((employees: Employee[]) => {
        const maxId = this.findMaxId(employees);
        return maxId + 1;
      })
    );
  }

  findMaxId(employees: Employee[]): number {
    return employees.reduce((max, employee) => (employee.id > max ? employee.id : max), employees[0]?.id ?? 0);
  }
}
