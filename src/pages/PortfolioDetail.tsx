
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, ChevronLeft, ExternalLink, Check } from 'lucide-react';

// Simulated project data
const project = {
  id: 1,
  title: "Plateforme e-commerce de luxe",
  client: "LuxuryBrands SA",
  duration: "6 mois",
  year: "2022",
  category: "E-commerce",
  description: "Développement d'une plateforme e-commerce haut de gamme pour une marque de luxe, incluant un système de personnalisation de produits en 3D et une expérience d'achat immersive.",
  challenge: "LuxuryBrands SA souhaitait créer une expérience d'achat en ligne qui reflète le caractère exclusif et prestigieux de leurs produits. Le défi consistait à concevoir une plateforme offrant la même sensation d'exclusivité et d'attention personnalisée que leurs boutiques physiques, tout en intégrant des fonctionnalités innovantes comme la personnalisation 3D.",
  solution: "Nous avons développé une plateforme e-commerce sur mesure avec un design élégant et minimaliste. Le site intègre un configurateur 3D permettant aux clients de personnaliser leurs produits en temps réel. Nous avons également implémenté un système de recommandation basé sur l'IA pour proposer des produits pertinents à chaque utilisateur, ainsi qu'un service de conciergerie virtuelle pour une assistance personnalisée.",
  results: [
    "Augmentation de 35% du taux de conversion",
    "Panier moyen 28% plus élevé que sur l'ancien site",
    "Réduction de 40% du taux de rebond",
    "Augmentation de 62% du temps passé sur le site"
  ],
  technologies: ["React", "Node.js", "MongoDB", "Three.js", "AWS", "Redis", "Elasticsearch"],
  services: ["Développement web", "UX/UI Design", "Développement 3D", "Infrastructure cloud", "SEO"],
  images: [
    "https://images.unsplash.com/photo-1491897554428-130a60dd4757?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580402427914-a6cc60d7d44f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576502200916-3808e07386a5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop"
  ],
  testimonial: {
    content: "L'équipe d'Acenümerik a parfaitement compris notre vision et l'a transformée en une expérience e-commerce exceptionnelle. La plateforme reflète parfaitement l'élégance de notre marque tout en offrant une expérience utilisateur innovante.",
    author: "Sophie Laurent",
    position: "Directrice Marketing, LuxuryBrands SA"
  }
};

// Simulated related projects
const relatedProjects = [
  {
    id: 3,
    title: "Plateforme SaaS pour la gestion RH",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Plateforme éducative interactive",
    category: "Éducation",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
  }
];

const PortfolioDetail = () => {
  const { id } = useParams();
  
  // In a real application, you would fetch the specific project based on the ID
  // For this demo, we'll just use the simulated data
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        {/* Hero section */}
        <div className="relative h-96 mb-16">
          <div className="absolute inset-0">
            <img 
              src={project.images[0]} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
            <div className="flex items-center space-x-3 mb-4">
              <a 
                href="/portfolio" 
                className="text-white hover:text-[#ca3c66] transition-colors flex items-center"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Retour au portfolio
              </a>
              <span className="text-white/60">|</span>
              <span className="text-white/80">{project.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Project details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Le défi</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                {project.challenge}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notre solution</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                {project.solution}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Résultats</h2>
              <ul className="space-y-3 mb-8">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 p-1 rounded-full bg-[#ca3c66]/10 mr-3 mt-1">
                      <Check className="h-4 w-4 text-[#ca3c66]" />
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                  Informations projet
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                    <p className="font-medium text-gray-900 dark:text-white">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Année</p>
                    <p className="font-medium text-gray-900 dark:text-white">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Durée</p>
                    <p className="font-medium text-gray-900 dark:text-white">{project.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Catégorie</p>
                    <p className="font-medium text-gray-900 dark:text-white">{project.category}</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 mt-8">
                  Technologies
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                  Services
                </h3>
                
                <ul className="space-y-2">
                  {project.services.map((service, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-[#ca3c66] mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <a 
                    href="/#contact" 
                    className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full bg-[#ca3c66] text-white font-medium transition-colors hover:bg-[#ca3c66]/90"
                  >
                    Discuter d'un projet similaire
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gallery */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Galerie du projet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.images.slice(1).map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-sm">
                  <img 
                    src={image} 
                    alt={`Vue du projet ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Testimonial */}
          {project.testimonial && (
            <div className="bg-[#ca3c66]/5 dark:bg-[#ca3c66]/10 rounded-xl p-8 mb-16">
              <blockquote className="text-xl italic text-gray-700 dark:text-gray-200 mb-6">
                "{project.testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {project.testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {project.testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Related Projects */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Projets similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((relatedProject) => (
                <a 
                  key={relatedProject.id}
                  href={`/portfolio/${relatedProject.id}`}
                  className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={relatedProject.image} 
                      alt={relatedProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="flex items-center text-white">
                        <span>Voir le projet</span>
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#ca3c66] transition-colors">
                        {relatedProject.title}
                      </h3>
                      <span className="px-3 py-1 bg-[#ca3c66]/10 text-[#ca3c66] text-xs font-medium rounded-full">
                        {relatedProject.category}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioDetail;
