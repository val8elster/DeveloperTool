import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import {Employee, Skill} from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8788/projects';
  //private baseUrl = 'https://elster.dev:8788/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}`);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${projectId}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/create`, project);
  }

  existsByName(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/${name}`);
  }

  existsByLeader(leaderId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/${leaderId}`);
  }

  isCompleted(projectId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check/${projectId}`);
  }

  getAllCollaborators(projectId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/${projectId}/users`);
  }

  getAllSkills(projectId: number): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}/${projectId}/skills`);
  }

  addEmployeeToProject(projectId: number, userId: number): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/${projectId}/users/${userId}`, {});
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${projectId}`);
  }

  addCollaborator(projectId: number, userId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/${projectId}/addcollab/${userId}`, {});
  }
}
