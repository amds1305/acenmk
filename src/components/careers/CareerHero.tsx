
import React from 'react';
import { Button } from '@/components/ui/button';

const CareerHero = () => {
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-800/80 mix-blend-multiply"></div>
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl lg:text-6xl">
            Rejoignez notre équipe
          </h1>
          <p className="text-lg mb-8 md:text-xl max-w-2xl opacity-90">
            Nous recherchons des talents passionnés pour contribuer à notre mission de transformation digitale et d'innovation technologique.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="#apply">Postuler maintenant</a>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10" asChild>
              <a href="#openings">Voir les offres</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHero;
