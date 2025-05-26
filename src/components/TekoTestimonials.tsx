
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '@/services/supabase/testimonialsService';

const TekoTestimonials: React.FC = () => {
  const { data: testimonials, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    staleTime: 0,
    refetchOnMount: true,
  });
  
  console.log("TekoTestimonials - Données reçues:", testimonials);
  
  if (isLoading) {
    return (
      <section className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des témoignages:", error);
    return null;
  }
  
  // Si nous n'avons pas de données, utiliser des données par défaut
  const defaultTestimonials = [
    {
      name: 'Sophie Leclerc',
      role: 'Directrice Marketing',
      company: 'TechGlobe',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      content: 'Acenümerik a complètement transformé notre présence en ligne. Notre trafic web a augmenté de 150% en seulement 3 mois. L\'équipe est à l\'écoute et très compétente!',
      rating: 5
    },
    {
      name: 'Thomas Dubois',
      role: 'CEO',
      company: 'InnovateCorp',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      content: 'Le développement de notre application mobile par Acenümerik a dépassé toutes nos attentes. Les délais ont été respectés et le résultat est impeccable.',
      rating: 5
    },
    {
      name: 'Marie Renaud',
      role: 'CTO',
      company: 'DataSmart',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      content: 'Je recommande vivement Acenümerik pour leur expertise en matière d\'infrastructure cloud. Ils ont su répondre parfaitement à nos besoins spécifiques.',
      rating: 4
    }
  ];
  
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Ce que nos clients disent
          </h2>
          <p className="text-gray-600 md:text-lg">
            Découvrez les témoignages de clients qui ont transformé leur activité grâce à nos solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial.id || index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-gray-600 mb-6">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.image || `https://via.placeholder.com/100?text=${testimonial.name.charAt(0)}`} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0a0c10]">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TekoTestimonials;
