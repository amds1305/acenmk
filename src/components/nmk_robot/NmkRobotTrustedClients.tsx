
import React from 'react';

// Mock client data
const clients = [
  {
    id: '1',
    name: 'Tesla',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1280px-Tesla_Motors.svg.png',
    websiteUrl: 'https://tesla.com'
  },
  {
    id: '2',
    name: 'Boeing',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Boeing_full_logo.svg/2560px-Boeing_full_logo.svg.png',
    websiteUrl: 'https://boeing.com'
  },
  {
    id: '3',
    name: 'Siemens',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Siemens-logo.svg/2560px-Siemens-logo.svg.png',
    websiteUrl: 'https://siemens.com'
  },
  {
    id: '4',
    name: 'General Electric',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/General_Electric_logo.svg/2560px-General_Electric_logo.svg.png',
    websiteUrl: 'https://ge.com'
  },
  {
    id: '5',
    name: 'Toyota',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1280px-Toyota_carlogo.svg.png',
    websiteUrl: 'https://toyota.com'
  },
  {
    id: '6',
    name: 'ABB',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/2560px-ABB_logo.svg.png',
    websiteUrl: 'https://abb.com'
  }
];

const NmkRobotTrustedClients = () => {
  return (
    <section id="trusted-clients" className="py-20 bg-[#0F1624]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
            Our clients
          </span>
          
          <h2 className="text-3xl font-bold text-white mt-4">
            Trusted by Industry Leaders
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto mt-4">
            We collaborate with forward-thinking companies across industries to implement cutting-edge robotic solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 items-center">
          {clients.map((client) => (
            <div key={client.id} className="flex justify-center">
              <a 
                href={client.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block"
              >
                <img 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="max-h-12 w-auto object-contain brightness-0 invert opacity-75 hover:opacity-100 transition-opacity" 
                  title={client.name}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkRobotTrustedClients;
