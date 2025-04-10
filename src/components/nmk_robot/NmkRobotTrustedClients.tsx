
import React from 'react';

const clients = [
  { name: 'Tech Industries', logo: 'https://via.placeholder.com/150x80?text=TechIndustries' },
  { name: 'Global Manufacturing', logo: 'https://via.placeholder.com/150x80?text=GlobalMfg' },
  { name: 'Precision Robotics', logo: 'https://via.placeholder.com/150x80?text=PrecisionRobotics' },
  { name: 'Future Systems', logo: 'https://via.placeholder.com/150x80?text=FutureSystems' },
  { name: 'Advanced Automation', logo: 'https://via.placeholder.com/150x80?text=AdvancedAuto' },
  { name: 'Quantum Industries', logo: 'https://via.placeholder.com/150x80?text=QuantumInd' },
];

const NmkRobotTrustedClients = () => {
  return (
    <section className="py-20 bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
            Our Clients
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-white">
            Trusted by industry leaders
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-4 filter grayscale hover:grayscale-0 hover:filter-none transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="max-h-16 max-w-full"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-8 bg-[#1A1F2C] border border-gray-800 text-center">
          <p className="text-xl text-gray-300 mb-6">
            "NMK Robotics has transformed our manufacturing capabilities with their advanced collaborative robots, increasing our productivity by 35%."
          </p>
          <div className="text-white font-bold">Michael Thompson</div>
          <div className="text-[#9b87f5]">Director of Operations, Global Manufacturing</div>
        </div>
      </div>
    </section>
  );
};

export default NmkRobotTrustedClients;
