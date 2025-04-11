
import React, { useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import CVContent from './components/CVContent';
import CVSearch from './CVSearch';
import CVFilters from './CVFilters';
import CVUpload from './CVUpload';
import CVStats from './CVStats';
import CVAIAssistant from './CVAIAssistant';
import { mockCVs } from './data/mockData';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

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
          <CVContent 
            cvs={filteredCVs} 
            viewMode={viewMode}
            onShowUpload={() => setShowUpload(true)} 
          />
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
