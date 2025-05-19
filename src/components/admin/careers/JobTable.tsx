
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Job, typesOptions } from './types';

interface JobTableProps {
  jobs: Job[];
  onEditJob: (job: Job) => void;
  onDeleteJob: (id: string) => void;
}

const JobTable: React.FC<JobTableProps> = ({ jobs, onEditJob, onDeleteJob }) => {
  return (
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
                <Button variant="outline" size="sm" onClick={() => onEditJob(job)}>
                  <PencilIcon className="h-4 w-4" />
                  <span className="sr-only">Modifier</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDeleteJob(job.id)}>
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
  );
};

export default JobTable;
