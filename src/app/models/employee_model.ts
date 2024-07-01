import { Project } from "./project_model"

export interface Employee{
 id: number,
 employeeName: string,
 employeeEmail: string,
 projLead: boolean,
 employeeSkills: string,
 level: number
 projects: Project[]
}