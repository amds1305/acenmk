
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CVCard from '../CVCard';
import CVListItem from '../CVListItem';
import { CV } from '../types';

interface CVContentProps {
  cvs: CV[];
  viewMode: string;
  onShowUpload: () => void;
}

const CVContent = ({ cvs, viewMode, onShowUpload }: CVContentProps) => {
  if (cvs.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium">Aucun CV trouvé</h3>
        <p className="mt-2 text-sm text-gray-500">
          Essayez de modifier vos critères de recherche ou importez de nouveaux CV.
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={onShowUpload}
        >
          Importer des CV
        </Button>
      </div>
    );
  }
  
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cvs.map((cv) => (
          <CVCard key={cv.id} cv={cv} />
        ))}
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Poste</TableHead>
          <TableHead>Compétences</TableHead>
          <TableHead>Expérience</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Dernière interaction</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cvs.map((cv) => (
          <CVListItem key={cv.id} cv={cv} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CVContent;
