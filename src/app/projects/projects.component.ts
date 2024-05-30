import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project_model'
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from '../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee_model';
import { EmployeeService } from '../services/employee/employee.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  isCreateProject: boolean = true;

  project: any;

  static lastId = 0;

  employees: Employee[] = [];
  projLeaders: Employee[] = [];

  constructor(private projectService: ProjectService, private router: Router,
    private employeeService: EmployeeService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getEmployees();
    this.project = this.activatedRoute.snapshot.data['project'];

    console.log(this.project)

    if (this.project && this.project.id > 0) {
      this.isCreateProject = false;
    } else {
      this.isCreateProject;
    }
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
        this.getProjLeaders();
      },
      error => console.error(error)
    );
  }

  getProjLeaders(): void {
    this.projLeaders = this.employees.filter(employee => employee.projLead);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onSelectionChange(event: MatSelectChange) {
    this.project.projLeadName = event.value.join(', ');
  }

  saveProject(projectForm: NgForm): void {

    if (this.isCreateProject) {
      ProjectsComponent.lastId++;
      this.project.id = ProjectsComponent.lastId;

      this.projectService.saveProject(this.project).subscribe(
        {
          next: (res: Project) => {
            console.log(res);
            projectForm.reset();
            this.employees = [];
            this.projLeaders = [];
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      );
    } else {
      this.projectService.updateProject(this.project, this.project.id).subscribe(
        {
          next: (res: Project) => {
            this.router.navigate(["/projects-list"]);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }

      )
    }

  }
}
