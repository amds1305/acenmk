
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Leclerc',
    role: 'Directrice Marketing, TechGlobe',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    content: 'Acenümerik a complètement transformé notre présence en ligne. Notre trafic web a augmenté de 150% en seulement 3 mois. L\'équipe est à l\'écoute et très compétente!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: 'CEO, InnovateCorp',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    content: 'Le développement de notre application mobile par Acenümerik a dépassé toutes nos attentes. Les délais ont été respectés et le résultat est impeccable.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Marie Renaud',
    role: 'CTO, DataSmart',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop',
    content: 'Je recommande vivement Acenümerik pour leur expertise en matière d\'infrastructure cloud. Ils ont su répondre parfaitement à nos besoins spécifiques.',
    rating: 4,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Ce que nos clients disent</h2>
          <p className="section-subtitle mx-auto mt-4">
            La satisfaction de nos clients est notre priorité absolue
          </p>
        </div>
        
        <div className="mt-16 relative">
          <div className="relative max-w-3xl mx-auto">
            {/* Testimonial Card */}
            <div 
              className="glass-panel p-8 md:p-10 transition-all duration-500 animate-fade-in"
              key={testimonials[activeIndex].id}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="h-20 w-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{testimonials[activeIndex].name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonials[activeIndex].role}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "h-4 w-4", 
                          i < testimonials[activeIndex].rating 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                        )} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-lg italic text-gray-700 dark:text-gray-200">
                "{testimonials[activeIndex].content}"
              </p>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full p-3 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:bg-[#ca3c66] hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full p-3 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all hover:bg-[#ca3c66] hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  index === activeIndex ? "w-8 bg-[#ca3c66]" : "w-2.5 bg-gray-300 dark:bg-gray-600"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
