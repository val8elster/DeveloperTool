import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../../models/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should save the employee and return it', () => {
    const dummyEmployee: Employee = {
      employeeId: 1,
      employeeName: 'Fred',
      employeeAddress: '2222, town, street 3',
      employeeEmail: 'fred@gmail.com',
      projLead: true,
      employeeSkills: 'MySql'
    };

    service.saveEmployee(dummyEmployee).subscribe(employee => {
      expect(employee).toEqual(dummyEmployee);
    });

    const req = httpMock.expectOne(`${service.api}/save/employee`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyEmployee);
  });
});
