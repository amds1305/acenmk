
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Team from '@/components/Team';

const TeamPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Team />
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
