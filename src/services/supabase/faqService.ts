
// Static implementation of FAQ service

// Faq type
export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order_index?: number;
}

// Mock FAQ data
const faqData: Faq[] = [
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

export const getFAQs = async (template = 'default'): Promise<Faq[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    return faqData;
  } catch (error) {
    console.error('Error fetching FAQ items:', error);
    return [];
  }
};

export const getFeaturedFaqs = async (limit = 3): Promise<Faq[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 100));
    return faqData.slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured FAQs:', error);
    return [];
  }
};

export const getFaqById = async (id: string): Promise<Faq | null> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    return faqData.find(faq => faq.id === id) || null;
  } catch (error) {
    console.error('Error fetching FAQ by ID:', error);
    return null;
  }
};
