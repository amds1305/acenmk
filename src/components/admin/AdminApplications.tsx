
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Download, 
  MoreHorizontal, 
  Search, 
  ArrowUpDown, 
  Mail,
  Phone,
  Calendar,
  FileText,
  User,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types
type ApplicationStatus = 'new' | 'contacted' | 'interview' | 'offer' | 'hired' | 'rejected';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  date: string;
  status: ApplicationStatus;
  resumeUrl?: string;
  notes?: string;
  linkedinUrl?: string;
}

// Sample data
const applications: Application[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '06 12 34 56 78',
    position: 'Développeur Front-end React',
    date: '2023-11-15',
    status: 'new',
    resumeUrl: '/resumes/resume-1.pdf',
    notes: 'Candidate très prometteuse avec une solide expérience en React et Next.js.',
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@example.com',
    phone: '06 23 45 67 89',
    position: 'Designer UX/UI',
    date: '2023-11-10',
    status: 'interview',
    resumeUrl: '/resumes/resume-2.pdf',
    linkedinUrl: 'https://linkedin.com/in/thomas-bernard',
    notes: 'Premier entretien très positif. À programmer un test technique.',
  },
  {
    id: '3',
    name: 'Emma Dubois',
    email: 'emma.dubois@example.com',
    phone: '06 34 56 78 90',
    position: 'Chef de projet digital',
    date: '2023-11-05',
    status: 'contacted',
    resumeUrl: '/resumes/resume-3.pdf',
  },
  {
    id: '4',
    name: 'Lucas Leroy',
    email: 'lucas.leroy@example.com',
    phone: '06 45 67 89 01',
    position: 'Développeur Back-end Node.js',
    date: '2023-11-01',
    status: 'offer',
    resumeUrl: '/resumes/resume-4.pdf',
    notes: 'Candidat expérimenté, offer envoyée le 15/11.',
  },
  {
    id: '5',
    name: 'Chloé Petit',
    email: 'chloe.petit@example.com',
    phone: '06 56 78 90 12',
    position: 'Designer UX/UI',
    date: '2023-10-28',
    status: 'hired',
    resumeUrl: '/resumes/resume-5.pdf',
    notes: 'Démarre le 01/12/2023',
  },
  {
    id: '6',
    name: 'Hugo Moreau',
    email: 'hugo.moreau@example.com',
    phone: '06 67 89 01 23',
    position: 'Développeur Front-end React',
    date: '2023-10-25',
    status: 'rejected',
    resumeUrl: '/resumes/resume-6.pdf',
    notes: 'Profil intéressant mais pas assez expérimenté pour ce poste.',
  },
];

