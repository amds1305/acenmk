
// Static data for various components

// Homepage config data
export const getHomepageConfig = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    sections: [
      {
        id: 'hero',
        type: 'hero',
        title: 'Hero',
        visible: true,
        order: 1
      },
      {
        id: 'services',
        type: 'services',
        title: 'Services',
        visible: true,
        order: 2
      },
      {
        id: 'about',
        type: 'about',
        title: 'About',
        visible: true,
        order: 3
      },
      {
        id: 'trusted-clients',
        type: 'trusted-clients',
        title: 'Trusted Clients',
        visible: true,
        order: 4
      }
    ],
    sectionData: {
      'hero': {
        title: 'Des solutions numériques innovantes',
        subtitle: 'Nous créons des expériences web exceptionnelles pour votre entreprise',
        ctaText: 'Découvrir nos services',
        ctaUrl: '#services',
        ctaSecondaryText: 'Nous contacter',
        ctaSecondaryUrl: '#contact'
      },
      'trusted-clients': {
        title: 'Ils nous font confiance',
        featuredLabel: 'Nos clients',
        clients: [
          { id: '1', name: 'Microsoft', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png', websiteUrl: 'https://microsoft.com' },
          { id: '2', name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png', websiteUrl: 'https://google.com' },
          { id: '3', name: 'Apple', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png', websiteUrl: 'https://apple.com' }
        ]
      },
      'services': {
        title: 'Nos services',
        description: 'Des solutions adaptées à vos besoins',
        services: [
          {
            id: '1',
            title: 'Développement Web',
            description: 'Sites web responsifs et applications web progressives',
            icon: 'Code'
          },
          {
            id: '2',
            title: 'UX/UI Design',
            description: 'Interfaces utilisateur intuitives et esthétiques',
            icon: 'Brush'
          },
          {
            id: '3',
            title: 'Référencement SEO',
            description: 'Optimisation pour les moteurs de recherche',
            icon: 'Search'
          }
        ]
      }
    }
  };
};

// Team data
export const getTeamMembers = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: '1',
      name: 'Jean Dupont',
      role: 'CEO',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Expert en stratégie digitale avec plus de 15 ans d\'expérience.',
      socialLinks: [
        { platform: 'linkedin', url: '#' },
        { platform: 'twitter', url: '#' }
      ]
    },
    {
      id: '2',
      name: 'Marie Martin',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Ingénieure en informatique spécialisée en développement web.',
      socialLinks: [
        { platform: 'linkedin', url: '#' },
        { platform: 'github', url: '#' }
      ]
    },
    {
      id: '3',
      name: 'Pierre Durand',
      role: 'Designer UI/UX',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      bio: 'Créatif passionné par l\'expérience utilisateur et l\'interface.',
      socialLinks: [
        { platform: 'linkedin', url: '#' },
        { platform: 'dribbble', url: '#' }
      ]
    }
  ];
};

// FAQ data
export const getFaqItems = async () => {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return [
    {
      id: '1',
      question: 'Comment démarrer un projet avec votre entreprise?',
      answer: 'Pour démarrer un projet, veuillez nous contacter via le formulaire de contact ou par téléphone. Nous organiserons ensuite une réunion initiale pour discuter de vos besoins et objectifs.'
    },
    {
      id: '2',
      question: 'Quels sont vos délais moyens pour un projet de site web?',
      answer: 'Nos délais varient en fonction de la complexité du projet. Un site vitrine simple peut être réalisé en 2-4 semaines, tandis qu\'une application web complète peut prendre 2-3 mois.'
    },
    {
      id: '3',
      question: 'Proposez-vous des services de maintenance après la livraison?',
      answer: 'Oui, nous offrons différentes formules de maintenance et de support technique après la livraison de votre projet pour garantir son bon fonctionnement à long terme.'
    }
  ];
};

// Testimonials data
export const getTestimonials = async () => {
  await new Promise(resolve => setTimeout(resolve, 250));
  
  return [
    {
      id: '1',
      name: 'Sophie Leroux',
      company: 'Entreprise ABC',
      text: 'Une équipe professionnelle et réactive qui a su comprendre nos besoins et y répondre parfaitement.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: '2',
      name: 'Thomas Bernard',
      company: 'Startup XYZ',
      text: 'Excellent travail sur notre application mobile. Les délais ont été respectés et la qualité est au rendez-vous.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: '3',
      name: 'Claire Dubois',
      company: 'Boutique Mode',
      text: 'Notre site e-commerce fonctionne parfaitement et les ventes ont augmenté depuis sa mise en ligne.',
      rating: 4,
      image: 'https://randomuser.me/api/portraits/women/43.jpg'
    }
  ];
};
