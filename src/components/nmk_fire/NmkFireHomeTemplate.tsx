
import React from 'react';
import {
  NmkFireHero,
  NmkFireServices,
  NmkFireAbout,
  NmkFireTeam,
  NmkFireTrustedClients,
  NmkFireTestimonials,
  NmkFireFaq,
  NmkFireContact
} from './index';

// Composant principal du template NmkFire
const NmkFireHomeTemplate: React.FC = () => {
  return (
    <div className="nmk-fire-template flex flex-col min-h-screen w-full">
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
