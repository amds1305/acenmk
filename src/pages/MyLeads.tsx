
import React from 'react';
import { LeadsList } from '@/components/leads';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MyLeadsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mes leads</h1>
        <LeadsList />
      </main>
      <Footer />
    </div>
  );
};

export default MyLeadsPage;
