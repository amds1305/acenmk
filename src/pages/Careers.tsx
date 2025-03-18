
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobListings from '@/components/careers/JobListings';
import CareerHero from '@/components/careers/CareerHero';
import CareersAbout from '@/components/careers/CareersAbout';
import ApplicationForm from '@/components/careers/ApplicationForm';
import { Briefcase } from 'lucide-react';

const Careers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <CareerHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <CareersAbout />
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-2 flex items-center justify-center">
              <Briefcase className="mr-2 h-6 w-6 text-primary" />
              Nos offres d'emploi
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Rejoignez notre équipe dynamique et contribuez à la création de solutions numériques innovantes
            </p>
            <JobListings />
          </div>
          <div id="apply" className="mt-16 pt-8">
            <ApplicationForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
