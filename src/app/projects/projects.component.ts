import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../services/project/project.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import {Skill} from "../models/employee.model";
import {Project} from "../models/project.model";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectForm: FormGroup;
  skills = Object.values(Skill);

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      skills: this.fb.array(this.skills.map(skill => this.fb.control(false)))
    });
  }

  ngOnInit(): void {}

  get skillsFormArray() {
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

  submitForm(result: number) {
    if (this.projectForm.valid) {
      const { name, description } = this.projectForm.value;

      const selectedSkills = this.projectForm.value.skills
        .map((checked: any, i: number) => checked ? this.skills[i] : null)
        .filter((v: null) => v !== null);

      let newProject = new Project(name, description, selectedSkills, result)

      this.projectService.createProject(newProject).subscribe(
        response => {
          console.log('Project created:', response);
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
}

