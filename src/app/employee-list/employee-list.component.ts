import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../models/employee.model';
import {Router} from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id' ,'name', 'email', 'skills', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.getEmployees();
  }

  ngOnInit(): void {
    
  }

  getEmployees() : void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  updateEmployee(employeeId: number) : void {
    this.router.navigate(['/employee', {id: employeeId}])
  }

  deleteEmployee(employeeId: number) : void{
    this.employeeService.deleteEmployee(employeeId).subscribe(
      {
        next: (res) =>{
          console.log(res);
          this.getEmployees();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onNavigate() {
    this.router.navigate(['/employee']);
  }
}
