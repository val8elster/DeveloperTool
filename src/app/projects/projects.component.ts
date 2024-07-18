import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../services/project/project.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Employee, Skill } from "../models/employee.model";
import { Project } from "../models/project.model";
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, switchMap } from 'rxjs';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
  
})
export class ProjectsComponent implements OnInit {
  projectForm: FormGroup;
  skills = Object.values(Skill);
  alertMessage: string | null = "";
  isUpdate: boolean = false;
  projectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      skills: this.fb.array(this.skills.map(skill => this.fb.control(false)))
    });
  }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params['id'];
      this.isUpdate = history.state.isUpdate;
      console.log(this.isUpdate);
      if (this.projectId) {
        this.projectService.getProjectById(this.projectId).subscribe(project => {
          this.populateForm(project);
        });
      }
    });
  }

  populateForm(project: Project): void {
    this.projectForm.patchValue({
      name: project.name,
      description: project.description
    });
    const skillsArray = this.getskillsFormArray();
    console.log(skillsArray)
    skillsArray.clear();

    console.log(this.skills);
    console.log(project.requiredSkills);
    this.skills.forEach(skill => {
      const hasSkill = project.requiredSkills.includes(skill);
      skillsArray.push(this.fb.control(hasSkill));
    });
  }

  getskillsFormArray() {
    return this.projectForm.get('skills') as FormArray;
  }

  openAuthDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitForm(result);
      }
    });
  }

  submitForm(projLeadId: number) {
    if (this.projectForm.valid) {
      const { name, description } = this.projectForm.value;

      forkJoin({
        projNameExists: this.projectService.existsByName(name),
        projLeaderExists: this.projectService.existsByLeader(projLeadId)
      }).pipe(
        switchMap(results => {
          if (results.projNameExists) {
            throw new Error('Project name already exists');
          }
          if (results.projLeaderExists) {
            throw new Error('Project leader is already on a project.');
          }

          const selectedSkills = this.projectForm.value.skills
            .map((checked: any, i: number) => checked ? this.skills[i] : null)
            .filter((v: null) => v !== null);

          let newProject = new Project(name, description, selectedSkills, projLeadId)

          if(this.isUpdate && this.projectId){
            return this.projectService.updateProject(this.projectId, newProject);
          }else{
            return this.projectService.createProject(newProject);
          }
        }),
        catchError(error => {
          this.alertMessage = error.message;
          throw new Error(error.message)
        })
      ).subscribe(
        project => {
          this.alertMessage = 'Project created!';
          console.log('Project created', project)
        },
        error => {
          console.error('Error creating project:', error);
        }
      );
    }
  }

  onSubmit() {
    this.openAuthDialog();
  }

  onNavigate() {
    this.router.navigate(['/project-list']);
  }
}

