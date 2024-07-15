import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project/project.service';
import { Project } from '../models/project_model';
import {signal} from '@angular/core';
import { Employee } from '../models/employee_model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  constructor(private projectService: ProjectService) {}
  
  readonly panelOpenState = signal(false);
  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    }); 
  }

  getEmployeeNames(employees: Employee[]): string {
    return employees.map(employee => employee.employeeName).join(', ');
  }

}
