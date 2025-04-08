
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, ArrowRight, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { getHomepageConfig } from '@/services/sections';
import { HeroData } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as z from "zod";

// Form Schema for validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  company: z.string().optional(),
  subject: z.string().min(1, { message: "Veuillez sélectionner un sujet" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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

const TekoAbout: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0a0c10] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre vision</h2>
            <div className="w-16 h-0.5 bg-teal-500 mb-8"></div>
            
            <p className="text-white/70 mb-6">
              Fondée en 2010, notre agence digitale s'est rapidement imposée comme un acteur 
              incontournable dans le domaine des technologies numériques. Notre vision est 
              d'accompagner les entreprises dans leur transformation digitale en leur offrant 
              des solutions sur mesure, innovantes et performantes.
            </p>
            
            <p className="text-white/70 mb-8">
              Nous croyons fermement que la technologie doit être au service de l'humain et 
              des objectifs business. C'est pourquoi nous plaçons l'expérience utilisateur et 
              les résultats mesurables au cœur de notre démarche.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">12+</h3>
                <p className="text-white/60">Années d'expérience</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">350+</h3>
                <p className="text-white/60">Projets livrés</p>
              </div>
            </div>
            
            <Button 
              asChild
              className="bg-teal-500 text-white hover:bg-teal-600 rounded-full"
            >
              <a href="#contact">
                Discuter de votre projet
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Notre équipe en action" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TekoTeam: React.FC = () => {
  const team = [
    {
      name: "Sophie Martin",
      role: "CEO & Fondatrice",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Thomas Dubois",
      role: "Directeur Technique",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Marie Leclerc",
      role: "Directrice UX Design",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      name: "Jean Fontaine",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ];
  
  return (
    <section id="team" className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Notre équipe d'experts
          </h2>
          <p className="text-gray-600 md:text-lg">
            Des professionnels passionnés et spécialisés dans leur domaine pour faire de votre projet un succès
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group relative">
              <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
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
    <section id="trusted-clients" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-4 text-xs md:text-sm font-medium bg-rose-50 text-rose-500 px-3 py-1 rounded-full">
            <span className="bg-rose-500 w-2 h-2 rounded-full"></span>
            Featured Clients
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Brands we've worked with
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {data.clients.map((client) => (
            <div key={client.id} className="flex flex-col items-center">
              <div className="h-16 w-auto mb-4">
                {client.websiteUrl ? (
                  <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <img 
                      src={client.logoUrl} 
                      alt={client.name} 
                      className="h-full w-auto transition-all duration-300" 
                      title={client.name}
                    />
                  </a>
                ) : (
                  <img 
                    src={client.logoUrl} 
                    alt={client.name} 
                    className="h-full w-auto transition-all duration-300" 
                    title={client.name}
                  />
                )}
              </div>
              <p className="text-center text-gray-500">
                {client.name}
              </p>
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

const TekoFaq: React.FC = () => {
  const faqs = [
    {
      question: "Quels types de projets réalisez-vous ?",
      answer: "Nous réalisons divers projets numériques : sites web, applications mobiles, solutions e-commerce, intranets, systèmes de gestion, interfaces IoT, solutions cloud, etc."
    },
    {
      question: "Quelle est votre méthodologie de travail ?",
      answer: "Nous suivons une approche agile centrée sur l'utilisateur. Chaque projet commence par une phase de découverte, suivie par la conception, le développement itératif avec des retours réguliers du client, puis les tests et le déploiement."
    },
    {
      question: "Comment assurez-vous la sécurité des projets ?",
      answer: "La sécurité est notre priorité absolue. Nous appliquons les meilleures pratiques de l'industrie : audits réguliers, tests de pénétration, chiffrement des données, authentification forte et formation continue de nos équipes."
    },
    {
      question: "Proposez-vous un support après la mise en ligne ?",
      answer: "Absolument ! Nous proposons plusieurs formules de maintenance et support technique, du simple monitoring à la maintenance évolutive complète. Nos SLA garantissent des interventions rapides en cas de besoin."
    }
  ];
  
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0c10]">
            Questions fréquentes
          </h2>
          <p className="text-gray-600 md:text-lg">
            Tout ce que vous devez savoir sur nos services et notre façon de travailler
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-[#0a0c10]">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Vous avez d'autres questions? N'hésitez pas à nous contacter.
          </p>
          <Button 
            asChild
            className="bg-[#0a0c10] text-white hover:bg-[#0a0c10]/90 rounded-full"
          >
            <a href="#contact">
              Nous contacter
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

const TekoContact: React.FC = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    // Usually you would send the data to a server here
    alert("Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.");
    form.reset();
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: 'Email',
      value: 'contact@visiontech.fr',
      href: 'mailto:contact@visiontech.fr',
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      href: 'tel:+33123456789',
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: 'Adresse',
      value: '123 Avenue de l\'Innovation, 75001 Paris',
      href: 'https://maps.google.com',
    }
  ];

  return (
    <section id="contact" className="py-24 bg-[#0a0c10] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form Column */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contactez-nous</h2>
              <div className="w-16 h-0.5 bg-teal-500 mb-8"></div>
              <p className="text-white/70 mb-8">
                Prêt à transformer votre vision en réalité ? Remplissez le formulaire ci-dessous
                et notre équipe vous contactera dans les plus brefs délais.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Nom complet</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Votre nom"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="votre@email.com"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Entreprise (optionnel)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nom de votre entreprise"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Sujet</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-teal-500">
                                <SelectValue placeholder="Sélectionnez un sujet" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Projet web">Projet web</SelectItem>
                              <SelectItem value="Application mobile">Application mobile</SelectItem>
                              <SelectItem value="Cloud & Infrastructure">Cloud & Infrastructure</SelectItem>
                              <SelectItem value="Conseil">Conseil</SelectItem>
                              <SelectItem value="Autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Décrivez votre projet ou votre demande..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-500 min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-white text-[#0a0c10] hover:bg-white/90 rounded-full py-6">
                    Envoyer le message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info Column */}
            <div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 h-full border border-white/10">
                <h3 className="text-2xl font-medium mb-8">Informations de contact</h3>
                
                <div className="space-y-6 mb-10">
                  {contactInfo.map((info, index) => (
                    <a 
                      key={index}
                      href={info.href}
                      className="flex items-start hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="p-3 rounded-lg bg-white/10 mr-4">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white/60">{info.title}</h4>
                        <p className="font-medium mt-1">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4">Horaires d'ouverture</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/60">Lundi - Vendredi</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-white/60">Samedi</span>
                      <span className="font-medium">Fermé</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Dimanche</span>
                      <span className="font-medium">Fermé</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-lg font-medium mb-4">Suivez-nous</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                  </div>
                </div>
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
      <TekoAbout />
      <TekoTeam />
      <TekoTrustedClients />
      <TekoTestimonials />
      <TekoFaq />
      <TekoContact />
    </div>
  );
};

export default TekoHomeTemplate;

