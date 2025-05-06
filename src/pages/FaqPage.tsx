
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';

const FaqPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <FaqSection />
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage;
