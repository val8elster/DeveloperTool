import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../models/employee_model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  dataSource : Employee[] = [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeAddress', 'employeeEmail', 'projLead', 'employeeSkills', 'edit', 'delete'];

  constructor(private employeeService: EmployeeService, private router: Router){
    this.getEmployees();
  }

  ngOnInit(): void {
    
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      {
        next: (res: Employee[]) => {
          this.dataSource = res;
          console.log(res)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  } 

  deleteEmployees(employeeId: Number): void {
    console.log(employeeId);
    this.employeeService.deleteEmployee(employeeId).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.getEmployees();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }

  updateEmployees(employeeId: Number): void {
    this.router.navigate(['/employee', {id: employeeId}]);
  }
}
