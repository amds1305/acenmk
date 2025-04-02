
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

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
    <section className="elite-section elite-gradient text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <span className="inline-block text-sm font-medium text-white/80 uppercase tracking-wider mb-4">Témoignages</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ce que nos clients disent</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="text-xl text-gray-200 mt-8 max-w-3xl mx-auto">
            La satisfaction de nos clients est notre priorité absolue
          </p>
        </div>
        
        <div className="mt-16 relative">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-0 left-0 -translate-x-8 -translate-y-8">
              <Quote className="h-20 w-20 text-primary/30" fill="currentColor" />
            </div>
            
            {/* Testimonial Card */}
            <div 
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-lg transition-all duration-500 animate-fade-in relative z-10"
              key={testimonials[activeIndex].id}
            >
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-xl md:text-2xl italic text-gray-100 mb-8">
                  "{testimonials[activeIndex].content}"
                </p>
                
                <div className="flex flex-col items-center">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-primary"
                  />
                  
                  <div className="mt-4">
                    <h3 className="text-xl font-bold">{testimonials[activeIndex].name}</h3>
                    <p className="text-gray-300 text-sm">{testimonials[activeIndex].role}</p>
                    <div className="flex items-center justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4", 
                            i < testimonials[activeIndex].rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-500"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 rounded-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 rounded-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-10 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  index === activeIndex ? "w-8 bg-primary" : "w-2.5 bg-white/30"
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
