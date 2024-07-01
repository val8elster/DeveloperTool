import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee_model';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project/project.service';
import { Project } from '../models/project_model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  isCreateEmployee: boolean = true;

  static lastId = 0;

  projects: Project[] = [];
  employee: any;
  employees: Employee[] = [];

  skills: string[] = [];

  constructor(private employeeService: EmployeeService, private router: Router,
    private activatedRoute: ActivatedRoute, private projectService: ProjectService
  ) {

  }

  ngOnInit(): void {
    this.employee = this.activatedRoute.snapshot.data['employees'];
    this.getEmployees();
    console.log(this.employee)

    if (this.employee && this.employee.id > 0) {
      this.isCreateEmployee = false;
    } else {
      this.isCreateEmployee;
    }
  }

  getLastId(): number {
    return this.employees.length;
  }

  checkSkills(skills: string) {
    return this.employee.employeeSkills != null && this.employee.employeeSkills.includes(skills);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
      },
      error => console.error(error)
    );
  }

  saveEmployee(employeeForm: NgForm): void {

    if (this.isCreateEmployee) {
      this.employee.id = this.getLastId() + 1;

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