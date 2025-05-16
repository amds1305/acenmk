
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getTestimonials, Testimonial } from '@/services/supabase/testimonialsService';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    staleTime: 0,
    refetchOnMount: true,
  });
  
  console.log("Testimonials - Données reçues:", testimonials);
  
  // Données par défaut si aucune donnée n'est trouvée
  const defaultTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sophie Leclerc',
      role: 'Directrice Marketing',
      company: 'TechGlobe',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      content: 'Acenümerik a complètement transformé notre présence en ligne. Notre trafic web a augmenté de 150% en seulement 3 mois. L\'équipe est à l\'écoute et très compétente!',
      rating: 5,
    },
    {
      id: '2',
      name: 'Thomas Dubois',
      role: 'CEO',
      company: 'InnovateCorp',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      content: 'Le développement de notre application mobile par Acenümerik a dépassé toutes nos attentes. Les délais ont été respectés et le résultat est impeccable.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Marie Renaud',
      role: 'CTO',
      company: 'DataSmart',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      content: 'Je recommande vivement Acenümerik pour leur expertise en matière d\'infrastructure cloud. Ils ont su répondre parfaitement à nos besoins spécifiques.',
      rating: 4,
    },
    {
      id: '4',
      name: 'Philippe Moreau',
      role: 'Directeur Technique',
      company: 'EcoSolutions',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      content: 'La solution de commerce électronique développée par Acenümerik nous a permis d\'augmenter nos ventes en ligne de 200%. Un travail exceptionnel!',
      rating: 5,
    },
  ];
  
  if (isLoading) {
    return (
      <section className="elite-section elite-gradient text-white py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des témoignages:", error);
  }
  
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? displayTestimonials.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setActiveIndex((prev) => (prev === displayTestimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="elite-section elite-gradient text-white py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          <span className="inline-block text-sm font-medium bg-white/10 text-white/90 px-4 py-1.5 rounded-full mb-4">Témoignages</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Ce que nos clients disent</h2>
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl transition-all duration-500 animate-fade-in relative z-10 shadow-xl"
              key={displayTestimonials[activeIndex].id}
            >
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-xl md:text-2xl italic text-gray-100 mb-8 leading-relaxed">
                  "{displayTestimonials[activeIndex].content}"
                </p>
                
                <div className="flex flex-col items-center">
                  <img 
                    src={displayTestimonials[activeIndex].image || `https://via.placeholder.com/100?text=${displayTestimonials[activeIndex].name.charAt(0)}`} 
                    alt={displayTestimonials[activeIndex].name}
                    className="h-20 w-20 rounded-full object-cover border-2 border-primary shadow-lg hover-scale"
                  />
                  
                  <div className="mt-4">
                    <h3 className="text-xl font-bold">{displayTestimonials[activeIndex].name}</h3>
                    <p className="text-gray-300 text-sm">
                      {displayTestimonials[activeIndex].role}
                      {displayTestimonials[activeIndex].company ? `, ${displayTestimonials[activeIndex].company}` : ''}
                    </p>
                    <div className="flex items-center justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4", 
                            i < (displayTestimonials[activeIndex].rating || 5)
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
            <Button 
              onClick={goToPrevious}
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 rounded-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all hover-scale"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 rounded-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all hover-scale"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-10 space-x-2">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-3 rounded-full transition-all duration-300",
                  index === activeIndex ? "w-10 bg-primary" : "w-3 bg-white/30 hover:bg-white/50"
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
