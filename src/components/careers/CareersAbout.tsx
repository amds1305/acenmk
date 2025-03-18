
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Coffee, Users, Zap, Smile, Award } from 'lucide-react';

const CareersAbout = () => {
  const benefits = [
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: 'Santé & Bien-être',
      description: 'Mutuelle complète, programme de bien-être et équilibre vie professionnelle/personnelle.'
    },
    {
      icon: <Coffee className="h-10 w-10 text-primary" />,
      title: 'Environnement agréable',
      description: 'Bureaux modernes, espaces de détente et télétravail flexible.'
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Équipe dynamique',
      description: 'Collaborez avec des experts passionnés dans une ambiance conviviale et stimulante.'
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: 'Projets innovants',
      description: 'Travaillez sur des projets variés utilisant les dernières technologies.'
    },
    {
      icon: <Smile className="h-10 w-10 text-primary" />,
      title: 'Culture positive',
      description: 'Une culture d\'entreprise qui valorise la créativité, la diversité et la collaboration.'
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: 'Développement professionnel',
      description: 'Formation continue, conférences et opportunités d\'évolution de carrière.'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-2">Pourquoi nous rejoindre ?</h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Nous offrons un environnement de travail stimulant et des avantages qui favorisent votre épanouissement
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-center">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Notre processus de recrutement</h3>
        <div className="flex flex-col md:flex-row justify-between max-w-4xl mx-auto">
          {['Candidature', 'Entretien téléphonique', 'Test technique', 'Entretien final', 'Offre'].map((step, i) => (
            <div key={i} className="relative flex flex-col items-center mb-8 md:mb-0">
              <div className="rounded-full bg-primary text-white w-10 h-10 flex items-center justify-center font-bold text-lg z-10">
                {i + 1}
              </div>
              <div className="mt-2 text-center font-medium">{step}</div>
              {i < 4 && (
                <div className="hidden md:block absolute top-5 w-full h-0.5 bg-gray-200 -right-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareersAbout;
