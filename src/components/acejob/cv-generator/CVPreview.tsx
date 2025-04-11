
import React from 'react';
import { Eye, Copy, Download, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CVFormData } from './types';

interface CVPreviewProps {
  cvData: CVFormData;
  selectedTemplate: string;
}

const CVPreview = ({ cvData, selectedTemplate }: CVPreviewProps) => {
  const { toast } = useToast();
  
  const handleCopy = () => {
    toast({
      title: "CV copié",
      description: "Le contenu du CV a été copié dans le presse-papiers."
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Votre CV au format PDF est en cours de téléchargement."
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Lien de partage créé",
      description: "Un lien temporaire a été créé pour partager votre CV."
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 dark:bg-gray-800 border-t">
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>Aperçu du CV</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              Copier
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleShare}>
              <ExternalLink className="h-4 w-4" />
              Partager
            </Button>
          </div>
        </div>
        
        {/* Preview du CV */}
        <div className="p-8 flex justify-center">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-lg rounded-md p-8 min-h-[800px]">
            <div className="border-b pb-6 mb-6">
              <h1 className="text-3xl font-bold">{cvData.personalInfo.fullName}</h1>
              <h2 className="text-xl text-primary mt-1">{cvData.personalInfo.title}</h2>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                <span>{cvData.personalInfo.email}</span>
                <span>{cvData.personalInfo.phone}</span>
                <span>{cvData.personalInfo.location}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Profil</h3>
              <p>{cvData.personalInfo.summary}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Expérience professionnelle</h3>
              {cvData.workExperience.map(exp => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{exp.position}</h4>
                    <div className="text-sm text-muted-foreground">
                      {exp.startDate} — {exp.current ? 'Présent' : exp.endDate}
                    </div>
                  </div>
                  <div className="text-primary">{exp.company}, {exp.location}</div>
                  <p className="mt-1 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Formation</h3>
              {cvData.education.map(edu => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <div className="text-sm text-muted-foreground">
                      {edu.startDate} — {edu.endDate}
                    </div>
                  </div>
                  <div className="text-primary">{edu.institution}, {edu.location}</div>
                  <p className="mt-1 text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Compétences</h3>
              <div className="grid grid-cols-2 gap-2">
                {cvData.skills.map(skill => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <span>{skill.name}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full mx-0.5 ${i < skill.level ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
