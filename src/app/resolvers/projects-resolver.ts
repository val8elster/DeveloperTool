import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { inject } from "@angular/core"
import { ProjectService } from "../services/project/project.service"
import { Observable, of } from "rxjs"
import { Project } from "../models/project_model"

export const ProjectResolver: ResolveFn<any> = 
    (route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        projectsService: ProjectService = inject(ProjectService)) : Observable<Project> => {
            const projectId = route.paramMap.get("id");
            if(projectId){
                return projectsService.getProject(Number(projectId));
            }else {
                const project: Project = {
                    id: 0,
                    projectName: '',
                    projLeadName: '',
                    employees: [],
                    description: '',
                    projLeaders: []
                  }

                  return of(project);
            }

            
        }
    