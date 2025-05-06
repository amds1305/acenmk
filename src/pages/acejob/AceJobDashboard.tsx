
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

const AceJobDashboard = () => {
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
                <BreadcrumbPage>ACE JOB - Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-4xl font-bold mb-8 text-center">ACE JOB - Tableau de bord</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-2">Candidatures</h3>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">5 nouvelles cette semaine</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-2">CV dans la CVthèque</h3>
              <p className="text-3xl font-bold">48</p>
              <p className="text-sm text-muted-foreground">+3 depuis le mois dernier</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-2">Offres actives</h3>
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm text-muted-foreground">2 sur le point d'expirer</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
            <div className="space-y-4">
              <div className="pb-4 border-b dark:border-gray-700">
                <p className="font-medium">Nouveau CV ajouté : Développeur Full Stack</p>
                <p className="text-sm text-muted-foreground">Il y a 2 heures</p>
              </div>
              <div className="pb-4 border-b dark:border-gray-700">
                <p className="font-medium">Candidature reçue pour : Designer UX/UI</p>
                <p className="text-sm text-muted-foreground">Hier</p>
              </div>
              <div className="pb-4 border-b dark:border-gray-700">
                <p className="font-medium">Nouvelle offre publiée : Développeur React Native</p>
                <p className="text-sm text-muted-foreground">Il y a 2 jours</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Prochaines actions</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" id="task1" className="rounded text-primary" />
                  <label htmlFor="task1">Évaluer les CV des nouveaux candidats</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" id="task2" className="rounded text-primary" />
                  <label htmlFor="task2">Planifier des entretiens pour le poste de DevOps</label>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" id="task3" className="rounded text-primary" />
                  <label htmlFor="task3">Mettre à jour la description du poste de Chef de projet</label>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Analyse des candidatures</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Développeur Front-end</span>
                    <span>8 candidats</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Développeur Back-end</span>
                    <span>5 candidats</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>UX/UI Designer</span>
                    <span>3 candidats</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AceJobDashboard;
