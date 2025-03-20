
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Tag, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

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

// Extraction de toutes les technologies uniques
const getAllTechnologies = () => {
  const allTags = projects.flatMap(project => project.tags);
  return [...new Set(allTags)].sort();
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [mobileFilterVisible, setMobileFilterVisible] = useState(false);
  
  useEffect(() => {
    // Mettre à jour la liste des tags disponibles
    setAvailableTags(getAllTechnologies());
    
    // Appliquer les filtres
    applyFilters();
  }, [activeCategory, selectedTags]);
  
  const applyFilters = () => {
    let filtered = projects;
    
    // Filtrer par catégorie
    if (activeCategory !== "Tous") {
      filtered = filtered.filter(project => project.category === activeCategory);
    }
    
    // Filtrer par tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project => 
        selectedTags.every(tag => project.tags.includes(tag))
      );
    }
    
    setFilteredProjects(filtered);
  };
  
  const handleTagAdd = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  const clearAllFilters = () => {
    setActiveCategory("Tous");
    setSelectedTags([]);
  };
  
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
          
          {/* Filtres Desktop */}
          <div className="hidden md:block mb-12">
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  {/* Filtres par catégorie */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filtrer par type de projet</h3>
                    <Tabs defaultValue="Tous" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                      <TabsList className="grid grid-cols-4 lg:grid-cols-7 h-auto bg-gray-100 dark:bg-gray-700 p-1">
                        {categories.map((category) => (
                          <TabsTrigger 
                            key={category} 
                            value={category}
                            className="data-[state=active]:bg-[#ca3c66] data-[state=active]:text-white"
                          >
                            {category}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  {/* Filtres par technologie */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filtrer par technologie</h3>
                    <div className="flex items-center gap-3">
                      <Select onValueChange={handleTagAdd}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Ajouter une technologie" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTags
                            .filter(tag => !selectedTags.includes(tag))
                            .map(tag => (
                              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      
                      {selectedTags.length > 0 && (
                        <button 
                          onClick={clearAllFilters} 
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#ca3c66] dark:hover:text-[#ca3c66]"
                        >
                          Effacer tous les filtres
                        </button>
                      )}
                    </div>
                    
                    {/* Tags sélectionnés */}
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedTags.map(tag => (
                          <Badge 
                            key={tag} 
                            className="px-3 py-1 bg-[#ca3c66]/10 text-[#ca3c66] hover:bg-[#ca3c66]/20 cursor-pointer"
                            onClick={() => handleTagRemove(tag)}
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                            <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Filtres Mobile */}
          <div className="md:hidden mb-8">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => setMobileFilterVisible(!mobileFilterVisible)}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-2"
              >
                <Tag className="w-4 h-4" />
                Filtres
                <Badge className="ml-1 bg-[#ca3c66] text-white">{(activeCategory !== "Tous" ? 1 : 0) + selectedTags.length}</Badge>
              </button>
              
              {((activeCategory !== "Tous") || selectedTags.length > 0) && (
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Effacer
                </button>
              )}
            </div>
            
            {mobileFilterVisible && (
              <Card className="bg-white dark:bg-gray-800 shadow-sm mb-6 animate-fade-in">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    {/* Catégories */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type de projet</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                              activeCategory === category
                                ? "bg-[#ca3c66] text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Technologies */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</h3>
                      <Select onValueChange={handleTagAdd}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une technologie" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTags
                            .filter(tag => !selectedTags.includes(tag))
                            .map(tag => (
                              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      
                      {/* Tags sélectionnés */}
                      {selectedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {selectedTags.map(tag => (
                            <Badge 
                              key={tag} 
                              className="px-3 py-1 bg-[#ca3c66]/10 text-[#ca3c66] hover:bg-[#ca3c66]/20 cursor-pointer"
                              onClick={() => handleTagRemove(tag)}
                            >
                              {tag}
                              <X className="w-3 h-3 ml-1" />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Résultats */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''} trouvé{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
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
                        <Badge 
                          key={index}
                          variant="outline"
                          className={`px-2 py-1 text-xs ${
                            selectedTags.includes(tag) 
                              ? "bg-[#ca3c66]/10 text-[#ca3c66] border-[#ca3c66]/20" 
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          } cursor-pointer`}
                          onClick={() => selectedTags.includes(tag) ? handleTagRemove(tag) : handleTagAdd(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">Aucun projet ne correspond à vos critères de recherche.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 bg-[#ca3c66] text-white rounded-md hover:bg-[#ca3c66]/90 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
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
