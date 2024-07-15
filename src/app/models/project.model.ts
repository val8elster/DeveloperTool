import { Skill, Employee } from './employee.model';

export interface Project {
  id?: number;
  name: string;
  description: string;
  leaderId: number;
  completed: boolean;
  collaborators: Employee[];
  requiredSkills: Skill[];
}
