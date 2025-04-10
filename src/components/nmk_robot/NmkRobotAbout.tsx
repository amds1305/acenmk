
import React from 'react';

const NmkRobotAbout = () => {
  return (
    <section id="about" className="py-24 bg-[#111827]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 border-2 border-[#9b87f5]">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Advanced robotics in action" 
                className="w-full h-auto object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/20 to-transparent mix-blend-overlay"></div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-2/3 h-2/3 border-2 border-[#9b87f5] -z-10"></div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#9b87f5] -z-10"></div>
          </div>
          
          <div>
            <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
              About Us
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8 text-white">
              Pioneering the future of industrial robotics
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <p>
                Founded in 2010, NMK Robotics has been at the forefront of designing and implementing advanced robotic solutions for industrial applications worldwide.
              </p>
              
              <p>
                Our team combines expertise in robotics, artificial intelligence, and industrial automation to deliver customized solutions that enhance productivity, improve safety, and drive innovation.
              </p>
              
              <p>
                With a commitment to technological excellence and customer satisfaction, we continue to push the boundaries of what's possible in robotic automation.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-[#9b87f5] mb-2">12+</div>
                <div className="text-gray-400">Years of innovation</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#9b87f5] mb-2">200+</div>
                <div className="text-gray-400">Global installations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#9b87f5] mb-2">98%</div>
                <div className="text-gray-400">Client satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#9b87f5] mb-2">24/7</div>
                <div className="text-gray-400">Technical support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkRobotAbout;
