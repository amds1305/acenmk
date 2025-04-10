
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const NmkKinkTestimonials: React.FC = () => {
  const testimonials = [
    {
      text: "L'équipe a parfaitement compris notre vision et l'a transformée en une expérience numérique exceptionnelle qui a dépassé toutes nos attentes.",
      author: "Marie Dubois",
      position: "Directrice Marketing, TechStart",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1471"
    },
    {
      text: "Leur approche méthodique et leur expertise technique nous ont permis de lancer notre plateforme e-commerce en un temps record avec des résultats impressionnants.",
      author: "Alexandre Martin",
      position: "CEO, FashionRetail",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=687"
    },
    {
      text: "Une collaboration exceptionnelle qui a transformé notre présence en ligne et augmenté significativement notre taux de conversion.",
      author: "Sophie Lambert",
      position: "Fondatrice, GreenSolutions",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=764"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            Témoignages
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Ce qu'en disent nos clients
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-8 md:p-12">
            <Quote className="absolute right-8 top-8 h-16 w-16 text-gray-200" />
            
            <div className="relative z-10">
              <blockquote className="text-xl md:text-2xl leading-relaxed text-gray-800">
                "{testimonials[currentIndex].text}"
              </blockquote>
              
              <div className="mt-8 flex items-center">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].author} 
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-bold text-gray-900">{testimonials[currentIndex].author}</p>
                  <p className="text-gray-600">{testimonials[currentIndex].position}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button 
              onClick={prevTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors hover:bg-gray-100"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors hover:bg-gray-100"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkTestimonials;
