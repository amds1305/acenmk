
// Static implementation of team service

// TeamMember type
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  delay?: number;
  linkedin?: string;
  twitter?: string;
  email?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

// Mock team data
const teamData: TeamMember[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    role: 'CEO',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Expert en stratégie digitale avec plus de 15 ans d\'expérience.',
    linkedin: '#',
    twitter: '#',
    email: 'jean@example.com',
    delay: 0,
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' }
    ]
  },
  {
    id: '2',
    name: 'Marie Martin',
    role: 'CTO',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Ingénieure en informatique spécialisée en développement web.',
    linkedin: '#',
    twitter: '#',
    email: 'marie@example.com',
    delay: 100,
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'github', url: '#' }
    ]
  },
  {
    id: '3',
    name: 'Pierre Durand',
    role: 'Designer UI/UX',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Créatif passionné par l\'expérience utilisateur et l\'interface.',
    linkedin: '#',
    twitter: '#',
    email: 'pierre@example.com',
    delay: 200,
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'dribbble', url: '#' }
    ]
  }
];

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return teamData;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};

export const getTeamMemberById = async (id: string): Promise<TeamMember | null> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    return teamData.find(member => member.id === id) || null;
  } catch (error) {
    console.error('Error fetching team member by ID:', error);
    return null;
  }
};
