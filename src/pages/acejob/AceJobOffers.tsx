
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AceJobOffers = () => {
  const offers = [
    {
      id: "1",
      title: "Développeur Front-end React",
      company: "Tech Solutions",
      location: "Paris",
      contract: "CDI",
      salary: "45-55k€",
      date: "2023-05-01",
      status: "active"
    },
    {
      id: "2",
      title: "Designer UX/UI",
      company: "Creative Agency",
      location: "Lyon",
      contract: "CDD",
      salary: "40-50k€",
      date: "2023-04-15",
      status: "active"
    },
    {
      id: "3",
      title: "Chef de Projet Web",
      company: "Digital Group",
      location: "Bordeaux",
      contract: "Freelance",
      salary: "450€/jour",
      date: "2023-05-10",
      status: "active"
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
                <BreadcrumbPage>Offres d'emploi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Offres d'emploi</h1>
            <Button>Ajouter une offre</Button>
          </div>
          
          <div className="grid gap-6">
            {offers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{offer.title}</CardTitle>
                      <CardDescription>{offer.company} - {offer.location}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Type de contrat:</span>
                        <span>{offer.contract}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Salaire:</span>
                        <span>{offer.salary}</span>
                      </div>
                    </div>
                    <div className="space-y-1 mt-4 md:mt-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Date de publication:</span>
                        <span>{new Date(offer.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Statut:</span>
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          {offer.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm">Voir les candidatures</Button>
                    <Button variant="outline" size="sm">Désactiver</Button>
                    <Button variant="destructive" size="sm">Supprimer</Button>
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

export default AceJobOffers;
