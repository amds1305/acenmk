
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobs, Job } from '@/services/supabase/jobsService';
import { ChevronRight } from 'lucide-react';

const Careers = () => {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    staleTime: 0,
    refetchOnMount: true,
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    console.error("Erreur lors du chargement des offres d'emploi:", error);
    return (
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Offres d'emploi</h1>
        <div className="text-red-500">Une erreur est survenue lors du chargement des offres d'emploi.</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Offres d'emploi</h1>
      
      {(!jobs || jobs.length === 0) ? (
        <div className="text-gray-500 text-center py-12">
          Aucune offre d'emploi disponible actuellement. Revenez bientôt !
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                  {job.department}
                </span>
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                  {job.location}
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{job.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Responsabilités:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Prérequis:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm text-gray-500">
                  Publié le: {new Date(job.posted_date).toLocaleDateString()}
                </span>
                <a 
                  href={`/careers/${job.id}`}
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Postuler
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Careers;
