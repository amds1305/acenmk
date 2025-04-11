
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import JobTable from './JobTable';
import JobDialog from './JobDialog';
import { Job, emptyJob } from './types';
import { initialJobs } from './initialData';

export const AdminCareers = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job>(emptyJob);
  const [editMode, setEditMode] = useState(false);
  const [tempResponsibilities, setTempResponsibilities] = useState('');
  const [tempRequirements, setTempRequirements] = useState('');
  const { toast } = useToast();

  const handleAddJob = () => {
    setCurrentJob({
      ...emptyJob,
      postedDate: new Date().toISOString().split('T')[0]
    });
    setTempResponsibilities('');
    setTempRequirements('');
    setEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setCurrentJob(job);
    setTempResponsibilities(job.responsibilities.join('\n'));
    setTempRequirements(job.requirements.join('\n'));
    setEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
    toast({
      title: 'Offre d\'emploi supprimée',
      description: 'L\'offre d\'emploi a été supprimée avec succès.',
    });
  };

  const handleSaveJob = () => {
    if (!currentJob.title || !currentJob.location || !currentJob.department || !currentJob.description) {
      toast({
        title: 'Informations manquantes',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive'
      });
      return;
    }

    const responsibilities = tempResponsibilities
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const requirements = tempRequirements
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (responsibilities.length === 0 || requirements.length === 0) {
      toast({
        title: 'Informations manquantes',
        description: 'Veuillez ajouter au moins une responsabilité et une exigence.',
        variant: 'destructive'
      });
      return;
    }

    const updatedJob = {
      ...currentJob,
      responsibilities,
      requirements
    };

    if (editMode) {
      setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
      toast({
        title: 'Offre d\'emploi mise à jour',
        description: 'L\'offre d\'emploi a été mise à jour avec succès.',
      });
    } else {
      const newJob = {
        ...updatedJob,
        id: uuidv4()
      };
      setJobs([...jobs, newJob]);
      toast({
        title: 'Offre d\'emploi ajoutée',
        description: 'L\'offre d\'emploi a été ajoutée avec succès.',
      });
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des offres d'emploi</h1>
        <Button onClick={handleAddJob}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une offre
        </Button>
      </div>

      <JobTable 
        jobs={jobs} 
        onEditJob={handleEditJob} 
        onDeleteJob={handleDeleteJob}
      />

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
