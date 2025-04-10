
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getHomepageConfig } from '@/services/sections';

const NmkFireHero = () => {
  const { data: config } = useQuery({
    queryKey: ['homeConfig'],
    queryFn: getHomepageConfig,
  });
  
  // Récupérer les données du Hero
  const heroData = config?.sectionData?.hero || {
    title: 'Transforming how technology is delivered in Australia',
    subtitle: 'We partner with tech founders to bring your digital products and services to the Australian market.',
    ctaText: 'See our services',
    ctaSecondaryText: 'Get in touch'
  };

  return (
    <section className="w-full h-screen relative overflow-hidden bg-[#0d0d0d]">
      {/* Background with dot pattern */}
      <div className="absolute inset-0 bg-[#0d0d0d] opacity-90">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '16px 16px'
          }}
        />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto h-full flex flex-col justify-center px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div>
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
                Digital Agency
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tight font-mono">
              {heroData.title}
            </h1>
            <p className="text-lg text-[#999] max-w-xl font-light">
              {heroData.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-[#0d0d0d] rounded-none px-8 py-6 h-auto font-mono"
              >
                {heroData.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border border-white text-white hover:bg-white/5 rounded-none px-8 py-6 h-auto font-mono"
              >
                {heroData.ctaSecondaryText}
              </Button>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            {/* Main image with glitch effect */}
            <div className="relative">
              <div className="relative z-20 border-8 border-white/10">
                <div className="glitch-container">
                  <div className="glitch-item">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Digital Solutions" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="glitch-item">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Digital Solutions" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="glitch-item">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Digital Solutions" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                
                {/* Scanlines effect */}
                <div className="absolute inset-0 bg-scanlines opacity-30 z-20 pointer-events-none"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 border-t-4 border-r-4 border-white/20"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border-b-4 border-l-4 border-white/20"></div>
            </div>
            
            {/* Additional decorative elements */}
            <div className="absolute bottom-1/4 -right-12 w-24 h-1 bg-white/40"></div>
            <div className="absolute top-1/4 -left-12 w-1 h-24 bg-white/40"></div>
          </div>
        </div>
        
        {/* Client logos section - optional based on data */}
        {heroData.showTrustedClients && (
          <div className="absolute bottom-12 left-0 right-0 border-t border-white/10 pt-8">
            <div className="container mx-auto px-4 sm:px-8">
              <p className="text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
                {heroData.trustedClientsTitle || 'Our clients'}
              </p>
              <div className="flex flex-wrap gap-10 items-center">
                {heroData.trustedClients?.map((client) => (
                  <div key={client.id} className="h-8 opacity-60 hover:opacity-100 transition-opacity">
                    {client.websiteUrl ? (
                      <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                        <img 
                          src={client.logoUrl} 
                          alt={client.name} 
                          className="h-full w-auto brightness-0 invert" 
                          title={client.name}
                        />
                      </a>
                    ) : (
                      <img 
                        src={client.logoUrl} 
                        alt={client.name} 
                        className="h-full w-auto brightness-0 invert" 
                        title={client.name}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style>
        {`
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-3px, 2px); }
            40% { transform: translate(-3px, -2px); }
            60% { transform: translate(3px, 2px); }
            80% { transform: translate(3px, -2px); }
            100% { transform: translate(0); }
          }
          
          .glitch-container {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 100%;
          }
          
          .glitch-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          
          .glitch-item:nth-child(1) {
            left: 2px;
            animation: glitch 4s infinite linear alternate-reverse;
          }
          
          .glitch-item:nth-child(2) {
            left: -2px;
            animation: glitch 7s infinite linear alternate;
          }
          
          .glitch-item:nth-child(3) {
            left: 0;
            opacity: 0.8;
          }
          
          .bg-scanlines {
            background: linear-gradient(
              to bottom,
              transparent 50%,
              rgba(0, 0, 0, 0.1) 50%
            );
            background-size: 100% 4px;
          }
        `}
      </style>
    </section>
  );
};

export default NmkFireHero;
