
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TekoAbout: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0a0c10] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre vision</h2>
            <div className="w-16 h-0.5 bg-teal-500 mb-8"></div>
            
            <p className="text-white/70 mb-6">
              Fondée en 2010, notre agence digitale s'est rapidement imposée comme un acteur 
              incontournable dans le domaine des technologies numériques. Notre vision est 
              d'accompagner les entreprises dans leur transformation digitale en leur offrant 
              des solutions sur mesure, innovantes et performantes.
            </p>
            
            <p className="text-white/70 mb-8">
              Nous croyons fermement que la technologie doit être au service de l'humain et 
              des objectifs business. C'est pourquoi nous plaçons l'expérience utilisateur et 
              les résultats mesurables au cœur de notre démarche.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">12+</h3>
                <p className="text-white/60">Années d'expérience</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">350+</h3>
                <p className="text-white/60">Projets livrés</p>
              </div>
            </div>
            
            <Button 
              asChild
              className="bg-teal-500 text-white hover:bg-teal-600 rounded-full"
            >
              <a href="#contact">
                Discuter de votre projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Notre équipe en action" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TekoAbout;
