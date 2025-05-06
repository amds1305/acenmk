
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  
  // In a real app, this would fetch the job details from an API
  // For now, we'll use a mock job
  const job = {
    id,
    title: 'Développeur Front-end React',
    location: 'Paris, France',
    type: 'CDI',
    salary: '45K€ - 60K€',
    postedDate: '05/05/2023',
    description: 'Nous recherchons un développeur Front-end React expérimenté pour rejoindre notre équipe et participer au développement de nos applications web innovantes.',
    responsibilities: [
      'Développer des interfaces utilisateur réactives et intuitives',
      'Collaborer avec les designers et les développeurs back-end',
      'Assurer la qualité du code et sa maintenabilité',
      'Participer aux revues de code et aux réunions d\'équipe'
    ],
    requirements: [
      'Au moins 3 ans d\'expérience en développement React',
      'Bonne connaissance de TypeScript et Redux',
      'Expérience avec les API REST et GraphQL',
      'Sensibilité au design et à l\'expérience utilisateur'
    ],
    benefits: [
      'Télétravail partiel',
      'Tickets restaurant',
      'Mutuelle d\'entreprise',
      'Formation continue'
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux offres
            </Link>
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{job.title}</CardTitle>
              <CardDescription className="text-lg">
                {job.location} • {job.type} • {job.salary}
              </CardDescription>
              <p className="text-sm text-muted-foreground">
                Publiée le {job.postedDate}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Description du poste</h2>
                <p>{job.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Responsabilités</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Prérequis</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Avantages</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {job.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4">
                <Button size="lg">Postuler</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
