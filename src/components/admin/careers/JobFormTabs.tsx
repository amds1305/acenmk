
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WysiwygEditor from '../WysiwygEditor';
import { Job, typesOptions } from './types';

interface JobFormTabsProps {
  currentJob: Job;
  setCurrentJob: React.Dispatch<React.SetStateAction<Job>>;
  tempResponsibilities: string;
  setTempResponsibilities: React.Dispatch<React.SetStateAction<string>>;
  tempRequirements: string;
  setTempRequirements: React.Dispatch<React.SetStateAction<string>>;
}

const JobFormTabs: React.FC<JobFormTabsProps> = ({
  currentJob,
  setCurrentJob,
  tempResponsibilities,
  setTempResponsibilities,
  tempRequirements,
  setTempRequirements
}) => {
  return (
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
  );
};

export default JobFormTabs;
