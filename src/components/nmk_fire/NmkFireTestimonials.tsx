
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    content: "L'équipe a parfaitement compris nos besoins et nous a proposé une solution qui a dépassé nos attentes. Le projet a été livré dans les délais et dans le budget imparti.",
    author: "Alexandre Martin",
    position: "Directeur Marketing, TechCorp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    content: "La collaboration avec cette équipe a été un véritable plaisir. Leur expertise technique et leur approche proactive ont été des atouts majeurs pour notre projet de transformation digitale.",
    author: "Sophie Durand",
    position: "CEO, Innov'Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    content: "Grâce à leur expertise en UX/UI, notre application a connu une augmentation significative de son taux de conversion. Un partenaire de confiance pour tous nos futurs projets.",
    author: "Thomas Bernard",
    position: "CTO, StartupNation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const NmkFireTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 dark:bg-purple-900/10 rounded-full opacity-50"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/10 rounded-full opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-1.5 rounded-full mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-300">
            Ce que nos clients disent
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Découvrez l'expérience de ceux qui nous ont fait confiance
          </p>
        </div>
        
        {/* Carousel de témoignages */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div className="transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 px-4"
                    style={{ display: index === currentIndex ? 'block' : 'none' }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-700 relative">
                      <div className="absolute top-8 left-8 text-purple-200 dark:text-purple-900/40">
                        <Quote size={64} />
                      </div>
                      
                      <div className="relative z-10">
                        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-8 italic">
                          {testimonial.content}
                        </p>
                        
                        <div className="flex items-center">
                          <div className="mr-4">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.author} 
                              className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 dark:border-purple-800" 
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
                            <p className="text-purple-600 dark:text-purple-400 text-sm">{testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contrôles du carousel */}
          <div className="flex justify-center mt-10 gap-4">
            <Button 
              onClick={goToPrevious} 
              variant="outline" 
              size="icon" 
              className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/20"
            >
              <ChevronLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </Button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex 
                      ? 'bg-purple-600 dark:bg-purple-400 scale-125' 
                      : 'bg-purple-200 dark:bg-purple-800'
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            <Button 
              onClick={goToNext} 
              variant="outline" 
              size="icon" 
              className="rounded-full border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/20"
            >
              <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NmkFireTestimonials;
