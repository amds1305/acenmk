
import { CV } from '@/components/acejob/cv-library/types';

// Sample CV data
const mockCVs: CV[] = [
  {
    id: "1",
    candidateName: "Jean Dupont",
    title: "Développeur Front-end Senior",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    experience: 5,
    education: "Master en Informatique",
    skills: ["React", "TypeScript", "CSS"],
    uploadDate: "2023-04-15",
    rating: 4,
    tags: ["Front-end", "Disponible"],
    lastInteraction: "15/04/2023"
  },
  {
    id: "2",
    candidateName: "Marie Martin",
    title: "Designer UX/UI",
    email: "marie.martin@example.com",
    phone: "+33 6 23 45 67 89",
    experience: 3,
    education: "Bachelor en Design",
    skills: ["Figma", "Adobe XD", "User Research"],
    uploadDate: "2023-03-20",
    rating: 5,
    tags: ["Design", "Freelance"],
    lastInteraction: "20/03/2023"
  },
  {
    id: "3",
    candidateName: "Pierre Dubois",
    title: "Développeur Full-stack",
    email: "pierre.dubois@example.com",
    phone: "+33 7 34 56 78 90",
    experience: 7,
    education: "École d'ingénieur",
    skills: ["Node.js", "React", "MongoDB", "AWS"],
    uploadDate: "2023-04-10",
    rating: 4,
    tags: ["Full-stack", "CDI"],
    lastInteraction: "10/04/2023"
  }
];

// Get all CVs
export const getCVs = async (): Promise<CV[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return mockCVs;
};

// Get a CV by ID
export const getCVById = async (id: string): Promise<CV | null> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  const cv = mockCVs.find(cv => cv.id === id);
  return cv || null;
};

// Add a new CV
export const addCV = async (cv: Omit<CV, "id">): Promise<CV> => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
  const newCV: CV = {
    ...cv,
    id: `${Date.now()}`,
    uploadDate: new Date().toISOString().split('T')[0],
    lastInteraction: new Date().toLocaleDateString('fr-FR')
  };
  return newCV;
};

// Update a CV
export const updateCV = async (id: string, updates: Partial<CV>): Promise<CV | null> => {
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulate API delay
  const cvIndex = mockCVs.findIndex(cv => cv.id === id);
  if (cvIndex === -1) return null;
  
  const updatedCV = { ...mockCVs[cvIndex], ...updates };
  return updatedCV;
};

// Delete a CV
export const deleteCV = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  return true; // Always return success in mock
};
