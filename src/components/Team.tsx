
import React from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';

const Team = () => {
  const { data: config, isLoading } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
    staleTime: 1000 * 60, // 1 minute
  });
  
  // Utiliser les données de l'équipe depuis la base de données si disponibles
  const teamData = config?.sectionData?.team?.members || [];
  
  // Utiliser des données par défaut si aucune donnée n'est disponible
  const defaultTeamMembers = [
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
  
  const teamMembers = teamData.length > 0 ? teamData : defaultTeamMembers;
  
  if (isLoading) {
    return (
      <section id="team" className="elite-section py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="elite-section bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          <span className="bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">Notre Équipe</span>
          <h2 className="text-4xl font-bold mb-6 text-secondary dark:text-white">Experts Passionnés</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-200 mt-8 max-w-3xl mx-auto">
            Des experts passionnés qui font la différence dans chaque projet
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id || index}
              className={cn(
                "glass-panel overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl opacity-0 animate-fade-in rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700",
                `animation-delay-${member.delay || (index * 100)}`
              )}
            >
              <div className="relative group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-7xl font-light text-gray-300 dark:text-gray-500">{member.name.charAt(0)}</div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <div className="flex space-x-4">
                    {member.linkedin && (
                      <a href={member.linkedin} className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors hover-scale">
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors hover-scale">
                        <Twitter className="h-5 w-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-secondary dark:text-white">{member.name}</h3>
                <p className="text-primary text-sm font-medium mt-1">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 flex items-center justify-center">
          <div className="glass-panel p-8 max-w-2xl text-center opacity-0 animate-fade-in animation-delay-500 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-lg">
            <h3 className="text-xl font-medium mb-4 text-secondary dark:text-white">Rejoignez notre équipe !</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Nous sommes toujours à la recherche de talents passionnés par la technologie et l'innovation.
            </p>
            <Button asChild className="button-animation bg-primary hover:bg-primary/90 text-white">
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
      </div>
    </section>
  );
};

export default Team;
