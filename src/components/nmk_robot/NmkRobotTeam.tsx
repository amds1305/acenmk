
import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getTeamMembers } from '@/services/supabase/teamService';

const NmkRobotTeam = () => {
  const { data: teamMembers, isLoading, error } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: getTeamMembers,
    staleTime: 0,
    refetchOnMount: true,
  });

  console.log("NmkRobotTeam - Données d'équipe reçues:", teamMembers);

  if (isLoading) {
    return (
      <section id="team" className="py-24 bg-[#1A1F2C]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-[#9b87f5] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des membres de l'équipe:", error);
  }

  const defaultTeamMembers = [
    {
      name: 'Dr. Alex Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
      bio: 'With a Ph.D. in Robotics from MIT, Alex leads our R&D division and has pioneered several breakthroughs in robot motion planning.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'alex@example.com'
      }
    },
    {
      name: 'Sarah Williams',
      role: 'Lead Engineer, Automation',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3',
      bio: 'Sarah specializes in industrial automation systems and has implemented solutions for Fortune 500 manufacturing clients worldwide.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@example.com'
      }
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of AI Development',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
      bio: 'Marcus brings expertise in machine learning and computer vision, enabling our robots to perceive and interact with their environments intelligently.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'marcus@example.com'
      }
    },
    {
      name: 'Elena Rodriguez',
      role: 'Client Solutions Director',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3',
      bio: 'With over 15 years in industrial consulting, Elena ensures our technical solutions align perfectly with client business objectives.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'elena@example.com'
      }
    }
  ];
  
  const team = teamMembers && teamMembers.length > 0 ? teamMembers : defaultTeamMembers;

  return (
    <section id="team" className="py-24 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
            Our Experts
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8 text-white">
            Meet the minds behind our technology
          </h2>
          
          <p className="text-gray-300 text-xl">
            Our team combines deep expertise in robotics, engineering, and artificial intelligence to deliver cutting-edge solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={member.id || index} 
              className="bg-[#111827] border border-gray-800 group hover:border-[#9b87f5] transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={member.image || `https://via.placeholder.com/400x500?text=${member.name.charAt(0)}`} 
                  alt={member.name} 
                  className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-[#9b87f5] mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm mb-6">{member.bio}</p>
                
                <div className="flex gap-4">
                  {member.linkedin && (
                    <a href={member.linkedin} className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkRobotTeam;
