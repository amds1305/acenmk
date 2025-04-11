
import React, { useState } from 'react';
import { Search, FileText, Tag, Star, BookOpen, Download, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Types pour la CVthèque
interface CV {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  title: string;
  uploadDate: string;
  skills: string[];
  experience: number; // en années
  education: string;
  tags: string[];
  rating: number;
  lastInteraction: string;
}

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

const CVLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Filtre les CV en fonction du terme de recherche
  const filteredCVs = mockCVs.filter(cv => 
    cv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CVthèque</CardTitle>
          <CardDescription>Gérez et recherchez les CV des candidats</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Rechercher par nom, compétence, poste..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtres avancés
            </Button>
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grille
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                Liste
              </Button>
            </div>
          </div>

          {/* Contenu principal */}
          <div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCVs.map((cv) => (
                  <Card key={cv.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{cv.candidateName}</CardTitle>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < cv.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <CardDescription>{cv.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm"><strong>Expérience:</strong> {cv.experience} ans</p>
                      <p className="text-sm"><strong>Formation:</strong> {cv.education}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {cv.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {cv.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Modifié: {cv.lastInteraction}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
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
                    <TableRow key={cv.id}>
                      <TableCell className="font-medium">{cv.candidateName}</TableCell>
                      <TableCell>{cv.title}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {cv.skills.slice(0, 2).map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                              {skill}
                            </span>
                          ))}
                          {cv.skills.length > 2 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              +{cv.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{cv.experience} ans</TableCell>
                      <TableCell>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < cv.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{cv.lastInteraction}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVLibrary;
