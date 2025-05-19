
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Les tendances web incontournables en 2023",
    excerpt: "Découvrez les nouvelles technologies et tendances qui façonnent le paysage numérique cette année.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=400&auto=format&fit=crop",
    date: "12 Juin 2023",
    category: "Tendances",
    author: "Marie Dubois"
  },
  {
    id: 2,
    title: "Comment l'IA révolutionne le développement logiciel",
    excerpt: "L'intelligence artificielle transforme la façon dont nous concevons et développons des applications. Voici comment.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400&auto=format&fit=crop",
    date: "28 Mai 2023",
    category: "Intelligence Artificielle",
    author: "Thomas Martin"
  },
  {
    id: 3,
    title: "UX/UI : créer des interfaces qui convertissent",
    excerpt: "Les principes fondamentaux pour concevoir des interfaces utilisateur qui améliorent les taux de conversion.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    date: "15 Mai 2023",
    category: "Design",
    author: "Sophie Leroy"
  },
  {
    id: 4,
    title: "Sécurité web : protégez votre entreprise en ligne",
    excerpt: "Les mesures essentielles pour sécuriser vos applications web contre les cybermenaces actuelles.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop",
    date: "2 Mai 2023",
    category: "Sécurité",
    author: "David Bernard"
  },
  {
    id: 5,
    title: "Optimiser les performances de votre site web",
    excerpt: "Techniques avancées pour améliorer la vitesse et les performances de vos applications web.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    date: "18 Avril 2023",
    category: "Performance",
    author: "Marie Dubois"
  },
  {
    id: 6,
    title: "L'essor des applications mobiles progressives (PWA)",
    excerpt: "Comment les PWA transforment l'expérience mobile et offrent de nouvelles opportunités aux entreprises.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400&auto=format&fit=crop",
    date: "5 Avril 2023",
    category: "Mobile",
    author: "Thomas Martin"
  }
];

const categories = [
  "Toutes",
  "Tendances",
  "Intelligence Artificielle",
  "Design",
  "Sécurité",
  "Performance",
  "Mobile"
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = React.useState("Toutes");
  
  const filteredPosts = activeCategory === "Toutes" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Notre Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Actualités, conseils et insights sur le numérique et l'innovation
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
          
          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#ca3c66]/90 text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <a 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-[#ca3c66] font-medium hover:text-[#ca3c66]/80 transition-colors"
                  >
                    Lire l'article
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-l-md border border-gray-300 dark:border-gray-700">
                Précédent
              </button>
              <button className="px-4 py-2 bg-[#ca3c66] text-white border border-[#ca3c66]">
                1
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
                2
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-r-md border border-gray-300 dark:border-gray-700">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
