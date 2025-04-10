
import React from 'react';
import { ArrowRight, Shield, Cpu, Gauge, Settings, BarChart2 } from 'lucide-react';

const services = [
  {
    icon: <Cpu className="h-12 w-12 text-[#9b87f5]" />,
    title: 'Collaborative Robots',
    description: 'Robots designed to work alongside humans, enhancing productivity while ensuring safety in shared workspaces.',
    features: ['Easy Programming', 'Built-in Safety', 'Flexible Deployment']
  },
  {
    icon: <Shield className="h-12 w-12 text-[#9b87f5]" />,
    title: 'Industrial Automation',
    description: 'Complete automation solutions for manufacturing processes, improving efficiency and reducing operational costs.',
    features: ['Process Optimization', 'Custom Integration', 'Remote Monitoring']
  },
  {
    icon: <Gauge className="h-12 w-12 text-[#9b87f5]" />,
    title: 'Performance Analytics',
    description: 'Advanced analytics tools to monitor and optimize robotic performance across your production line.',
    features: ['Real-time Metrics', 'Predictive Maintenance', 'Efficiency Reports']
  }
];

const NmkRobotServices = () => {
  return (
    <section id="services" className="py-24 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
            Our Solutions
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8 text-white">
            Cutting-edge robotics for tomorrow's challenges
          </h2>
          
          <p className="text-gray-300 text-xl">
            Our comprehensive range of robotic solutions delivers precision, reliability, and advanced capabilities for modern industrial environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-[#111827]/50 border border-gray-800 p-8 hover:border-[#9b87f5] transition-all duration-300"
            >
              <div className="mb-6">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-8">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <span className="w-1.5 h-1.5 bg-[#9b87f5] block"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#contact" className="text-[#9b87f5] font-medium inline-flex items-center group">
                <span className="border-b border-[#9b87f5]/30 group-hover:border-[#9b87f5] transition-colors">
                  Learn more
                </span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center p-8 bg-[#111827]/30 border border-gray-800">
            <div className="text-center">
              <Settings className="h-10 w-10 text-[#9b87f5] mx-auto mb-4" />
              <h3 className="text-xl font-bold">Custom Solutions</h3>
              <p className="text-gray-400 mt-2">Tailored to your specific requirements</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-8 bg-[#111827]/30 border border-gray-800">
            <div className="text-center">
              <BarChart2 className="h-10 w-10 text-[#9b87f5] mx-auto mb-4" />
              <h3 className="text-xl font-bold">Data Analytics</h3>
              <p className="text-gray-400 mt-2">Make informed decisions with real-time data</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-8 bg-[#111827]/30 border border-gray-800">
            <div className="text-center">
              <Shield className="h-10 w-10 text-[#9b87f5] mx-auto mb-4" />
              <h3 className="text-xl font-bold">Safety Standards</h3>
              <p className="text-gray-400 mt-2">Exceeding industry safety requirements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkRobotServices;
