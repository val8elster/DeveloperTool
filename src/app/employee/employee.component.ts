import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Skill, Employee } from '../models/employee.model';
import {EmployeeService} from "../services/employee/employee.service";
import {NgForOf, NgIf} from "@angular/common";
import {forkJoin, switchMap} from "rxjs";

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

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
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
      let name = this.employeeForm.value.name;
      let email = this.employeeForm.value.email;
      let password = this.employeeForm.value.password;

      if(this.employeeService.existsByUsername(name)) {
        this.alertMessage += "Username already in use "
        this.suc = false
      }
      if(this.employeeService.existsByMail(email)) {
        this.alertMessage += "Email already in use "
        this.suc = false
      }

      const selectedSkills = this.employeeForm.value.skills
        .map((checked: any, i: number) => checked ? this.skills[i] : null)
        .filter((v: null) => v !== null);

      let e = new Employee(name, email, password, selectedSkills);

      if(this.suc){
        this.employeeService.saveEmployee(e).subscribe(
          employee => {
            this.alertMessage = 'Registration successful!';
          },
          error => {
            this.alertMessage = "Error registering: " + error.message
          }
        );
      }
    }
  }
}
