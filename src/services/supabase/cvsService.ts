
// Static implementation of CVs service
import { CV } from '@/components/acejob/cv-library/types';

// Mock data for CVs
const mockCVs: CV[] = [
  {
    id: "1",
    candidateName: "Marie Dupont",
    title: "Développeuse Full Stack",
    email: "marie.dupont@example.com",
    phone: "06 12 34 56 78",
    experience: 5,
    education: "Master en Informatique",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB"],
    uploadDate: "2023-09-15T10:30:00Z",
    rating: 4,
    tags: ["Tech", "Senior"]
  },
  {
    id: "2",
    candidateName: "Thomas Martin",
    title: "UX/UI Designer",
    email: "thomas.martin@example.com",
    phone: "06 23 45 67 89",
    experience: 3,
    education: "Bachelor en Design",
    skills: ["Figma", "Adobe XD", "Sketch", "CSS", "User Research"],
    uploadDate: "2023-10-05T14:20:00Z",
    rating: 5,
    tags: ["Design", "Mid-level"]
  },
  {
    id: "3",
    candidateName: "Sophie Leroux",
    title: "DevOps Engineer",
    email: "sophie.leroux@example.com",
    phone: "06 34 56 78 90",
    experience: 7,
    education: "École d'ingénieur",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    uploadDate: "2023-08-20T09:15:00Z",
    rating: 4,
    tags: ["Tech", "Senior", "Remote"]
  }
];

export const getCVs = async (): Promise<CV[]> => {
  // Simulation d'un appel API avec un délai artificiel
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Retourner les CV statiques
  return mockCVs;
};
