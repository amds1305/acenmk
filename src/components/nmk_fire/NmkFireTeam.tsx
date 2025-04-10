
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    name: 'Daniel Thompson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    name: 'Sarah Chen',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    name: 'Michael Rodriguez',
    role: 'UX Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3'
  },
  {
    name: 'Emma Johnson',
    role: 'Strategy Lead',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3'
  }
];

const NmkFireTeam = () => {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
            Our Team
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 font-mono text-[#0d0d0d]">
            Meet our digital product specialists
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="relative mb-4 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full aspect-[4/5] object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#0d0d0d] transition-all"></div>
              </div>
              <h3 className="text-xl font-bold font-mono text-[#0d0d0d]">{member.name}</h3>
              <p className="text-[#555]">{member.role}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="inline-block border-4 border-[#0d0d0d] p-8 bg-white relative">
            <h3 className="text-2xl font-bold mb-4 font-mono text-[#0d0d0d]">Join our team</h3>
            <p className="text-[#555] mb-6 max-w-lg mx-auto">
              We're always looking for talented individuals to join our team. Check out our current openings.
            </p>
            <Button 
              asChild
              className="bg-[#0d0d0d] text-white hover:bg-[#333] rounded-none px-8 py-6 h-auto font-mono"
            >
              <a href="/careers">
                View open positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            
            <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-[#0d0d0d] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireTeam;
