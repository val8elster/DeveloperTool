import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../models/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  dataSourceEmp : Employee[] = [];
  dataSourceProj : Project[] = [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'projects', 'employeeEmail', 'projLead', 'employeeSkills', 'edit', 'delete'];
  projects: Project[] = [];
  constructor(private employeeService: EmployeeService, private router: Router, private projectService : ProjectService){
    this.getEmployees();

  }

  ngOnInit(): void {

  }

  getProjectsForEmployee(employee: Employee) {
    this.projectService.getProjects().subscribe((projects: any[]) => {
      this.projects = projects.filter(project => project.employees.employee.id == employee.id);
    });
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      {
        next: (res: Employee[]) => {
          this.dataSourceEmp = res;
          console.log(res)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  deleteEmployees(employeeId: number): void {
    console.log(employeeId);
    this.employeeService.deleteEmployee(employeeId).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.getEmployees();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  updateEmployees(employeeId: number): void {
    this.router.navigate(['/employee', {id: employeeId}]);
  }
}
