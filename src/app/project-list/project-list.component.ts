import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from '../services/project/project.service';
import { Project } from '../models/project_model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  dataSource: Project[] = [];
  displayedColumns: string[] = ['projectId', 'projectName', 'projLeadName', 'employees', 'description', 'edit', 'delete'];

  constructor(private projectService : ProjectService, private router: Router){
    this.getProjects();
  }

  ngOnInit(): void {
    
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
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

  updateProject(projectId: Number): void {
    this.router.navigate(['/projects', {id: projectId}])
  }

  deleteProject(projectId: Number): void{
    console.log(projectId);
    this.projectService.deleteProjects(projectId).subscribe(
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
