
import React from 'react';
import { Check, TrendingUp, Users, Zap, ChevronRight } from 'lucide-react';

const values = [
  {
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    title: 'Innovation',
    description: 'Nous recherchons constamment de nouvelles technologies et méthodes pour offrir les meilleures solutions.',
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: 'Collaboration',
    description: 'Nous travaillons étroitement avec nos clients comme de véritables partenaires pour atteindre leurs objectifs.',
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque ligne de code, chaque design et chaque interaction client.',
  },
];

const About = () => {
  return (
    <section id="about" className="elite-section bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <span className="text-sm font-medium text-primary uppercase tracking-wider inline-block mb-4">À propos de nous</span>
              <h2 className="text-4xl font-bold text-secondary mb-6">Notre Histoire</h2>
              <div className="w-20 h-1 bg-primary"></div>
              <p className="text-lg text-gray-700 my-8">
                Fondée en 2015, notre ESN s'est rapidement imposée comme un acteur incontournable du numérique, combinant expertise technique et vision stratégique.
              </p>
              <p className="text-gray-600 mb-6">
                Notre mission est d'accompagner les entreprises dans leur transformation numérique en leur fournissant des solutions technologiques innovantes et adaptées à leurs besoins spécifiques.
              </p>
            </div>
            
            <ul className="space-y-4">
              {[
                'Plus de 100 projets réalisés avec succès',
                'Une équipe de 50+ experts passionnés',
                'Présence dans 3 pays européens',
                'Partenariats avec les leaders technologiques',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 rounded-full bg-primary/10 p-1">
                    <Check className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <a href="#team" className="elite-button group">
                Découvrez notre équipe
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-6 -right-6 w-full h-full bg-primary/10 rounded-lg z-0"></div>
            <div className="elite-card p-8 relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-secondary">Nos valeurs</h3>
              <div className="space-y-8">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div className="p-3 rounded-lg bg-primary/10 h-fit">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-secondary">{value.title}</h4>
                      <p className="text-gray-600 mt-2">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
