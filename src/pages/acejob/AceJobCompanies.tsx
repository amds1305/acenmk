
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Users, Briefcase } from "lucide-react";

const AceJobCompanies = () => {
  const companies = [
    {
      id: "1",
      name: "Tech Solutions",
      industry: "IT & Services",
      location: "Paris",
      size: "50-200 employés",
      openPositions: 3
    },
    {
      id: "2",
      name: "Creative Agency",
      industry: "Marketing & Publicité",
      location: "Lyon",
      size: "10-50 employés",
      openPositions: 1
    },
    {
      id: "3",
      name: "Digital Group",
      industry: "Conseil Numérique",
      location: "Bordeaux",
      size: "200-500 employés",
      openPositions: 5
    }
  ];

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
                <BreadcrumbPage>Entreprises</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Entreprises partenaires</h1>
            <Button>Ajouter une entreprise</Button>
          </div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Card key={company.id} className="overflow-hidden">
                <div className="h-3 bg-primary"></div>
                <CardHeader>
                  <CardTitle>{company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{company.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <span>{company.openPositions} poste(s) ouvert(s)</span>
                    </div>
                    <div className="pt-4 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Voir détails
                      </Button>
                      <Button size="sm" className="flex-1">
                        Gérer offres
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AceJobCompanies;
