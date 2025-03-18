
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'remote' | 'hybrid';
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

// Données fictives des offres d'emploi
const jobsData: Job[] = [
  {
    id: '1',
    title: 'Développeur Front-end React',
    department: 'Technique',
    location: 'Paris, France',
    type: 'hybrid',
    description: 'Nous recherchons un développeur Front-end React expérimenté pour rejoindre notre équipe technique et créer des interfaces utilisateur exceptionnelles.',
    responsibilities: [
      'Concevoir et développer des interfaces utilisateur réactives et performantes',
      'Collaborer avec les designers UX/UI et les développeurs back-end',
      'Optimiser les applications pour une performance maximale',
      'Assurer la qualité du code par des tests unitaires et des revues de code',
      'Participer à l\'évolution de notre stack technique front-end'
    ],
    requirements: [
      'Au moins 3 ans d\'expérience en développement front-end',
      'Maîtrise de React.js et de l\'écosystème moderne JavaScript',
      'Expérience avec TypeScript et les outils de build modernes',
      'Connaissance des bonnes pratiques de performance web',
      'Bonne communication et capacité à travailler en équipe'
    ],
    postedDate: '2023-09-15'
  },
  {
    id: '2',
    title: 'Designer UX/UI',
    department: 'Design',
    location: 'Lyon, France',
    type: 'full-time',
    description: 'Venez créer des expériences utilisateur exceptionnelles et des interfaces élégantes pour nos produits digitaux.',
    responsibilities: [
      'Créer des wireframes, prototypes et maquettes',
      'Réaliser des recherches utilisateurs et des tests d\'utilisabilité',
      'Concevoir des interfaces intuitives et accessibles',
      'Collaborer avec les équipes produit et développement',
      'Maintenir et faire évoluer notre système de design'
    ],
    requirements: [
      'Au moins 2 ans d\'expérience en design d\'interfaces',
      'Maîtrise de Figma et d\'autres outils de design',
      'Portfolio démontrant des projets UX/UI réussis',
      'Connaissance des principes d\'accessibilité web',
      'Excellent sens esthétique et souci du détail'
    ],
    postedDate: '2023-09-10'
  },
  {
    id: '3',
    title: 'Chef de projet digital',
    department: 'Management',
    location: 'Bordeaux, France',
    type: 'remote',
    description: 'Rejoignez notre équipe en tant que chef de projet pour piloter nos projets digitaux du concept à la livraison.',
    responsibilities: [
      'Gérer le cycle de vie complet des projets digitaux',
      'Coordonner les équipes techniques, créatives et marketing',
      'Assurer la livraison des projets dans les délais et budgets',
      'Communiquer régulièrement avec les clients et parties prenantes',
      'Identifier et gérer les risques potentiels des projets'
    ],
    requirements: [
      'Au moins 4 ans d\'expérience en gestion de projets digitaux',
      'Certification en gestion de projet (Agile, SCRUM, PMP)',
      'Excellentes capacités de communication et de leadership',
      'Expérience dans le suivi budgétaire et la planification',
      'Connaissance du secteur digital et des technologies web'
    ],
    postedDate: '2023-09-05'
  },
  {
    id: '4',
    title: 'Développeur Back-end Node.js',
    department: 'Technique',
    location: 'Toulouse, France',
    type: 'full-time',
    description: 'Nous cherchons un développeur Back-end Node.js talentueux pour renforcer notre équipe technique.',
    responsibilities: [
      'Développer et maintenir nos API et services back-end',
      'Concevoir des architectures de données efficaces',
      'Assurer la performance et la sécurité des applications',
      'Collaborer avec l\'équipe front-end pour l\'intégration',
      'Participer à l\'évolution de notre infrastructure cloud'
    ],
    requirements: [
      'Au moins 3 ans d\'expérience en développement back-end',
      'Maîtrise de Node.js, Express et des bases de données NoSQL',
      'Expérience avec les architectures microservices',
      'Connaissance des principes DevOps et CI/CD',
      'Capacité à résoudre des problèmes complexes'
    ],
    postedDate: '2023-09-02'
  }
];

const JobListings = () => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const toggleJobDetails = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const filteredJobs = activeTab === 'all' 
    ? jobsData 
    : jobsData.filter(job => job.department.toLowerCase() === activeTab);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div id="openings">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="all">Tous les postes</TabsTrigger>
          <TabsTrigger value="technique">Technique</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription className="mt-2">
                        <div className="flex flex-wrap gap-2 items-center text-sm">
                          <span className="flex items-center">
                            <Briefcase className="mr-1 h-4 w-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            Publié le {formatDate(job.postedDate)}
                          </span>
                        </div>
                      </CardDescription>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        job.type === 'remote' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
                        job.type === 'hybrid' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
                        job.type === 'full-time' && 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
                        job.type === 'part-time' && 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
                      )}
                    >
                      {job.type === 'full-time' && 'Temps plein'}
                      {job.type === 'part-time' && 'Temps partiel'}
                      {job.type === 'remote' && 'Télétravail'}
                      {job.type === 'hybrid' && 'Hybride'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{job.description}</p>
                  
                  {expandedJob === job.id && (
                    <div className="mt-6 space-y-6 animate-fade-in">
                      <div>
                        <h4 className="font-bold mb-2">Responsabilités:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2">Prérequis:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.requirements.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => toggleJobDetails(job.id)}
                    className="flex items-center"
                  >
                    {expandedJob === job.id ? (
                      <>
                        <ChevronUp className="mr-1 h-4 w-4" />
                        Voir moins
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-1 h-4 w-4" />
                        Voir plus
                      </>
                    )}
                  </Button>
                  <Button asChild>
                    <a href="#apply">Postuler</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobListings;
