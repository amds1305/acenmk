
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/mysql';

const TekoTeam: React.FC = () => {
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
    staleTime: 0,
    refetchOnMount: true,
  });

  // Utiliser les données de l'équipe depuis la base de données si disponibles
  const teamMembers = config?.sections.find(section => section.type === 'team')?.data?.members || [];
  
  // Données par défaut si aucune donnée n'est trouvée
  const defaultTeam = [
    {
      name: "Sophie Martin",
      role: "CEO & Fondatrice",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Thomas Dubois",
      role: "Directeur Technique",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Marie Leclerc",
      role: "Directrice UX Design",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Jean Fontaine",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ];
  
  console.log("TekoTeam - Données d'équipe reçues:", teamMembers);
  const team = teamMembers.length > 0 ? teamMembers : defaultTeam;
  
  return (
    <section id="team" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Notre équipe d'experts
          </h2>
          <p className="text-gray-600 md:text-lg">
            Des professionnels passionnés et spécialisés dans leur domaine pour faire de votre projet un succès
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={member.id || index} className="group relative">
              <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                <img 
                  src={member.image || `https://via.placeholder.com/400x400?text=${member.name.charAt(0)}`} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TekoTeam;
