
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  const jobs = [
    {
      id: '1',
      title: 'Développeur Front-end React',
      location: 'Paris, France',
      type: 'CDI',
      description: 'Nous recherchons un développeur Front-end React expérimenté pour rejoindre notre équipe.',
    },
    {
      id: '2',
      title: 'Développeur Back-end Node.js',
      location: 'Lyon, France',
      type: 'CDI',
      description: 'Rejoignez notre équipe en tant que développeur Back-end Node.js pour contribuer à nos projets innovants.',
    },
    {
      id: '3',
      title: 'UI/UX Designer',
      location: 'Bordeaux, France',
      type: 'CDD',
      description: 'Nous recherchons un UI/UX Designer talentueux pour créer des expériences utilisateur exceptionnelles.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Offres d'emploi</h1>
          
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>
                    {job.location} • {job.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{job.description}</p>
                  <Button asChild>
                    <Link to={`/jobs/${job.id}`}>Voir l'offre</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobsPage;
