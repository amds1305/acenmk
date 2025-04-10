
import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    name: 'Marie Dubois',
    role: 'CEO & Fondatrice',
    bio: 'Plus de 15 ans d\'expérience dans la tech et la stratégie digitale.',
  },
  {
    name: 'Thomas Martin',
    role: 'Directeur Technique',
    bio: 'Expert en architecture logicielle et innovation technologique.',
  },
  {
    name: 'Sophie Leroy',
    role: 'Directrice UX/UI',
    bio: 'Passionnée par la création d\'expériences utilisateur exceptionnelles.',
  },
  {
    name: 'David Bernard',
    role: 'Lead Developer',
    bio: 'Spécialiste en développement web et mobile full-stack.',
  },
];

const NmkFireTeam = () => {
  return (
    <section id="team" className="py-24 bg-white dark:bg-gray-900 relative">
      {/* Élément décoratif */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-50 dark:bg-purple-900/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-1.5 rounded-full mb-4">
            Notre Équipe
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-300">
            Experts Passionnés à Votre Service
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Des professionnels talentueux qui font la différence dans chaque projet
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-7xl font-light text-purple-300 dark:text-purple-600">{member.name.charAt(0)}</div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-purple-800/70 via-purple-800/0 to-purple-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mt-1">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Rejoignez notre équipe !</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Nous sommes toujours à la recherche de talents passionnés par la technologie et l'innovation.
            </p>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
              <a href="/careers" className="inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Voir nos offres d'emploi
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireTeam;
