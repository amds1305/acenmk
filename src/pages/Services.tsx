
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ServicesPage = () => {
  // Exemple de services
  const services = [
    {
      title: 'Développement Web',
      description: 'Création de sites web modernes, réactifs et optimisés pour les moteurs de recherche.',
      features: ['Conception responsive', 'Performance optimisée', 'SEO intégré', 'Maintenance et support']
    },
    {
      title: 'Conception UX/UI',
      description: 'Création d\'interfaces utilisateur attrayantes et fonctionnelles pour une expérience utilisateur optimale.',
      features: ['Design centré utilisateur', 'Prototypage', 'Tests utilisateurs', 'Optimisation de conversion']
    },
    {
      title: 'Développement d\'Applications',
      description: 'Développement d\'applications web et mobiles sur mesure pour répondre à vos besoins spécifiques.',
      features: ['Applications web', 'Applications mobiles natives', 'Applications hybrides', 'Intégration API']
    },
    {
      title: 'Consultation Technique',
      description: 'Services de conseil pour vous aider à prendre des décisions technologiques éclairées.',
      features: ['Audit technique', 'Planification stratégique', 'Optimisation des processus', 'Formation personnalisée']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nos Services | Solutions Professionnelles</title>
        <meta name="description" content="Découvrez notre gamme complète de services professionnels adaptés à vos besoins" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900">
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nos Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nous offrons une gamme complète de services pour vous aider à atteindre vos objectifs commerciaux.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {services.map((service, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Besoin d'un service personnalisé?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Nous comprenons que chaque projet est unique. Contactez-nous pour discuter 
              de vos besoins spécifiques et découvrir comment nous pouvons vous aider.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Contactez-nous
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ServicesPage;
