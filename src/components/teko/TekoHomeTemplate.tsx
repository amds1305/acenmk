
import React from 'react';
import {
  TekoHero,
  TekoServices,
  TekoAbout,
  TekoTeam,
  TekoTrustedClients,
  TekoTestimonials,
  TekoFaq,
  TekoContact
} from './index';

// Component principal du template Teko
const TekoHomeTemplate: React.FC = () => {
  return (
    <div className="teko-template flex flex-col min-h-screen w-full">
      <TekoHero />
      <TekoServices />
      <TekoAbout />
      <TekoTeam />
      <TekoTrustedClients />
      <TekoTestimonials />
      <TekoFaq />
      <TekoContact />
    </div>
  );
};

export default TekoHomeTemplate;
