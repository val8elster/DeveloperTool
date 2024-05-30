import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project_model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {}
    
  api = "http://localhost:3000/projects"

  public saveProject(project: Project) : Observable<Project>{
    return this.httpClient.post<Project>(`${this.api}`, project);
  }

  public getProjects() : Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.api}`)
  }

  public deleteProjects(id: Number) {
    return this.httpClient.delete(`${this.api}/${id}`);
  }

  public getProject(id: Number) {
    return this.httpClient.get<Project>(`${this.api}/${id}`);
  }

  public updateProject(project: Project, id: Number){
    return this.httpClient.put<Project>(`${this.api}/${id}`, project);
  }
}
