
import React from 'react';
import NmkRobotHero from './NmkRobotHero';
import NmkRobotServices from './NmkRobotServices';
import NmkRobotAbout from './NmkRobotAbout';
import NmkRobotTeam from './NmkRobotTeam';
import NmkRobotTrustedClients from './NmkRobotTrustedClients';
import NmkRobotTestimonials from './NmkRobotTestimonials';
import NmkRobotFaq from './NmkRobotFaq';
import NmkRobotContact from './NmkRobotContact';

const NmkRobotHomeTemplate: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#111827] text-white">
      <NmkRobotHero />
      <NmkRobotServices />
      <NmkRobotAbout />
      <NmkRobotTeam />
      <NmkRobotTrustedClients />
      <NmkRobotTestimonials />
      <NmkRobotFaq />
      <NmkRobotContact />
    </div>
  );
};

export default NmkRobotHomeTemplate;
