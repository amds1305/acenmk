
import React from 'react';
import NmkKinkHero from './NmkKinkHero';
import NmkKinkServices from './NmkKinkServices';
import NmkKinkAbout from './NmkKinkAbout';
import NmkKinkTeam from './NmkKinkTeam';
import NmkKinkTrustedClients from './NmkKinkTrustedClients';
import NmkKinkTestimonials from './NmkKinkTestimonials';
import NmkKinkFaq from './NmkKinkFaq';
import NmkKinkContact from './NmkKinkContact';

const NmkKinkHomeTemplate: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NmkKinkHero />
      <NmkKinkServices />
      <NmkKinkAbout />
      <NmkKinkTeam />
      <NmkKinkTrustedClients />
      <NmkKinkTestimonials />
      <NmkKinkFaq />
      <NmkKinkContact />
    </div>
  );
};

export default NmkKinkHomeTemplate;
