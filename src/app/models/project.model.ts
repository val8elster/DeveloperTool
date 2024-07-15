import { Skill, Employee } from './employee.model';

export class Project {
  id?: number;
  name: string;
  description: string;
  leaderId: number;
  completed: boolean;
  collaborators: Employee[];
  requiredSkills: Skill[];

  constructor(name: string, description: string, skills: Skill[], leaderId: number) {
    this.name = name;
    this.description = description;
    this.requiredSkills = skills;
    this.leaderId = leaderId;

    this.completed = false;
    this.collaborators = [];
}
}
