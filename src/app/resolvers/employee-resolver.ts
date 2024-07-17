import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { inject } from "@angular/core"
import { Observable, of } from "rxjs"
import { EmployeeService } from "../services/employee/employee.service"
import { Employee } from "../models/employee.model"

export const EmployeeResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    employeeService: EmployeeService = inject(EmployeeService)) : Observable<Employee> => {
        const employeeId = route.paramMap.get("id");
        if(employeeId){
            return employeeService.getEmployee(Number(employeeId));
        }else {
            const employee: Employee = {
                id: 0,
                name: '',
                password: '',
                email: '',
                ownProjectId: 0,
                skills: [],
                level: 0,
                projects: []
              }

              return of(employee);
        }
    }
