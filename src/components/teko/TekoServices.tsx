
import React from 'react';
import { ArrowRight } from 'lucide-react';

// Mock service data
const serviceItems = [
  {
    id: '1',
    title: 'UI/UX Design',
    description: 'We create intuitive and visually appealing interfaces that enhance user experience and drive engagement.',
    icon: '/icons/design.svg',
    link: '#'
  },
  {
    id: '2',
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance.',
    icon: '/icons/code.svg',
    link: '#'
  },
  {
    id: '3',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver seamless experiences across devices.',
    icon: '/icons/mobile.svg',
    link: '#'
  },
  {
    id: '4',
    title: 'E-commerce',
    description: 'Robust online stores with secure payment processing and inventory management systems.',
    icon: '/icons/cart.svg',
    link: '#'
  },
  {
    id: '5',
    title: 'Digital Marketing',
    description: 'Strategic marketing campaigns that increase visibility and drive qualified traffic to your business.',
    icon: '/icons/megaphone.svg',
    link: '#'
  },
  {
    id: '6',
    title: 'SEO Optimization',
    description: 'Search engine optimization to improve your rankings and attract more organic traffic.',
    icon: '/icons/search.svg',
    link: '#'
  }
];

const TekoServices = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold mb-2">WHAT WE DO</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We deliver comprehensive digital solutions tailored to meet your unique business needs and objectives.
          </p>
        </div>

        {serviceItems && serviceItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((service) => (
              <div 
                key={service.id} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 inline-block p-3 bg-teal-50 rounded-lg">
                  <img src={service.icon} alt="" className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <a 
                  href={service.link}
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
          >
            Discuss Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TekoServices;
