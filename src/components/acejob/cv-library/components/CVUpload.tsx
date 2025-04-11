
import React, { useState } from 'react';
import { Upload, X, Check, FileText } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CVUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVUpload = ({ isOpen, onClose }: CVUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/msword' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    
    if (newFiles.length !== fileList.length) {
      toast({
        title: "Format non supporté",
        description: "Seuls les formats PDF et Word sont acceptés",
        variant: "destructive"
      });
    }
    
    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    // Simuler un délai d'upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "CV importés avec succès",
      description: `${files.length} CV ont été ajoutés à votre CVthèque.`
    });
    
    setFiles([]);
    setUploading(false);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Importer des CV</DialogTitle>
          <DialogDescription>
            Téléchargez des CV au format PDF ou Word pour les ajouter à votre CVthèque
          </DialogDescription>
        </DialogHeader>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium mb-2">
            Glissez et déposez vos fichiers ici
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Ou cliquez pour sélectionner des fichiers
          </p>
          <Button variant="outline" asChild>
            <label className="cursor-pointer">
              Parcourir les fichiers
              <input
                type="file" 
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </Button>
        </div>
        
        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Fichiers sélectionnés ({files.length})</h4>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center bg-muted p-2 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={uploading}>
            Annuler
          </Button>
          <Button onClick={uploadFiles} disabled={files.length === 0 || uploading}>
            {uploading ? (
              <>Traitement en cours...</>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Importer {files.length > 0 ? `(${files.length})` : ''}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CVUpload;
