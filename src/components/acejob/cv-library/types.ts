
export interface CV {
  id: string;
  candidateName: string;
  title: string;
  email: string;
  phone: string;
  experience: number;
  education: string;
  skills: string[];
  uploadDate: string;
  rating: number;
  tags?: string[];
  lastInteraction?: string; // Add lastInteraction property
}
