
import React from 'react';
import { Star, BookOpen, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CV } from '../types';

interface CVCardProps {
  cv: CV;
}

const CVCard = ({ cv }: CVCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{cv.candidateName}</CardTitle>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < cv.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <CardDescription>{cv.title}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm"><strong>Expérience:</strong> {cv.experience} ans</p>
        <p className="text-sm"><strong>Formation:</strong> {cv.education}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {cv.skills.map((skill, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {cv.tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-1 flex justify-between items-center">
        <span className="text-xs text-gray-500">Modifié: {cv.lastInteraction}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm">
            <BookOpen className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CVCard;
