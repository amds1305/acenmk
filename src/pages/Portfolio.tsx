
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Plateforme e-commerce de luxe",
    client: "LuxuryBrands SA",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1491897554428-130a60dd4757?q=80&w=600&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "AWS"]
  },
  {
    id: 2,
    title: "Application mobile de fitness",
    client: "FitConnect",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "Redux", "UX/UI"]
  },
  {
    id: 3,
    title: "Plateforme SaaS pour la gestion RH",
    client: "TalentCore",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    tags: ["Vue.js", "Laravel", "PostgreSQL", "Docker"]
  },
  {
    id: 4,
    title: "Système de gestion hospitalière",
    client: "MediGroup",
    category: "Santé",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop",
    tags: ["Angular", "Java Spring", "MySQL", "Cybersécurité"]
  },
  {
    id: 5,
    title: "Plateforme éducative interactive",
    client: "EduTech",
    category: "Éducation",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
    tags: ["React", "Express", "MongoDB", "WebRTC"]
  },
  {
    id: 6,
    title: "Application IoT pour maison intelligente",
    client: "SmartHome Solutions",
    category: "IoT",
    image: "https://images.unsplash.com/photo-1558002038-bb0237f4e312?q=80&w=600&auto=format&fit=crop",
    tags: ["React", "Node.js", "MQTT", "AWS IoT"]
  }
];

const categories = [
  "Tous",
  "E-commerce",
  "Mobile",
  "SaaS",
  "Santé",
  "Éducation",
  "IoT"
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  
  const filteredProjects = activeCategory === "Tous" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nos Réalisations</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez nos projets les plus innovants et comment nous aidons nos clients à transformer leur vision en réalité
            </p>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-[#ca3c66] text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <span className="text-white text-sm font-medium">{project.client}</span>
                      <h3 className="text-xl font-semibold text-white mt-1">{project.title}</h3>
                      <a 
                        href={`/portfolio/${project.id}`}
                        className="inline-flex items-center text-white font-medium mt-4 hover:text-[#ca3c66] transition-colors"
                      >
                        Voir le projet
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#ca3c66] transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-[#ca3c66]/10 text-[#ca3c66] text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="mt-16 text-center p-8 rounded-xl bg-[#ca3c66]/5 dark:bg-[#ca3c66]/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Notre équipe d'experts est prête à transformer votre vision en réalité numérique. Prenons rendez-vous pour en discuter.
            </p>
            <a 
              href="/#contact" 
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#ca3c66] text-white font-medium transition-colors hover:bg-[#ca3c66]/90"
            >
              Parlons de votre projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
