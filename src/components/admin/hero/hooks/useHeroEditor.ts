
import { useState, useCallback } from 'react';
import { HeroSettings, HeroVersion } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Example initial data structure
const initialHeroSettings: HeroSettings = {
  activeVersion: '1',
  versions: [
    {
      id: '1',
      title: 'Hero Version 1',
      subtitle: 'Welcome to our platform',
      content: 'Discover our amazing services',
      ctaText: 'Get Started',
      ctaLink: '/services',
      image: '/images/hero-image.jpg',
      alignment: 'center',
    }
  ],
  carousel: {
    autoplay: false,
    interval: 5000,
    transition: 'slide',
    indicators: true,
    arrows: true,
  }
};

export const useHeroEditor = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(initialHeroSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Get the active version
  const getActiveVersion = useCallback(() => {
    return heroSettings.versions.find(v => v.id === heroSettings.activeVersion) || heroSettings.versions[0];
  }, [heroSettings]);

  // Update a specific version
  const updateVersion = useCallback((versionId: string, data: Partial<HeroVersion>) => {
    setHeroSettings(prev => ({
      ...prev,
      versions: prev.versions.map(version => 
        version.id === versionId ? { ...version, ...data } : version
      ),
    }));
  }, []);

  // Add a new version
  const addVersion = useCallback(() => {
    const newVersion: HeroVersion = {
      id: uuidv4(),
      title: 'New Hero Version',
      subtitle: 'Add your subtitle here',
      content: 'Add your content here',
      ctaText: 'Learn More',
      ctaLink: '/about',
      image: '',
      alignment: 'center',
    };

    setHeroSettings(prev => ({
      ...prev,
      versions: [...prev.versions, newVersion]
    }));
  }, []);

  // Delete a version
  const deleteVersion = useCallback((versionId: string) => {
    setHeroSettings(prev => {
      const updatedVersions = prev.versions.filter(version => version.id !== versionId);
      
      // If we're deleting the active version, set the first available version as active
      const newActiveVersion = 
        prev.activeVersion === versionId && updatedVersions.length > 0 
          ? updatedVersions[0].id 
          : prev.activeVersion;
      
      return {
        ...prev,
        versions: updatedVersions,
        activeVersion: newActiveVersion
      };
    });
  }, []);

  // Set active version
  const setActiveVersion = useCallback((versionId: string) => {
    setHeroSettings(prev => ({
      ...prev,
      activeVersion: versionId,
    }));
  }, []);

  // Update carousel settings
  const updateCarouselSettings = useCallback((settings: Partial<HeroSettings['carousel']>) => {
    setHeroSettings(prev => ({
      ...prev,
      carousel: {
        ...prev.carousel,
        ...settings
      },
    }));
  }, []);

  // Save all hero changes
  const saveHeroChanges = useCallback(async () => {
    try {
      setIsLoading(true);
      // Here you would typically make an API call to save the data
      console.log('Saving hero settings:', heroSettings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Error saving hero settings:', error);
      setIsLoading(false);
      throw error;
    }
  }, [heroSettings]);

  return {
    activeTab,
    setActiveTab,
    heroSettings,
    setHeroSettings,
    isLoading,
    isSaving,
    setIsSaving,
    getActiveVersion,
    updateVersion,
    addVersion,
    deleteVersion,
    updateCarouselSettings,
    setActiveVersion,
    saveHeroChanges
  };
};
