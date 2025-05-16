
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CV } from './types';
import { getCVs } from '@/services/supabase/cvsService';

const CVLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const { data: cvs, isLoading, error } = useQuery({
    queryKey: ['cvs'],
    queryFn: getCVs,
    staleTime: 0,
    refetchOnMount: true,
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Erreur lors du chargement des CVs:", error);
    return (
      <div className="p-8">
        <div className="text-red-500 text-center">
          Une erreur est survenue lors du chargement des CVs.
        </div>
      </div>
    );
  }

  // Filtrer les CVs en fonction de la recherche et des filtres
  const filteredCVs = cvs ? cvs.filter((cv: CV) => {
    const matchesSearch = searchTerm === '' || 
      cv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === null || 
      (cv.tags && cv.tags.includes(selectedFilter));
    
    return matchesSearch && matchesFilter;
  }) : [];

  // Extraire tous les tags uniques pour les filtres
  const allTags = cvs ? [...new Set(cvs.flatMap((cv: CV) => cv.tags || []))] : [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Bibliothèque de CVs</h1>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Rechercher par nom, titre ou compétence..."
          className="border p-2 rounded flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="border p-2 rounded"
          value={selectedFilter || ''}
          onChange={(e) => setSelectedFilter(e.target.value || null)}
        >
          <option value="">Tous les filtres</option>
          {allTags.map((tag: string, index) => (
            <option key={index} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      
      {filteredCVs.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Aucun CV ne correspond à votre recherche.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCVs.map((cv: CV) => (
            <div key={cv.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-4 bg-gray-50">
                <h2 className="text-lg font-semibold">{cv.candidateName}</h2>
                <p className="text-sm text-gray-600">{cv.title}</p>
              </div>
              
              <div className="p-4">
                <div className="mb-3">
                  <p className="text-sm">
                    <span className="font-semibold">Email:</span> {cv.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Téléphone:</span> {cv.phone}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Expérience:</span> {cv.experience} ans
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Formation:</span> {cv.education}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-1">Compétences:</h3>
                  <div className="flex flex-wrap gap-1">
                    {cv.skills.map((skill, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {cv.tags && cv.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {cv.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Ajouté le: {new Date(cv.uploadDate).toLocaleDateString()}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-4 w-4 ${i < cv.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CVLibrary;
