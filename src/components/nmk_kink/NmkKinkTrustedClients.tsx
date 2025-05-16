
import React from 'react';

// Mock client data
const clients = [
  {
    id: '1',
    name: 'Google',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
    websiteUrl: 'https://google.com'
  },
  {
    id: '2',
    name: 'Microsoft',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
    websiteUrl: 'https://microsoft.com'
  },
  {
    id: '3',
    name: 'Amazon',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
    websiteUrl: 'https://amazon.com'
  },
  {
    id: '4',
    name: 'Apple',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png',
    websiteUrl: 'https://apple.com'
  },
  {
    id: '5',
    name: 'Facebook',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/2048px-Facebook_f_logo_%282021%29.svg.png',
    websiteUrl: 'https://facebook.com'
  },
  {
    id: '6',
    name: 'Netflix',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
    websiteUrl: 'https://netflix.com'
  }
];

const NmkKinkTrustedClients = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Ils nous font confiance
          </span>
          <h2 className="mt-4 text-3xl font-bold">
            Nos clients fidèles
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client) => (
            <div key={client.id} className="flex justify-center">
              {client.websiteUrl ? (
                <a 
                  href={client.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block grayscale hover:grayscale-0 transition-all"
                >
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="max-h-12 w-auto object-contain" 
                    title={client.name}
                  />
                </a>
              ) : (
                <img 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all" 
                  title={client.name}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkKinkTrustedClients;
