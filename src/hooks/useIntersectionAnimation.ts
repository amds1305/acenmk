
import { useEffect } from 'react';

export const useIntersectionAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up, .animate-slide-in-right, .animate-blur-in');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);
};

export default useIntersectionAnimation;
