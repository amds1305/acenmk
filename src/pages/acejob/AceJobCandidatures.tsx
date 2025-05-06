
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AceJobCandidatures = () => {
  const applications = [
    {
      id: "1",
      name: "Jean Dupont",
      position: "Développeur Front-end React",
      company: "Tech Solutions",
      date: "2023-05-10",
      status: "new"
    },
    {
      id: "2",
      name: "Marie Martin",
      position: "Designer UX/UI",
      company: "Creative Agency",
      date: "2023-05-05",
      status: "screening"
    },
    {
      id: "3",
      name: "Pierre Dubois",
      position: "Chef de Projet Web",
      company: "Digital Group",
      date: "2023-04-28",
      status: "interview"
    },
    {
      id: "4",
      name: "Sophie Laurent",
      position: "Développeur Front-end React",
      company: "Tech Solutions",
      date: "2023-05-08",
      status: "offer"
    },
    {
      id: "5",
      name: "Lucas Bernard",
      position: "Développeur Back-end Node.js",
      company: "Tech Solutions",
      date: "2023-04-20",
      status: "rejected"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      new: { label: "Nouveau", variant: "default" },
      screening: { label: "Pré-sélection", variant: "secondary" },
      interview: { label: "Entretien", variant: "info" },
      offer: { label: "Offre", variant: "success" },
      rejected: { label: "Rejeté", variant: "destructive" }
    };
    
    const statusInfo = statusStyles[status as keyof typeof statusStyles] || { label: status, variant: "default" };
    
    return (
      <Badge variant={statusInfo.variant as any}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-6">
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
                <BreadcrumbPage>Candidatures</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Gestion des candidatures</h1>
            <Button>Exporter</Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <Table>
              <TableCaption>Liste des candidatures récentes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Candidat</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.position}</TableCell>
                    <TableCell>{app.company}</TableCell>
                    <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Voir détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AceJobCandidatures;
