
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PlusIcon, Trash2Icon, PencilIcon, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WysiwygEditor from './WysiwygEditor';

interface Job {
  id: string;
  title: string;
  type: 'full-time' | 'part-time' | 'remote' | 'hybrid';
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

const typesOptions = [
  { value: 'full-time', label: 'Temps plein' },
  { value: 'part-time', label: 'Temps partiel' },
  { value: 'remote', label: 'Télétravail' },
  { value: 'hybrid', label: 'Hybride' },
];

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Développeur Frontend React',
    type: 'full-time',
    location: 'Paris, France',
    department: 'Développement',
    description: 'Nous recherchons un développeur Frontend React expérimenté pour rejoindre notre équipe...',
    responsibilities: [
      'Développer des interfaces utilisateur modernes et responsives',
      'Collaborer avec les designers et les développeurs backend',
      'Participer aux revues de code et à l\'amélioration continue'
    ],
    requirements: [
      'Minimum 3 ans d\'expérience avec React',
      'Bonne connaissance de JavaScript/TypeScript',
      'Expérience avec les outils modernes de développement frontend'
    ],
    postedDate: '2023-04-15',
  },
  {
    id: '2',
    title: 'Designer UX/UI Senior',
    type: 'hybrid',
    location: 'Lyon, France',
    department: 'Design',
    description: 'Rejoignez notre équipe design pour créer des expériences utilisateur exceptionnelles...',
    responsibilities: [
      'Concevoir des interfaces utilisateur intuitives et esthétiques',
      'Réaliser des recherches utilisateurs et des tests d\'utilisabilité',
      'Collaborer avec l\'équipe de développement pour implémenter les designs'
    ],
    requirements: [
      'Portfolio démontrant vos compétences en design d\'interfaces',
      'Expérience avec Figma, Adobe XD ou outils similaires',
      'Connaissance des principes d\'accessibilité'
    ],
    postedDate: '2023-05-22',
  },
];

const emptyJob: Job = {
  id: '',
  title: '',
  type: 'full-time',
  location: '',
  department: '',
  description: '',
  responsibilities: [],
  requirements: [],
  postedDate: format(new Date(), 'yyyy-MM-dd'),
};

const AdminCareers = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job>({...emptyJob});
  const [editMode, setEditMode] = useState(false);
  const [tempResponsibilities, setTempResponsibilities] = useState('');
  const [tempRequirements, setTempRequirements] = useState('');

  const handleAddNewJob = () => {
    setCurrentJob({
      ...emptyJob,
      id: Math.random().toString(36).substr(2, 9),
      postedDate: format(new Date(), 'yyyy-MM-dd')
    });
    setTempResponsibilities('');
    setTempRequirements('');
    setEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setCurrentJob({...job});
    setTempResponsibilities(job.responsibilities.join('\n'));
    setTempRequirements(job.requirements.join('\n'));
    setEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSaveJob = () => {
    // Validation simple
    if (!currentJob.title || !currentJob.location) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Préparation des données avec les listes formatées
    const jobToSave: Job = {
      ...currentJob,
      responsibilities: tempResponsibilities.split('\n').filter(item => item.trim() !== ''),
      requirements: tempRequirements.split('\n').filter(item => item.trim() !== '')
    };

    if (editMode) {
      // Mise à jour d'un job existant
      setJobs(jobs.map(job => job.id === jobToSave.id ? jobToSave : job));
    } else {
      // Ajout d'un nouveau job
      setJobs([...jobs, jobToSave]);
    }

    setIsDialogOpen(false);
    toast({
      title: editMode ? "Offre mise à jour" : "Nouvelle offre ajoutée",
      description: `L'offre d'emploi a été ${editMode ? 'mise à jour' : 'ajoutée'} avec succès.`,
    });
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre d\'emploi ?')) {
      setJobs(jobs.filter(job => job.id !== id));
      toast({
        title: "Offre supprimée",
        description: "L'offre d'emploi a été supprimée avec succès.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des offres d'emploi</h1>
          <p className="text-muted-foreground">
            Ajoutez, modifiez ou supprimez des offres d'emploi pour la page Carrières.
          </p>
        </div>
        <Button onClick={handleAddNewJob}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Ajouter une offre
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Offres d'emploi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Date de publication</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>
                    {typesOptions.find(option => option.value === job.type)?.label || job.type}
                  </TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>
                    {format(new Date(job.postedDate), 'dd MMMM yyyy', { locale: fr })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditJob(job)}>
                        <PencilIcon className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteJob(job.id)}>
                        <Trash2Icon className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {jobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Aucune offre d'emploi disponible. Cliquez sur "Ajouter une offre" pour créer votre première offre.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editMode ? 'Modifier une offre d\'emploi' : 'Ajouter une offre d\'emploi'}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4 grid grid-cols-3">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="responsibilities">Responsabilités</TabsTrigger>
              <TabsTrigger value="requirements">Exigences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job-title">Titre du poste*</Label>
                  <Input 
                    id="job-title" 
                    value={currentJob.title} 
                    onChange={(e) => setCurrentJob({...currentJob, title: e.target.value})}
                    placeholder="ex: Développeur Frontend React"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-type">Type de contrat*</Label>
                  <Select 
                    value={currentJob.type} 
                    onValueChange={(value: 'full-time' | 'part-time' | 'remote' | 'hybrid') => 
                      setCurrentJob({...currentJob, type: value})
                    }
                  >
                    <SelectTrigger id="job-type">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typesOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="job-location">Localisation*</Label>
                  <Input 
                    id="job-location" 
                    value={currentJob.location} 
                    onChange={(e) => setCurrentJob({...currentJob, location: e.target.value})}
                    placeholder="ex: Paris, France"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-department">Département</Label>
                  <Input 
                    id="job-department" 
                    value={currentJob.department} 
                    onChange={(e) => setCurrentJob({...currentJob, department: e.target.value})}
                    placeholder="ex: Développement"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="job-description">Description du poste*</Label>
                <WysiwygEditor 
                  content={currentJob.description} 
                  onChange={(content) => setCurrentJob({...currentJob, description: content})}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="responsibilities" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-responsibilities">
                  Responsabilités (une par ligne)
                </Label>
                <Textarea 
                  id="job-responsibilities" 
                  value={tempResponsibilities} 
                  onChange={(e) => setTempResponsibilities(e.target.value)}
                  placeholder="Ajoutez chaque responsabilité sur une nouvelle ligne"
                  rows={10}
                />
                <p className="text-sm text-muted-foreground">
                  Listez les principales responsabilités associées à ce poste, une par ligne.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="requirements" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-requirements">
                  Exigences/Compétences requises (une par ligne)
                </Label>
                <Textarea 
                  id="job-requirements" 
                  value={tempRequirements} 
                  onChange={(e) => setTempRequirements(e.target.value)}
                  placeholder="Ajoutez chaque exigence sur une nouvelle ligne"
                  rows={10}
                />
                <p className="text-sm text-muted-foreground">
                  Listez les qualifications, compétences ou exigences nécessaires pour ce poste, une par ligne.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveJob}>
              <Save className="mr-2 h-4 w-4" />
              {editMode ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCareers;
