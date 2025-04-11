
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Job, emptyJob } from './types';
import JobTable from './JobTable';
import JobDialog from './JobDialog';
import { initialJobs } from './initialData';

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
          <JobTable 
            jobs={jobs} 
            onEditJob={handleEditJob} 
            onDeleteJob={handleDeleteJob} 
          />
        </CardContent>
      </Card>

      <JobDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        currentJob={currentJob}
        setCurrentJob={setCurrentJob}
        tempResponsibilities={tempResponsibilities}
        setTempResponsibilities={setTempResponsibilities}
        tempRequirements={tempRequirements}
        setTempRequirements={setTempRequirements}
        onSave={handleSaveJob}
        editMode={editMode}
      />
    </div>
  );
};

export default AdminCareers;
