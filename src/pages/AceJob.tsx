
import React from 'react';
import AdminApplications from '@/components/admin/AdminApplications';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AceJob = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">ACE JOB - Gestion des candidatures</h1>
          <AdminApplications />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AceJob;
