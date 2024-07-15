import {Project} from "./project.model";

export class Employee{
  id!: number;
  name: string;
  email: string;
  password: string;
  level: number;
  ownProjectId: number;
  skills: Skill[];
  projects: Project[];

  constructor(name: string, email: string, password: string, skills: Skill[]) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.skills = skills;

    this.level = 0;
    this.ownProjectId = 0;
    this.projects = [];
  }
}

export enum Skill {
  JAVA = 'JAVA',
  KOTLIN = 'KOTLIN',
  PYTHON = 'PYTHON',
  C = 'C',
  JAVASCRIPT = 'JAVASCRIPT',
  HTML = 'HTML'
}
