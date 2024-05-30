import { Employee } from "./employee_model";

export interface Project{
    id: number,
    projectName: string,
    projLeadName: string,
    employees: Employee[],
    description: string,
    projLeaders: Employee[]
   }