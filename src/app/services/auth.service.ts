import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Employee} from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8788/employee';
  //private baseUrl = 'https://elster.dev:8788/employee';

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<number> {
    return this.http.get<Employee>(`${this.baseUrl}/get/name/${username}`).pipe(
      map((employee: Employee) => {
        if (employee.password == password) {
          return employee.id;
        } else {
          return 0;
        }
      }),
      catchError(error => {
        console.error('Authentication error', error);
        return of(0);
      })
    );
  }
}
