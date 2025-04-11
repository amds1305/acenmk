
import React from 'react';
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NmkKinkTestimonials: React.FC = () => {
  // Utiliser les testimonials du composant existant
  const testimonials = [
    {
      text: "L'équipe a parfaitement compris notre vision et l'a transformée en une expérience numérique exceptionnelle qui a dépassé toutes nos attentes.",
      author: "Marie Dubois",
      position: "Directrice Marketing, TechStart",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1471",
      rating: 5
    },
    {
      text: "Leur approche méthodique et leur expertise technique nous ont permis de lancer notre plateforme e-commerce en un temps record avec des résultats impressionnants.",
      author: "Alexandre Martin",
      position: "CEO, FashionRetail",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=687",
      rating: 5
    },
    {
      text: "Une collaboration exceptionnelle qui a transformé notre présence en ligne et augmenté significativement notre taux de conversion.",
      author: "Sophie Lambert",
      position: "Fondatrice, GreenSolutions",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=764",
      rating: 4
    }
  ];
  
  // Fonction pour rendre les étoiles en fonction de la note
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={18}
            className={i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
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

        <div className="mx-auto max-w-7xl">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-6 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-6 md:pl-4 md:basis-1/3">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-8 md:p-10 shadow-sm h-full">
                    <div className="relative z-10">
                      {/* Système de notation en étoiles */}
                      {renderStars(testimonial.rating)}
                      
                      <blockquote className="text-lg leading-relaxed text-gray-800 mb-6">
                        "{testimonial.text}"
                      </blockquote>
                      
                      <div className="mt-6 flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <p className="font-bold text-gray-900">{testimonial.author}</p>
                          <p className="text-gray-600">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 md:hidden">
              <CarouselPrevious className="mr-2" />
              <CarouselNext className="ml-2" />
            </div>
            <CarouselPrevious className="absolute -left-12 top-1/2 hidden md:flex" />
            <CarouselNext className="absolute -right-12 top-1/2 hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NmkKinkTestimonials;
