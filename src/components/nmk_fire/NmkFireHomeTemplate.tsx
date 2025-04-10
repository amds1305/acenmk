
import React from 'react';
import NmkFireHero from './NmkFireHero';
import NmkFireServices from './NmkFireServices';
import NmkFireAbout from './NmkFireAbout';
import NmkFireTeam from './NmkFireTeam';
import NmkFireTrustedClients from './NmkFireTrustedClients';
import NmkFireTestimonials from './NmkFireTestimonials';
import NmkFireFaq from './NmkFireFaq';
import NmkFireContact from './NmkFireContact';

const NmkFireHomeTemplate: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-[#0d0d0d]">
      <NmkFireHero />
      <NmkFireServices />
      <NmkFireAbout />
      <NmkFireTeam />
      <NmkFireTrustedClients />
      <NmkFireTestimonials />
      <NmkFireFaq />
      <NmkFireContact />
    </div>
  );
};

export default NmkFireHomeTemplate;
