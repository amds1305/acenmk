
import React from 'react';
import { Check } from 'lucide-react';

const NmkKinkAbout: React.FC = () => {
  const benefits = [
    'Design moderne et responsive',
    'Optimisation SEO intégrée',
    'Performance et vitesse optimales',
    'Sécurité et confidentialité des données',
    'Compatibilité multiplateforme',
    'Support technique dédié'
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="inline-block rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
              À propos de nous
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Nous créons des expériences numériques impactantes
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Depuis plus de 10 ans, notre agence aide les entreprises à transformer leurs idées en solutions numériques performantes. Notre approche centrée sur l'utilisateur garantit des projets qui non seulement impressionnent visuellement, mais atteignent également vos objectifs commerciaux.
            </p>
            
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-gray-900" />
                  </div>
                  <p className="ml-3 text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex items-center gap-4">
              <div>
                <p className="text-4xl font-bold text-gray-900">12+</p>
                <p className="text-sm text-gray-600">Années d'expérience</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-4xl font-bold text-gray-900">200+</p>
                <p className="text-sm text-gray-600">Projets livrés</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-4xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Clients satisfaits</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gray-200"></div>
            <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-gray-900"></div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1470"
                alt="Notre équipe en pleine collaboration"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkAbout;
