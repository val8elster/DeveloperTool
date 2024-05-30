import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee_model';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  isCreateEmployee: boolean = true;

  static lastId = 0;

  employee: any;

  skills: string[] = [];

  constructor(private employeeService: EmployeeService, private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.employee = this.activatedRoute.snapshot.data['employees'];

    console.log(this.employee)

    if (this.employee && this.employee.id > 0) {
      this.isCreateEmployee = false;
    } else {
      this.isCreateEmployee;
    }
  }

  checkSkills(skills: string) {
    return this.employee.employeeSkills != null && this.employee.employeeSkills.includes(skills);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  saveEmployee(employeeForm: NgForm): void {

    if (this.isCreateEmployee) {
      EmployeeComponent.lastId++;
      this.employee.id = EmployeeComponent.lastId;

      this.employeeService.saveEmployee(this.employee).subscribe(
        {
          next: (res: Employee) => {
            console.log(res);
            employeeForm.reset();
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      );
    } else{
      this.employeeService.updateEmployee(this.employee, this.employee.id).subscribe(
        {
          next: (res: Employee) => {
            this.router.navigate(["/employee-list"]);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        }
      )
    }

  }

  get projLeadAsString(): string {
    return this.employee.projLead.toString();
  }

  set projLeadAsString(value: string) {
    if (value === 'true') {
      this.employee.projLead = true;
    } else {
      this.employee.projLead = false;
    }
  }

  onSkillsChanges(event: any): void {
    console.log(event)
    if (event.checked) {
      this.skills.push(event.source.value)
    } else {
      this.skills.forEach(
        (item, index) => {
          if (item == event.source.value) {
            this.skills.splice(index, 1);
          }
        }
      );
    }
    this.employee.employeeSkills = this.skills.toString();
  }
}