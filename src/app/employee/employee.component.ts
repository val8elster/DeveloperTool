import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Skill, Employee } from '../models/employee.model';
import {EmployeeService} from "../services/employee/employee.service";
import {NgForOf, NgIf} from "@angular/common";
import {catchError, forkJoin, switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employeeForm: FormGroup;
  skills = Object.values(Skill);
  alertMessage: string | null = "";
  suc: boolean = true;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      skills: this.fb.array(this.skills.map(skill => this.fb.control(false)))
    });
  }

  get skillsFormArray() {
    return this.employeeForm.get('skills') as FormArray;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const { name, email, password } = this.employeeForm.value;

      forkJoin({
        usernameExists: this.employeeService.existsByUsername(name),
        emailExists: this.employeeService.existsByMail(email)
      }).pipe(
        switchMap(results => {
          if (results.usernameExists) {
            throw new Error('Username already exists');
          }
          if (results.emailExists) {
            throw new Error('Email already exists');
          }

          const selectedSkills = this.employeeForm.value.skills
            .map((checked: any, i: number) => checked ? this.skills[i] : null)
            .filter((v: null) => v !== null);

          let e = new Employee(name, email, password, selectedSkills);

          return this.employeeService.saveEmployee(e);
        }),
        //@ts-ignore
        catchError(error => {
          this.alertMessage = error.message;
          return null;
        })
      ).subscribe(
        employee => {
          this.alertMessage = 'Registration successful!';
          console.log('Employee saved:', employee);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  onNavigate() {
    this.router.navigate(['/employee-list']);
  }
}
