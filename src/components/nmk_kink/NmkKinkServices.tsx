
import React from 'react';
import { ArrowRight } from 'lucide-react';

// Mock service data
const serviceItems = [
  {
    id: '1',
    title: 'UI/UX Design',
    description: 'We craft intuitive and engaging user experiences that delight your customers and achieve your business goals.',
    icon: '/icons/brush.svg',
    link: '#'
  },
  {
    id: '2',
    title: 'Web Development',
    description: 'From simple websites to complex web applications, we build responsive, high-performance digital experiences.',
    icon: '/icons/code.svg',
    link: '#'
  },
  {
    id: '3',
    title: 'Branding',
    description: 'We help establish your brand identity with strategic positioning and visually compelling designs.',
    icon: '/icons/palette.svg',
    link: '#'
  },
  {
    id: '4',
    title: 'SEO Optimization',
    description: 'Improve your visibility and reach more customers through our effective SEO strategies.',
    icon: '/icons/search.svg',
    link: '#'
  },
  {
    id: '5',
    title: 'Digital Marketing',
    description: 'Comprehensive marketing campaigns that help you connect with your target audience and drive conversions.',
    icon: '/icons/chart.svg',
    link: '#'
  },
  {
    id: '6',
    title: 'Content Creation',
    description: 'Engaging content that resonates with your audience and strengthens your brand message.',
    icon: '/icons/pen.svg',
    link: '#'
  }
];

const NmkKinkServices = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Services
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Ce que nous proposons
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Des solutions complètes pour tous vos besoins numériques, de la conception à la mise en œuvre.
          </p>
        </div>

        {serviceItems && serviceItems.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((service) => (
              <div key={service.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg">
                <div className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-900">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="h-6 w-6"
                    />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                  <p className="mb-8 text-gray-600">{service.description}</p>
                  <a
                    href={service.link}
                    className="inline-flex items-center text-sm font-semibold text-gray-900 transition-colors hover:text-gray-700"
                  >
                    En savoir plus
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-gray-900 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center rounded-full border-2 border-gray-900 bg-gray-900 px-6 py-3 text-white transition-all duration-300 hover:bg-transparent hover:text-gray-900"
          >
            Discuter de votre projet
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkServices;
