
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, ArrowRight, CheckCircle } from 'lucide-react';
import { getHomepageConfig } from '@/services/sections';
import { HeroData } from '@/components/Hero';
import { Button } from '@/components/ui/button';

const TekoHero: React.FC = () => {
  const { data: heroData } = useQuery({
    queryKey: ['heroData'],
    queryFn: async () => {
      const config = getHomepageConfig();
      
      if (config.sectionData && config.sectionData.hero) {
        return config.sectionData.hero as HeroData;
      }
      
      return {
        title: 'Solutions numériques innovantes pour votre entreprise',
        subtitle: 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.',
        ctaText: 'Découvrir nos services',
        ctaSecondaryText: 'Nous contacter',
        backgroundImage: ''
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section className="relative bg-[#0a0c10] text-white overflow-hidden min-h-screen flex items-center">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMjE1MjAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsLW9wYWNpdHk9Ii4wNCIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4K')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/20 via-[#0a0c10]/40 to-[#0a0c10]"></div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Eyebrow text */}
          <div className="inline-flex items-center gap-2 mb-6 text-xs md:text-sm font-medium bg-white/10 text-white/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
            <span className="bg-teal-500 w-2 h-2 rounded-full"></span>
            Innovation Numérique
            <ChevronRight className="h-3 w-3 opacity-60" />
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            {heroData?.title || 'Solutions numériques innovantes pour votre entreprise'}
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl">
            {heroData?.subtitle || 'Nous accompagnons les entreprises dans leur transformation numérique avec des solutions sur mesure et des experts passionnés.'}
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button 
              asChild 
              className="bg-white text-[#0a0c10] hover:bg-white/90 rounded-full py-6 px-8 text-base font-medium"
            >
              <a href="#services">
                {heroData?.ctaText || 'Découvrir nos services'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 rounded-full py-6 px-8 text-base font-medium"
            >
              <a href="#contact">
                {heroData?.ctaSecondaryText || 'Nous contacter'}
              </a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-10">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">95%</span>
              <span className="text-sm text-white/60">Satisfaction client</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">200+</span>
              <span className="text-sm text-white/60">Projets réalisés</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">15+</span>
              <span className="text-sm text-white/60">Années d'expérience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TekoServices: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Services sur mesure pour votre transformation digitale
          </h2>
          <p className="text-gray-600 md:text-lg">
            Des solutions complètes pour répondre à tous vos besoins numériques, conçues par nos experts pour maximiser votre impact
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-500 group-hover:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-[#0a0c10] group-hover:text-teal-500 transition-colors">
              Développement sur mesure
            </h3>
            
            <p className="text-gray-600 mb-6">
              Applications web et mobiles personnalisées selon vos besoins spécifiques et les dernières technologies.
            </p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>Design UI/UX intuitif</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>Solutions évolutives</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-teal-500" />
                <span>Support technique 24/7</span>
              </li>
            </ul>
            
            <a href="#contact" className="text-teal-500 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              En savoir plus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Service Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-500 group-hover:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-[#0a0c10] group-hover:text-indigo-500 transition-colors">
              Infrastructure cloud
            </h3>
            
            <p className="text-gray-600 mb-6">
              Solutions d'hébergement sécurisées, évolutives et performantes pour vos applications critiques.
            </p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                <span>Haute disponibilité</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                <span>Sécurité renforcée</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-indigo-500" />
                <span>Scalabilité automatique</span>
              </li>
            </ul>
            
            <a href="#contact" className="text-indigo-500 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              En savoir plus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Service Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500 group-hover:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-[#0a0c10] group-hover:text-amber-500 transition-colors">
              Intelligence artificielle
            </h3>
            
            <p className="text-gray-600 mb-6">
              Intégration de solutions d'IA et machine learning pour optimiser vos processus et analyses.
            </p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-amber-500" />
                <span>Analyse prédictive</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-amber-500" />
                <span>Automatisation intelligente</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-amber-500" />
                <span>Personnalisation avancée</span>
              </li>
            </ul>
            
            <a href="#contact" className="text-amber-500 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              En savoir plus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild
            className="bg-[#0a0c10] text-white hover:bg-[#0a0c10]/90 rounded-full py-6 px-8 text-base font-medium"
          >
            <a href="#contact">
              Discuter de votre projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

const TekoTrustedClients: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['trustedClientsData'],
    queryFn: async () => {
      const config = getHomepageConfig();
      
      if (config.sectionData && config.sectionData['trusted-clients']) {
        return config.sectionData['trusted-clients'] as any;
      }
      
      return {
        title: 'Ils nous font confiance',
        clients: []
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!data || data.clients.length === 0) {
    return null;
  }

  return (
    <section id="trusted-clients" className="py-20 bg-[#0a0c10] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{data.title}</h2>
          <div className="w-16 h-0.5 bg-teal-500 mx-auto"></div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
          {data.clients.map((client) => (
            <div key={client.id} className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity">
              {client.websiteUrl ? (
                <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="h-full w-auto brightness-0 invert hover:scale-105 transition-all duration-300" 
                    title={client.name}
                  />
                </a>
              ) : (
                <img 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="h-full w-auto brightness-0 invert hover:scale-105 transition-all duration-300" 
                  title={client.name}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TekoTestimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Ce que nos clients disent
          </h2>
          <p className="text-gray-600 md:text-lg">
            Découvrez les témoignages de clients qui ont transformé leur activité grâce à nos solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            
            <blockquote className="text-gray-600 mb-6">
              "Acenümerik a complètement transformé notre présence en ligne. Notre trafic web a augmenté de 150% en seulement 3 mois. L'équipe est à l'écoute et très compétente!"
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Sophie Leclerc"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-[#0a0c10]">Sophie Leclerc</h4>
                <p className="text-gray-500 text-sm">Directrice Marketing, TechGlobe</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            
            <blockquote className="text-gray-600 mb-6">
              "Le développement de notre application mobile par Acenümerik a dépassé toutes nos attentes. Les délais ont été respectés et le résultat est impeccable."
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Thomas Dubois"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-[#0a0c10]">Thomas Dubois</h4>
                <p className="text-gray-500 text-sm">CEO, InnovateCorp</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            
            <blockquote className="text-gray-600 mb-6">
              "Je recommande vivement Acenümerik pour leur expertise en matière d'infrastructure cloud. Ils ont su répondre parfaitement à nos besoins spécifiques."
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Marie Renaud"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-[#0a0c10]">Marie Renaud</h4>
                <p className="text-gray-500 text-sm">CTO, DataSmart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component principal du template Teko
const TekoHomeTemplate: React.FC = () => {
  return (
    <div className="teko-template flex flex-col min-h-screen">
      <TekoHero />
      <TekoServices />
      <TekoTrustedClients />
      <TekoTestimonials />
    </div>
  );
};

export default TekoHomeTemplate;
