
import React, { useState } from 'react';
import { Upload, FileText, FileUp, Sparkles, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface CVUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVUpload = ({ isOpen, onClose }: CVUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const simulateProcessing = () => {
    setProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          toast({
            title: "CV importés avec succès",
            description: `${files.length} CV ont été analysés et ajoutés à votre CVthèque.`,
          });
          onClose();
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Importer des CV</DialogTitle>
          <DialogDescription>
            Importez un ou plusieurs CV. Nous les analyserons automatiquement pour extraire les informations clés.
          </DialogDescription>
        </DialogHeader>

        {!processing ? (
          <>
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
              <div className="flex justify-center">
                <FileUp className="h-10 w-10 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Glissez-déposez des fichiers ici ou cliquez pour parcourir</p>
                <p className="text-sm text-gray-500 mt-1">Formats acceptés : PDF, DOCX, ODT, RTF (max 10Mo)</p>
              </div>
              <div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.docx,.doc,.odt,.rtf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="mt-2" as="span">Parcourir</Button>
                </label>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2 mt-4">
                <p className="font-medium text-sm">{files.length} fichier(s) sélectionné(s)</p>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-6 space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="h-12 w-12 text-primary animate-pulse" />
              <div className="text-center">
                <h3 className="font-medium">Analyse des CV en cours...</h3>
                <p className="text-sm text-gray-500 mt-1">Nous extrayons les informations pertinentes</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </div>
        )}

        <DialogFooter>
          {!processing ? (
            <>
              <Button variant="outline" onClick={onClose}>Annuler</Button>
              <Button 
                disabled={files.length === 0} 
                onClick={simulateProcessing}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Importer et analyser
              </Button>
            </>
          ) : (
            <Button variant="outline" disabled>
              Traitement en cours...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVUpload;
