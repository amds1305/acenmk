
import React from 'react';

const NmkKinkTrustedClients: React.FC = () => {
  const clients = [
    { name: 'Company One', logo: 'https://via.placeholder.com/150x80?text=Logo+1' },
    { name: 'Company Two', logo: 'https://via.placeholder.com/150x80?text=Logo+2' },
    { name: 'Company Three', logo: 'https://via.placeholder.com/150x80?text=Logo+3' },
    { name: 'Company Four', logo: 'https://via.placeholder.com/150x80?text=Logo+4' },
    { name: 'Company Five', logo: 'https://via.placeholder.com/150x80?text=Logo+5' },
    { name: 'Company Six', logo: 'https://via.placeholder.com/150x80?text=Logo+6' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Nos clients
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            Ils nous font confiance
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-4 filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="max-h-16 max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkKinkTrustedClients;
