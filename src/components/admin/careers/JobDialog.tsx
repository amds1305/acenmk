
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save } from 'lucide-react';
import JobFormTabs from './JobFormTabs';
import { Job } from './types';

interface JobDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentJob: Job;
  setCurrentJob: React.Dispatch<React.SetStateAction<Job>>;
  tempResponsibilities: string;
  setTempResponsibilities: React.Dispatch<React.SetStateAction<string>>;
  tempRequirements: string;
  setTempRequirements: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
  editMode: boolean;
}

const JobDialog: React.FC<JobDialogProps> = ({
  isOpen,
  setIsOpen,
  currentJob,
  setCurrentJob,
  tempResponsibilities,
  setTempResponsibilities,
  tempRequirements,
  setTempRequirements,
  onSave,
  editMode
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {editMode ? 'Modifier une offre d\'emploi' : 'Ajouter une offre d\'emploi'}
          </DialogTitle>
        </DialogHeader>
        
        <JobFormTabs 
          currentJob={currentJob}
          setCurrentJob={setCurrentJob}
          tempResponsibilities={tempResponsibilities}
          setTempResponsibilities={setTempResponsibilities}
          tempRequirements={tempRequirements}
          setTempRequirements={setTempRequirements}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            {editMode ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
