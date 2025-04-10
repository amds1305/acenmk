
import React from 'react';

const NmkFireAbout = () => {
  return (
    <section id="about" className="py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="order-2 lg:order-1">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#888] mb-6">
              About Us
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 font-mono text-[#0d0d0d]">
              We're a team of digital product specialists
            </h2>
            
            <div className="space-y-6 text-[#333]">
              <p>
                Founded in 2015, Teko is a technology agency that specialises in helping tech founders bring their digital products and services to the Australian market.
              </p>
              
              <p>
                Our team combines deep technical expertise with local market knowledge to help our clients navigate the complexities of launching and scaling in Australia.
              </p>
              
              <p>
                Whether you're an established tech company looking to expand or a startup with an innovative idea, we provide the technical capabilities and strategic guidance needed to succeed.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div>
                <div className="text-4xl font-bold text-[#0d0d0d] mb-2">7+</div>
                <div className="text-[#555]">Years of experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0d0d0d] mb-2">50+</div>
                <div className="text-[#555]">Successful projects</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Our team" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 border-8 border-white"></div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-2/3 h-2/3 border-4 border-[#0d0d0d] -z-10"></div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#0d0d0d] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireAbout;
