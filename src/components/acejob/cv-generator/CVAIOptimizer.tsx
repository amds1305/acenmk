
import React, { useState } from 'react';
import { Sparkles, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface CVAIOptimizerProps {
  cvContent: string;
  onOptimize: (optimizedContent: string) => void;
}

const CVAIOptimizer = ({ cvContent, onOptimize }: CVAIOptimizerProps) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const startOptimization = () => {
    setIsOptimizing(true);
    setProgress(0);
    
    // Simuler le processus d'optimisation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          generateSuggestions();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const generateSuggestions = () => {
    // Suggestions d'amélioration générées par l'IA (simulées)
    const aiSuggestions = [
      "Utilisez des verbes d'action plus percutants dans la description de vos expériences.",
      "Quantifiez vos réalisations avec des chiffres et des pourcentages pour plus d'impact.",
      "Ajoutez des mots-clés spécifiques au secteur visé pour améliorer la visibilité auprès des recruteurs.",
      "Réorganisez les compétences par ordre de pertinence pour le poste ciblé.",
      "Utilisez un format plus concis pour les descriptions d'expérience."
    ];
    
    setSuggestions(aiSuggestions);
    
    // Simuler un CV optimisé
    const optimizedCV = cvContent + "\n\n[Version optimisée par IA]";
    
    toast({
      title: "Analyse terminée",
      description: "L'IA a généré des suggestions pour améliorer votre CV.",
    });
  };
  
  const applyOptimization = () => {
    const optimizedCV = cvContent + "\n\n[Ce CV a été optimisé par l'assistant IA]";
    onOptimize(optimizedCV);
    setIsOptimizing(false);
    setSuggestions([]);
    
    toast({
      title: "Optimisations appliquées",
      description: "Votre CV a été amélioré avec succès.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Assistant d'optimisation IA
        </CardTitle>
        <CardDescription>
          Utilisez l'intelligence artificielle pour optimiser votre CV et augmenter vos chances d'être remarqué
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isOptimizing && suggestions.length === 0 && (
          <div className="text-center py-6">
            <Sparkles className="h-12 w-12 mx-auto text-primary/50" />
            <p className="mt-4 text-sm text-gray-600">
              Notre IA analysera votre CV et proposera des améliorations personnalisées pour maximiser son impact.
            </p>
            <Button 
              onClick={startOptimization}
              className="mt-4"
            >
              Optimiser mon CV
            </Button>
          </div>
        )}
        
        {isOptimizing && progress < 100 && (
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <div className="text-center">
              <p className="font-medium">Analyse en cours...</p>
              <p className="text-sm text-gray-500 mt-1">
                Notre IA analyse votre CV pour identifier les opportunités d'amélioration
              </p>
            </div>
            <Progress value={progress} />
          </div>
        )}
        
        {!isOptimizing && suggestions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Suggestions d'amélioration:</h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex gap-2 items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-sm">{suggestion}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      {!isOptimizing && suggestions.length > 0 && (
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={() => setSuggestions([])}>
            Ignorer
          </Button>
          <Button onClick={applyOptimization}>
            Appliquer les optimisations
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CVAIOptimizer;
