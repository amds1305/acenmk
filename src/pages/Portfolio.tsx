
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const PortfolioPage = () => {
  // Exemple de projets de portfolio
  const projects = [
    {
      id: 1,
      title: 'Site E-commerce Premium',
      description: 'Conception et développement d\'une plateforme e-commerce complète avec système de paiement intégré et gestion des stocks.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
      tags: ['E-commerce', 'React', 'Node.js', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'Application Mobile de Fitness',
      description: 'Application mobile permettant aux utilisateurs de suivre leurs entraînements, de définir des objectifs et de consulter leurs statistiques.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
      tags: ['Mobile', 'React Native', 'Firebase', 'UX/UI'],
      link: '#'
    },
    {
      id: 3,
      title: 'Plateforme de Gestion de Projet',
      description: 'Système de gestion de projet complet avec suivi des tâches, collaboration en temps réel et rapports analytiques.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
      tags: ['SaaS', 'Vue.js', 'Laravel', 'WebSockets'],
      link: '#'
    },
    {
      id: 4,
      title: 'Site Vitrine Immobilier',
      description: 'Conception d\'un site vitrine élégant pour une agence immobilière avec recherche avancée de propriétés.',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
      tags: ['Vitrine', 'WordPress', 'SEO', 'Custom Theme'],
      link: '#'
    },
    {
      id: 5,
      title: 'Application de Réservation',
      description: 'Système de réservation en ligne pour un restaurant avec confirmation par email et gestion des tables.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
      tags: ['Booking', 'React', 'Express', 'MongoDB'],
      link: '#'
    },
    {
      id: 6,
      title: 'Dashboard Analytique',
      description: 'Dashboard interactif permettant de visualiser et analyser des données complexes avec des graphiques personnalisables.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      tags: ['Analytics', 'D3.js', 'TypeScript', 'GraphQL'],
      link: '#'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portfolio | Nos Réalisations</title>
        <meta name="description" content="Découvrez nos projets et réalisations récentes" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen pt-24 pb-16">
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Notre Portfolio</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos réalisations et projets récents qui témoignent de notre expertise et de notre savoir-faire.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <a 
                    href={project.link}
                    className="text-primary hover:text-primary/80 flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir le projet <ExternalLink className="h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default PortfolioPage;
