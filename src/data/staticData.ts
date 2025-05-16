
export const homePageData = {
  sections: [
    {
      id: "hero",
      type: "hero",
      title: "Section Hero",
      visible: true,
      order: 1,
      data: {
        title: "Bienvenue sur notre site",
        subtitle: "Des solutions digitales pour votre entreprise",
        ctaText: "Nos services",
        ctaSecondaryText: "Contactez-nous",
        backgroundType: "color",
        backgroundColor: "#f8f9fa",
        textColor: "#333333"
      }
    },
    {
      id: "services",
      type: "services",
      title: "Nos Services",
      visible: true,
      order: 2,
      data: {
        services: [
          {
            id: "1",
            title: "Développement Web",
            description: "Création de sites web et applications sur-mesure",
            icon: "code"
          },
          {
            id: "2",
            title: "Design UX/UI",
            description: "Interfaces utilisateur intuitives et modernes",
            icon: "palette"
          },
          {
            id: "3",
            title: "Marketing Digital",
            description: "Stratégies pour augmenter votre visibilité en ligne",
            icon: "trending-up"
          }
        ]
      }
    },
    {
      id: "about",
      type: "about",
      title: "À Propos",
      visible: true,
      order: 3,
      data: {
        title: "Notre Histoire",
        description: "Nous sommes une équipe passionnée de développeurs et designers qui créent des solutions digitales innovantes depuis 2015.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2970&auto=format&fit=crop"
      }
    },
    {
      id: "team",
      type: "team",
      title: "Notre Équipe",
      visible: true,
      order: 4,
      data: {
        title: "Notre Équipe",
        subtitle: "Des experts passionnés à votre service",
        members: [
          {
            id: "1",
            name: "Jean Dupont",
            role: "CEO & Fondateur",
            bio: "Plus de 15 ans d'expérience dans le développement web",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            email: "jean@example.com"
          },
          {
            id: "2",
            name: "Marie Martin",
            role: "Directrice Design",
            bio: "Spécialiste UX/UI avec une passion pour l'accessibilité",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            email: "marie@example.com"
          },
          {
            id: "3",
            name: "Pierre Dubois",
            role: "Lead Developer",
            bio: "Expert en architecture logicielle et performance",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            email: "pierre@example.com"
          }
        ]
      }
    },
    {
      id: "testimonials",
      type: "testimonials",
      title: "Témoignages",
      visible: true,
      order: 5,
      data: {
        testimonials: [
          {
            id: "1",
            name: "Sophie Lambert",
            role: "Directrice Marketing",
            company: "Entreprise XYZ",
            content: "Une collaboration exceptionnelle qui a transformé notre présence en ligne.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/22.jpg"
          },
          {
            id: "2",
            name: "Thomas Bernard",
            role: "Fondateur",
            company: "Startup ABC",
            content: "Des résultats au-delà de nos attentes et dans les délais impartis.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/54.jpg"
          }
        ]
      }
    },
    {
      id: "faq",
      type: "faq",
      title: "FAQ",
      visible: true,
      order: 6,
      data: {
        faqs: [
          {
            id: "1",
            question: "Comment démarrer un projet avec vous ?",
            answer: "Contactez-nous via notre formulaire ou par email pour discuter de votre projet."
          },
          {
            id: "2",
            question: "Quels sont vos délais de livraison moyens ?",
            answer: "Cela dépend de la complexité du projet, mais généralement entre 4 et 12 semaines."
          },
          {
            id: "3",
            question: "Proposez-vous des services de maintenance ?",
            answer: "Oui, nous offrons des forfaits de maintenance adaptés à vos besoins."
          }
        ]
      }
    },
    {
      id: "contact",
      type: "contact",
      title: "Contact",
      visible: true,
      order: 7,
      data: {
        title: "Contactez-nous",
        subtitle: "Nous sommes à votre écoute pour tous vos projets",
        emailPlaceholder: "Votre email",
        namePlaceholder: "Votre nom",
        messagePlaceholder: "Votre message",
        submitText: "Envoyer"
      }
    }
  ],
  header: {
    logo: {
      src: "/logo.png",
      alt: "Logo",
      width: 150,
      height: 50
    },
    navLinks: [
      {
        id: "1",
        name: "Accueil",
        href: "/",
        is_visible: true
      },
      {
        id: "2",
        name: "Services",
        href: "#services",
        is_visible: true
      },
      {
        id: "3",
        name: "À Propos",
        href: "#about",
        is_visible: true
      },
      {
        id: "4",
        name: "L'équipe",
        href: "#team",
        is_visible: true
      },
      {
        id: "5",
        name: "Contact",
        href: "#contact",
        is_visible: true
      }
    ]
  }
};
