
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Briefcase, UserPlus, MoreHorizontal, PlusCircle, FileText, Users, Mail, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  date: string;
  status: 'new' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
}

// Formulaire pour ajouter/modifier une offre d'emploi
const jobFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Le titre doit contenir au moins 2 caractères.',
  }),
  department: z.string().min(1, {
    message: 'Veuillez sélectionner un département.',
  }),
  location: z.string().min(2, {
    message: 'Veuillez préciser le lieu de travail.',
  }),
  type: z.enum(['full-time', 'part-time', 'remote', 'hybrid'], {
    required_error: 'Veuillez sélectionner un type de contrat.',
  }),
  description: z.string().min(10, {
    message: 'La description doit contenir au moins 10 caractères.',
  }),
  responsibilities: z.string().transform(val => val.split('\n').filter(item => item.trim() !== '')),
  requirements: z.string().transform(val => val.split('\n').filter(item => item.trim() !== '')),
});

const AdminCareers = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Développeur Front-end React',
      department: 'Technique',
      location: 'Paris, France',
      type: 'hybrid',
      description: 'Nous recherchons un développeur Front-end React expérimenté pour rejoindre notre équipe technique.',
      responsibilities: [
        'Concevoir et développer des interfaces utilisateur réactives',
        'Collaborer avec les designers UX/UI',
        'Optimiser les applications pour une performance maximale'
      ],
      requirements: [
        'Au moins 3 ans d\'expérience en développement front-end',
        'Maîtrise de React.js et TypeScript',
        'Connaissance des bonnes pratiques de performance web'
      ],
      postedDate: '2023-09-15'
    },
    {
      id: '2',
      title: 'Designer UX/UI',
      department: 'Design',
      location: 'Lyon, France',
      type: 'full-time',
      description: 'Venez créer des expériences utilisateur exceptionnelles pour nos produits digitaux.',
      responsibilities: [
        'Créer des wireframes, prototypes et maquettes',
        'Réaliser des recherches utilisateurs',
        'Concevoir des interfaces intuitives et accessibles'
      ],
      requirements: [
        'Au moins 2 ans d\'expérience en design d\'interfaces',
        'Maîtrise de Figma et d\'autres outils de design',
        'Portfolio démontrant des projets UX/UI réussis'
      ],
      postedDate: '2023-09-10'
    }
  ]);
  
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '06 12 34 56 78',
      position: 'Développeur Front-end React',
      date: '2023-09-20',
      status: 'new'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      phone: '07 65 43 21 09',
      position: 'Designer UX/UI',
      date: '2023-09-18',
      status: 'reviewing'
    },
    {
      id: '3',
      name: 'Pierre Lefebvre',
      email: 'pierre.lefebvre@example.com',
      phone: '06 78 90 12 34',
      position: 'Développeur Front-end React',
      date: '2023-09-15',
      status: 'interview'
    }
  ]);
  
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      description: '',
      responsibilities: '',
      requirements: '',
    },
  });
  
  // Fonction pour ajouter/modifier une offre d'emploi
  function onSubmitJob(values: z.infer<typeof jobFormSchema>) {
    const newJob = {
      id: editingJob ? editingJob.id : Date.now().toString(),
      ...values,
      postedDate: editingJob ? editingJob.postedDate : new Date().toISOString().split('T')[0]
    };
    
    if (editingJob) {
      setJobs(jobs.map(job => job.id === editingJob.id ? newJob : job));
      toast.success('Offre d\'emploi mise à jour avec succès');
    } else {
      setJobs([...jobs, newJob]);
      toast.success('Nouvelle offre d\'emploi ajoutée avec succès');
    }
    
    setShowJobForm(false);
    setEditingJob(null);
    form.reset();
  }
  
  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    form.reset({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      responsibilities: job.responsibilities.join('\n'),
      requirements: job.requirements.join('\n'),
    });
    setShowJobForm(true);
  };
  
  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
    toast.success('Offre d\'emploi supprimée avec succès');
  };
  
  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
  };
  
  const handleUpdateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
    toast.success(`Statut de candidature mis à jour: ${status}`);
  };
  
  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Nouveau</Badge>;
      case 'reviewing':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">En cours</Badge>;
      case 'interview':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">Entretien</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Accepté</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Refusé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des carrières</h1>
          <p className="text-muted-foreground">Gérez les offres d'emploi et les candidatures.</p>
        </div>
        <Button onClick={() => {
          setEditingJob(null);
          form.reset({
            title: '',
            department: '',
            location: '',
            type: 'full-time',
            description: '',
            responsibilities: '',
            requirements: '',
          });
          setShowJobForm(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvelle offre
        </Button>
      </div>

      <Tabs defaultValue="jobs">
        <TabsList>
          <TabsTrigger value="jobs" className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4" />
            Offres d'emploi
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center">
            <UserPlus className="mr-2 h-4 w-4" />
            Candidatures
            <Badge className="ml-2 bg-primary">{applications.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Liste des offres d'emploi</CardTitle>
              <CardDescription>
                {jobs.length} offres d'emploi actives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Département</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date de publication</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>{new Date(job.postedDate).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditJob(job)}>
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive" 
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Candidatures reçues</CardTitle>
              <CardDescription>
                Gérez les candidatures et suivez leur statut
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Poste</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.name}</TableCell>
                      <TableCell>{application.position}</TableCell>
                      <TableCell>{new Date(application.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewApplication(application)}>
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUpdateApplicationStatus(application.id, 'new')}>
                              Marquer comme nouveau
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateApplicationStatus(application.id, 'reviewing')}>
                              En cours d'examen
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateApplicationStatus(application.id, 'interview')}>
                              Planifier entretien
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateApplicationStatus(application.id, 'accepted')}>
                              Accepter
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive" 
                              onClick={() => handleUpdateApplicationStatus(application.id, 'rejected')}
                            >
                              Refuser
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialogue pour ajouter/modifier une offre d'emploi */}
      <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingJob ? 'Modifier l\'offre d\'emploi' : 'Ajouter une offre d\'emploi'}</DialogTitle>
            <DialogDescription>
              {editingJob ? 'Modifiez les détails de l\'offre d\'emploi' : 'Remplissez le formulaire pour créer une nouvelle offre d\'emploi'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitJob)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre du poste</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Développeur Front-end React" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Département</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un département" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technique">Technique</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Management">Management</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lieu</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Paris, France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de contrat</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de contrat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full-time">Temps plein</SelectItem>
                        <SelectItem value="part-time">Temps partiel</SelectItem>
                        <SelectItem value="remote">Télétravail</SelectItem>
                        <SelectItem value="hybrid">Hybride</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Description détaillée du poste..." 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="responsibilities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsabilités</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Listez les responsabilités (une par ligne)..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Entrez une responsabilité par ligne.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prérequis</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Listez les prérequis (un par ligne)..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Entrez un prérequis par ligne.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">{editingJob ? 'Mettre à jour' : 'Ajouter'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue pour voir les détails d'une candidature */}
      <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && setSelectedApplication(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle>Détails de la candidature</DialogTitle>
                <DialogDescription>
                  Informations du candidat pour le poste de {selectedApplication.position}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{selectedApplication.name}</h3>
                  {getStatusBadge(selectedApplication.status)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Email</Label>
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${selectedApplication.email}`} className="text-primary hover:underline">
                        {selectedApplication.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Téléphone</Label>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${selectedApplication.phone}`} className="hover:underline">
                        {selectedApplication.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Poste souhaité</Label>
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    {selectedApplication.position}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Date de candidature</Label>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {new Date(selectedApplication.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric'
                    })}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Lettre de motivation</Label>
                  <div className="bg-muted/50 p-4 rounded-md text-sm">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p className="mt-2">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">CV / Resume</Label>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline text-sm">
                      CV_{selectedApplication.name.replace(' ', '_')}.pdf
                    </a>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between items-center flex-wrap sm:flex-nowrap gap-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleUpdateApplicationStatus(selectedApplication.id, 'rejected');
                      setSelectedApplication(null);
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    Refuser
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleUpdateApplicationStatus(selectedApplication.id, 'reviewing');
                      setSelectedApplication(null);
                    }}
                  >
                    En cours d'examen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleUpdateApplicationStatus(selectedApplication.id, 'interview');
                      setSelectedApplication(null);
                    }}
                  >
                    Planifier entretien
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      handleUpdateApplicationStatus(selectedApplication.id, 'accepted');
                      setSelectedApplication(null);
                    }}
                  >
                    Accepter
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCareers;
