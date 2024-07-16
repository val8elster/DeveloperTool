import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project/project.service';
import { Project } from '../models/project.model';
import {signal} from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee/employee.service';
import { ProjectDescriptionDialogComponent } from '../project-description-dialog/project-description-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Project[] = [];
  employees: Employee[] = [];
  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {
    
  }

  readonly panelOpenState = signal(false);
  ngOnInit() {
    this.fetchEmployees();
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getAllProjects().subscribe(projectData => {
      this.projects = projectData;
    });
  }
  
  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(employeeData => {
      this.employees = employeeData;
    });
  }

  getEmployeeNames(employees: Employee[]): string {
    return employees.map(employee => employee.name).join(', ');
  }
  
  getLeaderNameById( leaderId: number): string {
    const leader = this.employees.find(employee => employee.id === leaderId);
    return leader ? leader.name : 'Leader Not Found';
  }

  openDescriptionDialog(description: string): void {
    this.dialog.open(ProjectDescriptionDialogComponent, {
      width: '250px',
      data: { description }
    });
  }

  openAuthDialog(project: Project){
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      data: {project}
    });
    console.log(project.id);
    dialogRef.afterClosed().subscribe( result => {
      if (result &&project.id !== undefined) {

        const userId = result;
        if (this.reqSkillsCheck(userId, project) && !this.isCollaborator(this.findUser(userId), project)) {
          this.projectService.addEmployeeToProject(project.id, userId).subscribe({
            next: (updatedProject) => {
              console.log('Employee added to project successfully', updatedProject);
              this.fetchEmployees();
              this.fetchProjects();
            },
            error: (error) => {
              console.error('Failed to add employee to project', error);
            }
          });
        } else {
          console.log('Employee does not meet the requirements or is already a collaborator');
        }
      }
    });
  }

  reqSkillsCheck(userId: number, project: Project) : boolean{
    const user = this.findUser(userId);
    const reqSkills = project.requiredSkills;

    for ( const reqSkill of reqSkills){
      if (user.skills.some(userSkill => userSkill === reqSkill)) {
        return true;
      }
    }
    return false;
  }  

  findUser(userId: number): Employee{
    const user = this.employees.find(employee => employee.id === userId);
    console.log(userId);
    console.log(this.employees);
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  isCollaborator(employee : Employee, project : Project) : boolean {
    if (project.collaborators.find(collaborator => collaborator.id === employee.id)) {
      return true;
    }
    return false;
  }


}