const AdminApplications = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<keyof Application>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter and sort applications
  const filteredApplications = applications
    .filter(app => 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

  const handleSort = (column: keyof Application) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = (applicationId: string, newStatus: ApplicationStatus) => {
    // In a real application, this would update the database
    console.log(`Changing status of application ${applicationId} to ${newStatus}`);
    
    toast({
      title: "Statut mis à jour",
      description: `Le statut de la candidature a été modifié avec succès.`,
    });
  };

  const renderStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Nouvelle</Badge>;
      case 'contacted':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Contacté</Badge>;
      case 'interview':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Entretien</Badge>;
      case 'offer':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Offre</Badge>;
      case 'hired':
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Embauché</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Refusé</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suivi des candidatures</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Exporter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Candidatures</CardTitle>
              <CardDescription>
                Gérez et suivez les candidatures pour tous les postes.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[300px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <button
                    className="flex items-center"
                    onClick={() => handleSort('name')}
                  >
                    Candidat
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center"
                    onClick={() => handleSort('position')}
                  >
                    Poste
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center"
                    onClick={() => handleSort('date')}
                  >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Aucune candidature trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div className="font-medium">{application.name}</div>
                      <div className="text-sm text-muted-foreground">{application.email}</div>
                    </TableCell>
                    <TableCell>{application.position}</TableCell>
                    <TableCell>
                      {new Date(application.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{renderStatusBadge(application.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedApplication(application);
                            setViewDialogOpen(true);
                          }}>
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <a 
                              href={`mailto:${application.email}`}
                              className="flex w-full"
                            >
                              Envoyer un email
                            </a>
                          </DropdownMenuItem>
                          {application.resumeUrl && (
                            <DropdownMenuItem>
                              <a 
                                href={application.resumeUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex w-full"
                              >
                                Télécharger le CV
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'new')}>
                            Nouvelle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'contacted')}>
                            Contacté
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'interview')}>
                            Entretien
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'offer')}>
                            Offre
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'hired')}>
                            Embauché
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'rejected')}>
                            Refusé
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle>Détails de la candidature</DialogTitle>
                <DialogDescription>
                  Information complète sur la candidature de {selectedApplication.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Informations personnelles</h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{selectedApplication.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`mailto:${selectedApplication.email}`} className="text-blue-600 hover:underline">
                          {selectedApplication.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`tel:${selectedApplication.phone}`} className="hover:underline">
                          {selectedApplication.phone}
                        </a>
                      </div>
                      {selectedApplication.linkedinUrl && (
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-2 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          <a 
                            href={selectedApplication.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Profil LinkedIn
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Statut actuel</h3>
                    <div className="mt-2">
                      {renderStatusBadge(selectedApplication.status)}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Actions</h3>
                    <div className="space-y-2 mt-2">
                      <Button className="w-full" asChild>
                        <a href={`mailto:${selectedApplication.email}`}>
                          <Mail className="mr-2 h-4 w-4" /> Envoyer un email
                        </a>
                      </Button>
                      {selectedApplication.resumeUrl && (
                        <Button variant="outline" className="w-full" asChild>
                          <a 
                            href={selectedApplication.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <FileText className="mr-2 h-4 w-4" /> Télécharger le CV
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Détails de la candidature</h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-start">
                        <div className="w-24 flex-shrink-0 text-muted-foreground">Poste</div>
                        <div className="font-medium">{selectedApplication.position}</div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-24 flex-shrink-0 text-muted-foreground">Date</div>
                        <div>
                          <Calendar className="inline-block mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(selectedApplication.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-24 flex-shrink-0 text-muted-foreground">Chronologie</div>
                        <div className="space-y-2 w-full">
                          <div className="flex items-center space-x-2">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${selectedApplication.status !== 'rejected' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {selectedApplication.status !== 'rejected' ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <XCircle className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <div 
                                  className={`h-full ${selectedApplication.status !== 'rejected' ? 'bg-green-500' : 'bg-red-500'}`} 
                                  style={{ 
                                    width: selectedApplication.status === 'new' ? '20%' : 
                                          selectedApplication.status === 'contacted' ? '40%' : 
                                          selectedApplication.status === 'interview' ? '60%' : 
                                          selectedApplication.status === 'offer' ? '80%' : 
                                          selectedApplication.status === 'hired' ? '100%' : 
                                          '100%' 
                                  }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs mt-1">
                                <span>Candidature</span>
                                <span>Contact</span>
                                <span>Entretien</span>
                                <span>Offre</span>
                                <span>Embauche</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedApplication.notes && (
                    <div>
                      <h3 className="text-lg font-medium">Notes</h3>
                      <div className="p-3 rounded-md bg-muted mt-2">
                        {selectedApplication.notes}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-medium">Changer le statut</h3>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Button 
                        variant={selectedApplication.status === 'contacted' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => handleStatusChange(selectedApplication.id, 'contacted')}
                      >
                        <Phone className="mr-1 h-3 w-3" /> Contacté
                      </Button>
                      <Button 
                        variant={selectedApplication.status === 'interview' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => handleStatusChange(selectedApplication.id, 'interview')}
                      >
                        <Calendar className="mr-1 h-3 w-3" /> Entretien
                      </Button>
                      <Button 
                        variant={selectedApplication.status === 'offer' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => handleStatusChange(selectedApplication.id, 'offer')}
                      >
                        <FileText className="mr-1 h-3 w-3" /> Offre
                      </Button>
                      <Button 
                        variant={selectedApplication.status === 'hired' ? 'default' : 'outline'} 
                        size="sm"
                        className="text-green-700 bg-green-100 hover:bg-green-200 border-green-200"
                        onClick={() => handleStatusChange(selectedApplication.id, 'hired')}
                      >
                        <CheckCircle className="mr-1 h-3 w-3" /> Embauché
                      </Button>
                      <Button 
                        variant={selectedApplication.status === 'rejected' ? 'default' : 'outline'} 
                        size="sm"
                        className="text-red-700 bg-red-100 hover:bg-red-200 border-red-200"
                        onClick={() => handleStatusChange(selectedApplication.id, 'rejected')}
                      >
                        <XCircle className="mr-1 h-3 w-3" /> Refusé
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(selectedApplication.id, 'new')}
                      >
                        <Clock className="mr-1 h-3 w-3" /> En attente
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplications;
