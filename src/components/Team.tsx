
import React from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    name: 'Marie Dubois',
    role: 'CEO & Fondatrice',
    bio: 'Plus de 15 ans d\'expérience dans la tech et la stratégie digitale.',
    delay: 0,
  },
  {
    name: 'Thomas Martin',
    role: 'Directeur Technique',
    bio: 'Expert en architecture logicielle et innovation technologique.',
    delay: 100,
  },
  {
    name: 'Sophie Leroy',
    role: 'Directrice UX/UI',
    bio: 'Passionnée par la création d\'expériences utilisateur exceptionnelles.',
    delay: 200,
  },
  {
    name: 'David Bernard',
    role: 'Lead Developer',
    bio: 'Spécialiste en développement web et mobile full-stack.',
    delay: 300,
  },
];

const Team = () => {
  return (
    <section id="team" className="section">
      <div className="text-center">
        <h2 className="section-title">Notre équipe</h2>
        <p className="section-subtitle mx-auto">
          Des experts passionnés qui font la différence dans chaque projet
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {teamMembers.map((member, index) => (
          <div 
            key={index}
            className={cn(
              "glass-panel overflow-hidden card-hover opacity-0 animate-fade-in-up",
              `animation-delay-${member.delay}`
            )}
          >
            <div className="relative group">
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-5xl font-light text-gray-300">{member.name.charAt(0)}</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                <div className="flex space-x-4">
                  <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors">
                    <Linkedin className="h-5 w-5 text-white" />
                  </a>
                  <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors">
                    <Twitter className="h-5 w-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-primary text-sm font-medium mt-1">{member.role}</p>
              <p className="text-gray-600 text-sm mt-3">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 flex items-center justify-center">
        <div className="glass-panel p-8 max-w-2xl text-center opacity-0 animate-fade-in animation-delay-500">
          <h3 className="text-xl font-medium mb-4">Rejoignez notre équipe !</h3>
          <p className="text-gray-600 mb-6">
            Nous sommes toujours à la recherche de talents passionnés par la technologie et l'innovation.
          </p>
          <Button asChild>
            <a 
              href="/careers" 
              className="inline-flex items-center justify-center"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Voir nos offres d'emploi
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Team;
