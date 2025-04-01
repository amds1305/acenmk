
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Partie image */}
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-xl">
                <img 
                  src="https://via.placeholder.com/800x600?text=Our+Platform" 
                  alt="Notre plateforme" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Statistiques superposées */}
              <Card className="absolute -right-8 -bottom-8 bg-background shadow-lg border-primary/10 max-w-[240px]">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-4xl font-bold text-primary">98%</p>
                      <p className="text-sm text-muted-foreground">de satisfaction client</p>
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-primary">+60%</p>
                      <p className="text-sm text-muted-foreground">de productivité</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Partie texte */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">La plateforme qui transforme votre gestion d'actifs numériques</h2>
            <p className="text-xl text-muted-foreground">
              Développée par des experts passionnés, notre solution allie puissance et simplicité pour répondre aux défis des entreprises modernes.
            </p>
            
            <div className="space-y-4 py-4">
              {[
                "Interface intuitive accessible à tous les niveaux techniques",
                "Déploiement rapide et intégration avec vos outils existants",
                "Support technique réactif et personnalisé",
                "Mises à jour régulières basées sur vos retours"
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Button className="gap-2 rounded-full">
                Découvrir notre approche
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
