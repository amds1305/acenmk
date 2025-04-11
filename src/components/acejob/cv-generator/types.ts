
export interface CVFormData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    summary: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Language {
  id: string;
  name: string;
  level: string; // 'basic', 'intermediate', 'advanced', 'native'
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
}

// Données d'exemple
export const defaultCV: CVFormData = {
  personalInfo: {
    fullName: "Jean Dupont",
    title: "Développeur Web Full Stack",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    website: "www.jeandupont.dev",
    linkedin: "linkedin.com/in/jeandupont",
    summary: "Développeur web passionné avec 5 ans d'expérience en création d'applications web et mobiles. Spécialisé en React, Node.js et architecture cloud."
  },
  workExperience: [
    {
      id: "1",
      position: "Développeur Full Stack Senior",
      company: "Tech Innovate",
      location: "Paris, France",
      startDate: "2023-01",
      endDate: "",
      current: true,
      description: "Développement d'applications web pour des clients dans les secteurs finance et retail. Lead technique sur plusieurs projets React/Node.js. Mise en place de CI/CD et amélioration des performances."
    },
    {
      id: "2",
      position: "Développeur Frontend",
      company: "Digital Solutions",
      location: "Lyon, France",
      startDate: "2020-03",
      endDate: "2022-12",
      current: false,
      description: "Création d'interfaces utilisateur avec React et Vue.js. Optimisation des performances et expérience utilisateur. Collaboration avec des designers et des développeurs backend."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master en Informatique",
      institution: "Université de Paris",
      location: "Paris, France",
      startDate: "2018-09",
      endDate: "2020-06",
      description: "Spécialisation en développement web et technologies cloud."
    }
  ],
  skills: [
    { id: "1", name: "React", level: 5 },
    { id: "2", name: "Node.js", level: 4 },
    { id: "3", name: "TypeScript", level: 4 },
    { id: "4", name: "AWS", level: 3 }
  ],
  languages: [
    { id: "1", name: "Français", level: "native" },
    { id: "2", name: "Anglais", level: "advanced" },
    { id: "3", name: "Espagnol", level: "intermediate" }
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2022-04",
      expiry: "2025-04"
    }
  ]
};
