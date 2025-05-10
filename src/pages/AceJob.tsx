
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import AdminApplications from '@/components/admin/AdminApplications';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CVLibrary from '@/components/acejob/CVLibrary';
import CVGenerator from '@/components/acejob/CVGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import ProtectedModule from '@/components/shared/ProtectedModule';

// Définir les rôles qui peuvent accéder à ce module
const requiredRoles = ['admin', 'super_admin', 'business_admin', 'contributor'];

const AceJob = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const { toast } = useToast();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Afficher une notification lors du changement d'onglet
    const tabMessages = {
      applications: "Gestion des candidatures actives",
      cvlibrary: "Accès à la CVthèque",
      cvgenerator: "Création et optimisation de CV"
    };
    
    toast({
      title: `${tabMessages[value as keyof typeof tabMessages]}`,
      description: "Chargement des données terminé",
    });
  };
  
  return (
    <ProtectedModule requiredRoles={requiredRoles} path="/acejob">
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
                  <BreadcrumbPage>ACE JOB</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          
            <h1 className="text-4xl font-bold mb-8 text-center">ACE JOB - Gestion des candidatures</h1>
            
            <Tabs defaultValue="applications" className="w-full" onValueChange={handleTabChange} value={activeTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="applications">Candidatures</TabsTrigger>
                <TabsTrigger value="cvlibrary">CVthèque</TabsTrigger>
                <TabsTrigger value="cvgenerator">Générateur de CV</TabsTrigger>
              </TabsList>
              
              <TabsContent value="applications">
                <AdminApplications />
              </TabsContent>
              
              <TabsContent value="cvlibrary">
                <CVLibrary />
              </TabsContent>
              
              <TabsContent value="cvgenerator">
                <CVGenerator />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
        <Toaster />
      </div>
    </ProtectedModule>
  );
};

export default AceJob;
