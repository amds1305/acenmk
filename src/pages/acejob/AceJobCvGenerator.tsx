
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

const AceJobCvGenerator = () => {
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
                <BreadcrumbPage>Générateur de CV</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-4xl font-bold mb-8 text-center">Générateur de CV</h1>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6">Créez votre CV professionnel</h2>
            <p className="mb-4">
              Utilisez notre outil de création de CV pour générer un curriculum vitae 
              professionnel qui mettra en valeur vos compétences et votre expérience.
            </p>
            
            <div className="mt-8">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Le générateur de CV est en cours d'intégration...
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AceJobCvGenerator;
