
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter: string;
  email: string;
  isNew?: boolean;
}

export interface SectionSettings {
  title: string;
  subtitle: string;
}
