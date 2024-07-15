import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project/project.service';
import { Project } from '../models/project_model';
import {signal} from '@angular/core';
import { Employee } from '../models/employee_model';
import { ThemeService } from '../services/theme.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  constructor(private projectService: ProjectService, private themeService: ThemeService) {}
  
  readonly panelOpenState = signal(false);
  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    }); 
    this.themeService.loadTheme();
    this.themeService.isLightTheme$.subscribe(isLight => {
      if (isLight) {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      }
    });
  }
  

  getEmployeeNames(employees: Employee[]): string {
    return employees.map(employee => employee.employeeName).join(', ');
  }

}
