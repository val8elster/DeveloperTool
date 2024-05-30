import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectsComponent } from './projects/projects.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectResolver } from './resolvers/projects-resolver';
import { EmployeeResolver } from './resolvers/employee-resolver';

const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path: 'employee', component: EmployeeComponent, resolve: {employees: EmployeeResolver}},
  {path: 'employee-list', component: EmployeeListComponent},
  {path: 'projects', component: ProjectsComponent, resolve: {project: ProjectResolver} },
  {path: 'projects-list', component: ProjectListComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
