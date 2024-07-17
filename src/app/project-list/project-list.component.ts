import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from '../services/project/project.service';
import { Project } from '../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  dataSource: Project[] = [];
  displayedColumns: string[] = ['projectId', 'projectName', 'projLeadName', 'employees', 'description', 'reqSkills', 'edit', 'delete'];
  employees : Employee[] = [];

  constructor(private activatedRoute: ActivatedRoute, private projectService : ProjectService, private router: Router, private employeeService: EmployeeService){
    this.getProjects();
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(employeeData => {
      this.employees = employeeData;
    });
  }

  getProjects(): void {
    this.projectService.getAllProjects().subscribe(
      {
        next: (res: Project[]) => {
          this.dataSource = res;
          console.log(res)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      }
    )
  }

  getLeaderNameById( leaderId: number): string {
    const leader = this.employees.find(employee => employee.id === leaderId);
    return leader ? leader.name : 'Leader Not Found';
  }

  updateProject(projectId: number): void {
    console.log(projectId)
    this.router.navigate(['/projects', {id: projectId}])
  }

  deleteProject(projectId: number): void{
    console.log(projectId);
    this.projectService.deleteProject(projectId).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.getProjects();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
}
