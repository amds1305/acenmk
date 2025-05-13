
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Import du CSS de Quill
import 'react-quill/dist/quill.snow.css';

// Chargement paresseux de ReactQuill pour éviter les problèmes de SSR
const ReactQuill = lazy(() => import('react-quill'));

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ value, onChange }) => {
  // État local pour gérer le chargement de l'éditeur
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link'
  ];

  // Placeholder à afficher pendant le chargement
  const LoadingPlaceholder = () => (
    <div className="min-h-[300px] border rounded-md p-4 bg-gray-50">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Si le composant n'est pas monté, afficher un placeholder
  if (!mounted) {
    return <LoadingPlaceholder />;
  }

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="min-h-[300px]"
      />
    </Suspense>
  );
};
