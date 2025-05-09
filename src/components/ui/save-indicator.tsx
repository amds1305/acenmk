
import React from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SaveIndicatorProps {
  status: 'idle' | 'saving' | 'success' | 'error';
  className?: string;
  showText?: boolean;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ 
  status, 
  className,
  showText = true
}) => {
  if (status === 'idle') {
    return null; // Ne rien afficher en état d'inactivité
  }

  return (
    <div className={cn(
      "flex items-center gap-2 transition-all duration-300 animate-in fade-in", 
      className
    )}>
      {status === 'saving' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          {showText && <span className="text-sm text-muted-foreground">Enregistrement en cours...</span>}
        </>
      )}
      
      {status === 'success' && (
        <>
          <Check className="h-4 w-4 text-green-500" />
          {showText && <span className="text-sm text-green-600 dark:text-green-400">Enregistré</span>}
        </>
      )}
      
      {status === 'error' && (
        <>
          <AlertCircle className="h-4 w-4 text-destructive" />
          {showText && <span className="text-sm text-destructive">Erreur d'enregistrement</span>}
        </>
      )}
    </div>
  );
};
