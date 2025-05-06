
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
