
import React from 'react';

// Define service cards data
const services = [
  {
    id: '1',
    title: 'Industrial Automation',
    description: 'End-to-end automation solutions for manufacturing processes, increasing efficiency and reducing errors.',
    icon: '/icons/factory.svg',
    color: 'from-purple-500 to-indigo-700'
  },
  {
    id: '2',
    title: 'Robotic Integration',
    description: 'Seamless integration of robotic systems with your existing industrial infrastructure and workflows.',
    icon: '/icons/robot-arm.svg',
    color: 'from-blue-500 to-indigo-700'
  },
  {
    id: '3',
    title: 'Custom Robotics',
    description: 'Specialized robotic solutions designed for your unique production challenges and requirements.',
    icon: '/icons/cog-wheel.svg',
    color: 'from-indigo-500 to-violet-700'
  },
  {
    id: '4',
    title: 'AI & Machine Learning',
    description: 'Advanced AI algorithms that enable robots to learn, adapt, and optimize their operations over time.',
    icon: '/icons/microchip.svg',
    color: 'from-violet-500 to-purple-700'
  },
  {
    id: '5',
    title: 'Technical Support',
    description: '24/7 monitoring and support services ensuring your robotic systems operate at peak performance.',
    icon: '/icons/support.svg',
    color: 'from-fuchsia-500 to-purple-700'
  },
  {
    id: '6',
    title: 'Training & Certification',
    description: 'Comprehensive training programs for your staff to effectively operate and maintain robotic systems.',
    icon: '/icons/certificate.svg',
    color: 'from-purple-500 to-fuchsia-700'
  }
];

const NmkRobotServices = () => {
  return (
    <section id="services" className="relative py-24 bg-[#0F1624] text-white">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#111827] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#111827] to-transparent"></div>
      <div className="absolute top-1/4 right-0 w-60 h-60 bg-[#9b87f5]/20 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#8B5CF6]/15 rounded-full filter blur-[120px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
            Our Services
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Advanced Robotics Solutions
          </h2>
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We provide cutting-edge robotic technologies and services to enhance your operational efficiency and production capabilities.
          </p>
        </div>
        
        {services && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-gradient-to-br to-[#1A1F2C] from-[#111827] border border-gray-800 rounded-lg p-6 hover:border-[#9b87f5]/40 transition-all duration-300"
              >
                <div className={`w-14 h-14 mb-6 rounded-lg flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                  <img src={service.icon} alt="" className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300">
                  {service.description}
                </p>
                
                <div className="mt-6">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center text-[#9b87f5] hover:text-white transition-colors"
                  >
                    Learn more
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <a 
            href="#contact"
            className="inline-block px-8 py-4 bg-[#9b87f5] hover:bg-[#8a76e0] text-white font-medium rounded-md transition-colors"
          >
            Discuss your robotics needs
          </a>
        </div>
      </div>
    </section>
  );
};

export default NmkRobotServices;
