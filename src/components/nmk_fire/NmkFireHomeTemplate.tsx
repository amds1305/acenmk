
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

// Composant principal du template NmkFire (inspiré de Teko.com.au)
const NmkFireHomeTemplate: React.FC = () => {
  return (
    <div className="nmk-fire-template flex flex-col min-h-screen w-full bg-[#1A1F2C] text-white">
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
