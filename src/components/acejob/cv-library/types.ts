
export interface CV {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  title: string;
  uploadDate: string;
  skills: string[];
  experience: number; // en années
  education: string;
  tags: string[];
  rating: number;
  lastInteraction: string;
}

export interface CVFilterOptions {
  minExperience?: number;
  maxExperience?: number;
  educationLevels?: string[];
  skills?: string[];
  availability?: string;
  status?: string[];
  rating?: number;
}
