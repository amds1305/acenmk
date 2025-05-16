
// Static implementation of testimonials service

// Mock testimonials data
const testimonialsData = [
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

export const getTestimonials = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    return testimonialsData;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const getFeaturedTestimonials = async (limit = 3) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 150));
    return testimonialsData.slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured testimonials:', error);
    return [];
  }
};

export const getTestimonialById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    return testimonialsData.find(testimonial => testimonial.id === id);
  } catch (error) {
    console.error('Error fetching testimonial by ID:', error);
    return null;
  }
};
