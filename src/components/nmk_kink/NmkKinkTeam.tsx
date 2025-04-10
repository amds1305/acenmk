
import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const NmkKinkTeam: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sarah Martinez',
      role: 'Directrice Créative',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=687',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    },
    {
      name: 'David Chen',
      role: 'Lead Développeur',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=687',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    },
    {
      name: 'Emma Wilson',
      role: 'Designer UX',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=761',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    },
    {
      name: 'Thomas Dubois',
      role: 'Stratège Marketing',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=687',
      social: {
        linkedin: '#',
        twitter: '#',
        email: '#'
      }
    }
  ];

  return (
    <section id="team" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Notre équipe
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Des experts passionnés
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Notre équipe talentueuse combine créativité et expertise technique pour donner vie à vos projets numériques.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-80 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="mt-1 text-gray-600">{member.role}</p>
                
                <div className="mt-4 flex space-x-3">
                  <a href={member.social.linkedin} className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href={member.social.twitter} className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href={member.social.email} className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkKinkTeam;
