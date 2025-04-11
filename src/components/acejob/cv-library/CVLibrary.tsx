
import React, { useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import CVCard from './CVCard';
import CVListItem from './CVListItem';
import CVSearch from './CVSearch';
import CVFilters from './CVFilters';
import CVUpload from './CVUpload';
import CVStats from './CVStats';
import CVAIAssistant from './CVAIAssistant';
import { CV } from './types';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

// Données factices pour la démonstration
const mockCVs: CV[] = [
  {
    id: '1',
    candidateName: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    title: 'Développeur Frontend Senior',
    uploadDate: '2025-04-02',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    experience: 5,
    education: 'Master en Informatique',
    tags: ['Frontend', 'Disponible'],
    rating: 4,
    lastInteraction: '2025-04-05'
  },
  {
    id: '2',
    candidateName: 'Marie Martin',
    email: 'marie.martin@example.com',
    phone: '+33 6 98 76 54 32',
    title: 'Designer UX/UI',
    uploadDate: '2025-03-28',
    skills: ['Figma', 'Adobe XD', 'Prototypage'],
    experience: 3,
    education: 'Licence en Design',
    tags: ['Design', 'Entretien planifié'],
    rating: 5,
    lastInteraction: '2025-04-10'
  },
  {
    id: '3',
    candidateName: 'Pierre Lefebvre',
    email: 'pierre.lefebvre@example.com',
    phone: '+33 6 45 67 89 01',
    title: 'Développeur Backend Java',
    uploadDate: '2025-04-01',
    skills: ['Java', 'Spring Boot', 'MySQL'],
    experience: 7,
    education: 'Doctorat en Informatique',
    tags: ['Backend', 'En processus'],
    rating: 3,
    lastInteraction: '2025-04-08'
  }
];

const CVLibraryRefactored = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { toast } = useToast();

  // Filtre les CV en fonction du terme de recherche
  const filteredCVs = mockCVs.filter(cv => 
    cv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApplyFilters = () => {
    setShowFilters(false);
    toast({
      title: "Filtres appliqués",
      description: "Les résultats ont été filtrés selon vos critères."
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation fil d'ariane */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/ace-job">ACE JOB</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>CVthèque</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>CVthèque</CardTitle>
            <CardDescription>Gérez et recherchez les CV des candidats</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowStats(!showStats)}
              className="flex items-center gap-2"
            >
              {showStats ? "Masquer les stats" : "Afficher les stats"}
            </Button>
            <Button 
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Importer des CV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showStats && (
            <div className="mb-6">
              <CVStats />
            </div>
          )}
          
          {/* Barre de recherche et filtres */}
          <CVSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm}
            onOpenFilters={() => setShowFilters(true)}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Contenu principal */}
          <div>
            {filteredCVs.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Aucun CV trouvé</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Essayez de modifier vos critères de recherche ou importez de nouveaux CV.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowUpload(true)}
                >
                  Importer des CV
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCVs.map((cv) => (
                  <CVCard key={cv.id} cv={cv} />
                ))}
              </div>
            ) : (
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
                  {filteredCVs.map((cv) => (
                    <CVListItem key={cv.id} cv={cv} />
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Dialogs et composants flottants */}
      <CVFilters 
        isOpen={showFilters} 
        onClose={() => setShowFilters(false)} 
        onApplyFilters={handleApplyFilters}
      />
      
      <CVUpload
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
      />
      
      <CVAIAssistant />
    </div>
  );
};

export default CVLibraryRefactored;
