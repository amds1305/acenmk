
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '@/services/supabase/testimonialsService';

const NmkRobotTestimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    staleTime: 0,
    refetchOnMount: true,
  });

  console.log("NmkRobotTestimonials - Données reçues:", testimonials);

  if (isLoading) {
    return (
      <section className="py-24 bg-[#1A1F2C]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-[#9b87f5] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des témoignages:", error);
  }

  const defaultTestimonials = [
    {
      content: "The integration of NMK's collaborative robots has significantly improved our production efficiency while maintaining the highest safety standards. Their team's expertise was invaluable throughout the implementation process.",
      name: "Jennifer Chen",
      role: "Head of Manufacturing",
      company: "TechPro Industries",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5
    },
    {
      content: "Working with NMK Robotics has been transformative for our facility. Their custom automation solutions addressed challenges specific to our industry that off-the-shelf products simply couldn't solve.",
      name: "Robert Keller",
      role: "Operations Director",
      company: "Advanced Electronics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5
    },
    {
      content: "The data analytics capabilities built into NMK's robotic systems have given us unprecedented visibility into our operations. We're now able to identify optimization opportunities we never knew existed.",
      name: "Sophia Williams",
      role: "Innovation Lead",
      company: "Global Manufacturing",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4
    }
  ];
  
  const displayTestimonials = testimonials && testimonials.length > 0 
    ? testimonials.slice(0, 3) 
    : defaultTestimonials;

  return (
    <section className="py-24 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="text-[#9b87f5] font-mono uppercase tracking-wider">
            Client Feedback
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-8 text-white">
            What our clients say about us
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id || index} 
              className="bg-[#111827] border border-gray-800 p-8 relative hover:border-[#9b87f5] transition-all duration-300"
            >
              <Quote className="h-10 w-10 text-[#9b87f5]/20 absolute top-6 right-6" />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#9b87f5] fill-[#9b87f5]" />
                ))}
                {[...Array(5 - (testimonial.rating || 5))].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-600" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-8 relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image || `https://via.placeholder.com/100?text=${testimonial.name.charAt(0)}`} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NmkRobotTestimonials;
