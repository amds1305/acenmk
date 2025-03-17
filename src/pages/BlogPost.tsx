import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User, Clock, Tag, ChevronLeft, Share2 } from 'lucide-react';

// Simulated blog post data
const blogPost = {
  id: 1,
  title: "Les tendances web incontournables en 2023",
  content: `
    <p>Le monde du développement web évolue constamment, avec de nouvelles technologies et pratiques qui émergent chaque année. En 2023, plusieurs tendances majeures façonnent la manière dont les sites web et les applications sont conçus, développés et expérimentés par les utilisateurs.</p>
    
    <h2>1. L'IA et le Machine Learning dans le développement web</h2>
    
    <p>L'intelligence artificielle et le machine learning transforment radicalement le paysage du développement web. Des outils de conception assistée par IA aux chatbots intelligents, ces technologies permettent d'améliorer l'expérience utilisateur et d'optimiser les processus de développement.</p>
    
    <p>Les développeurs utilisent désormais l'IA pour :</p>
    <ul>
      <li>Générer automatiquement du code</li>
      <li>Créer des interfaces personnalisées basées sur le comportement des utilisateurs</li>
      <li>Optimiser les performances des sites web</li>
      <li>Analyser et prédire les tendances utilisateur</li>
    </ul>
    
    <h2>2. Le WebAssembly (Wasm) gagne du terrain</h2>
    
    <p>WebAssembly continue de s'imposer comme une technologie cruciale pour les applications web hautes performances. En permettant d'exécuter du code à des vitesses proches du natif dans le navigateur, Wasm ouvre la voie à des applications web toujours plus puissantes et réactives.</p>
    
    <h2>3. La montée en puissance des PWA (Progressive Web Apps)</h2>
    
    <p>Les applications web progressives combinent le meilleur des sites web et des applications mobiles. En 2023, nous constatons une adoption croissante des PWA pour leur capacité à fonctionner hors ligne, leur rapidité et leur expérience utilisateur optimisée sur mobile.</p>
    
    <h2>4. Le design minimaliste et l'esthétique "neumorphique"</h2>
    
    <p>Le design d'interface évolue vers des approches plus minimalistes, avec une attention particulière portée à l'accessibilité et à l'expérience utilisateur. Le neumorphisme, qui combine réalisme et minimalisme pour créer des interfaces tridimensionnelles douces, s'impose comme une tendance majeure.</p>
    
    <h2>5. L'importance croissante de la cybersécurité</h2>
    
    <p>Avec l'augmentation des cyberattaques, la sécurité devient une préoccupation centrale dans le développement web. Les meilleures pratiques en matière de sécurité sont désormais intégrées dès les premières étapes de la conception.</p>
    
    <h2>Conclusion</h2>
    
    <p>Le paysage du développement web continue d'évoluer rapidement, offrant de nouvelles opportunités pour créer des expériences web plus performantes, accessibles et sécurisées. Les entreprises qui adoptent ces tendances peuvent se démarquer en offrant des expériences numériques innovantes et adaptées aux attentes des utilisateurs modernes.</p>
  `,
  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
  date: "12 Juin 2023",
  readTime: "8 min",
  category: "Tendances",
  author: {
    name: "Marie Dubois",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    role: "Directrice Technique"
  },
  tags: ["Développement Web", "Tendances", "IA", "PWA", "Sécurité"]
};

// Simulated related posts
const relatedPosts = [
  {
    id: 2,
    title: "Comment l'IA révolutionne le développement logiciel",
    excerpt: "L'intelligence artificielle transforme la façon dont nous concevons et développons des applications.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400&auto=format&fit=crop",
    date: "28 Mai 2023"
  },
  {
    id: 3,
    title: "UX/UI : créer des interfaces qui convertissent",
    excerpt: "Les principes fondamentaux pour concevoir des interfaces utilisateur qui améliorent les taux de conversion.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    date: "15 Mai 2023"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  
  // In a real application, you would fetch the specific blog post based on the ID
  // For this demo, we'll just use the simulated data
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <a 
            href="/blog" 
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-[#ca3c66] dark:hover:text-[#ca3c66] mb-8"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </a>
          
          {/* Article header */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-[#ca3c66]/10 text-[#ca3c66] text-sm font-medium rounded-full mb-4">
              {blogPost.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {blogPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 gap-y-2">
              <div className="flex items-center mr-6">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center mr-6">
                <User className="h-4 w-4 mr-2" />
                <span>{blogPost.author.name}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{blogPost.readTime} de lecture</span>
              </div>
            </div>
          </div>
          
          {/* Featured image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img 
              src={blogPost.image} 
              alt={blogPost.title}
              className="w-full h-auto"
            />
          </div>
          
          {/* Article content */}
          <div 
            className="prose prose-lg max-w-none dark:prose-invert mb-12"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
          
          {/* Tags and share */}
          <div className="flex flex-wrap items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-700 mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-0">
              <Tag className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              {blogPost.tags.map((tag, index) => (
                <a 
                  key={index} 
                  href={`/blog?tag=${tag}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
            
            <div className="flex items-center">
              <span className="mr-3 text-gray-600 dark:text-gray-300">Partager :</span>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-[#ca3c66]/10 transition-colors">
                  <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
                {/* Other social share buttons would go here */}
              </div>
            </div>
          </div>
          
          {/* Author bio */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex items-start mb-12 shadow-sm">
            <img 
              src={blogPost.author.avatar} 
              alt={blogPost.author.name}
              className="w-16 h-16 rounded-full mr-6"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {blogPost.author.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {blogPost.author.role}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Expert en développement web et nouvelles technologies avec plus de 10 ans d'expérience dans le secteur numérique.
              </p>
            </div>
          </div>
          
          {/* Related posts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <a 
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#ca3c66] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {post.excerpt}
                    </p>
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

export default BlogPost;
