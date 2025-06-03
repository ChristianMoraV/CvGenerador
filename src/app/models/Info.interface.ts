export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  address?: string;
  profilePicture?: string;
  summary?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;
  responsibilities?: string[];
}

export interface Skill {
  name: string;
  level?: number; // 1-5 or percentage
}

export interface Language {
  name: string;
  proficiency: string; // e.g. "Fluent", "Intermediate", "Native"
}

export interface Project {
  name: string;
  description?: string;
  url?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
}

export interface Curriculum {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  languages: Language[];
  projects?: Project[];
  references?: string;
}