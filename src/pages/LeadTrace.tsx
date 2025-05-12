
import React from 'react';
import { Lead } from '@/components/lead-trace';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LeadTracePage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <Lead />
      </main>
      <Footer />
    </>
  );
};

export default LeadTracePage;
