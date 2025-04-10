
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: 'Digital Product Development',
    description: 'Building custom digital products that deliver exceptional user experiences and business outcomes.',
    items: ['Mobile Applications', 'Web Platforms', 'SaaS Solutions']
  },
  {
    title: 'Technical Consulting',
    description: 'Expert advice on technology selection, architecture and implementation strategies.',
    items: ['Technology Roadmaps', 'System Architecture', 'Technical Due Diligence']
  },
  {
    title: 'Innovation Lab',
    description: 'Creating transformative solutions through rapid prototyping and experimentation.',
    items: ['Proof of Concepts', 'MVP Development', 'Emerging Technologies']
  }
];

const NmkFireServices = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
            Our Capabilities
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 font-mono text-[#0d0d0d]">
            We help tech founders succeed in the Australian market
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="border-t-2 border-[#0d0d0d] pt-8">
              <h3 className="text-xl font-bold mb-4 font-mono text-[#0d0d0d]">
                {service.title}
              </h3>
              
              <p className="text-[#555] mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-8">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-[#0d0d0d]">
                    <span className="w-1.5 h-1.5 bg-[#0d0d0d] block"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#contact" className="text-[#0d0d0d] font-medium inline-flex items-center font-mono group">
                <span className="border-b border-[#0d0d0d] group-hover:border-transparent transition-colors">
                  Learn more
                </span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <Button 
            asChild
            className="bg-[#0d0d0d] text-white hover:bg-[#333] rounded-none px-8 py-6 h-auto font-mono"
          >
            <a href="#contact">
              Get in touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NmkFireServices;
