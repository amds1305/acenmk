
import React, { useState } from 'react';
import AdminApplications from '@/components/admin/AdminApplications';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CVLibrary from '@/components/acejob/CVLibrary';
import CVGenerator from '@/components/acejob/CVGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AceJob = () => {
  const [activeTab, setActiveTab] = useState("applications");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">ACE JOB - Gestion des candidatures</h1>
          
          <Tabs defaultValue="applications" className="w-full" onValueChange={setActiveTab} value={activeTab}>
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
    </div>
  );
};

export default AceJob;
