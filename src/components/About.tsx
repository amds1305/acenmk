
import React from 'react';
import { Check, TrendingUp, Users, Zap, ChevronRight } from 'lucide-react';

const values = [
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: 'Innovation',
    description: 'Nous recherchons constamment de nouvelles technologies et méthodes pour offrir les meilleures solutions.',
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Collaboration',
    description: 'Nous travaillons étroitement avec nos clients comme de véritables partenaires pour atteindre leurs objectifs.',
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque ligne de code, chaque design et chaque interaction client.',
  },
];

const About = () => {
  return (
    <section id="about" className="section py-28 gradient-bg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 order-2 lg:order-1">
          <div>
            <span className="bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">À propos de nous</span>
            <h2 className="section-title heading-underline">Notre Histoire</h2>
            <p className="text-lg text-gray-600 mb-6 mt-12">
              Fondée en 2015, notre ESN s'est rapidement imposée comme un acteur incontournable du numérique, combinant expertise technique et vision stratégique.
            </p>
            <p className="text-gray-600 mb-6">
              Notre mission est d'accompagner les entreprises dans leur transformation numérique en leur fournissant des solutions technologiques innovantes et adaptées à leurs besoins spécifiques.
            </p>
          </div>
          
          <ul className="space-y-5">
            {[
              'Plus de 100 projets réalisés avec succès',
              'Une équipe de 50+ experts passionnés',
              'Présence dans 3 pays européens',
              'Partenariats avec les leaders technologiques',
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 p-1 rounded-full bg-primary/10 mr-3 mt-1">
                  <Check className="h-4 w-4 text-primary" />
                </span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <a href="#team" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
              Découvrez notre équipe
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="relative order-1 lg:order-2">
          <div className="glass-panel p-8 md:p-10 animate-fade-in animated-border">
            <h3 className="text-2xl font-semibold mb-8 font-display">Nos valeurs</h3>
            <div className="space-y-8">
              {values.map((value, index) => (
                <div key={index} className="flex space-x-5">
                  <div className="p-3 rounded-xl bg-primary/10 h-fit">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-medium font-display">{value.title}</h4>
                    <p className="text-gray-600 mt-2">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-8 -left-8 h-24 w-24 bg-primary/5 rounded-xl -z-10"></div>
          <div className="absolute -top-8 -right-8 h-20 w-20 border border-primary/20 rounded-xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
