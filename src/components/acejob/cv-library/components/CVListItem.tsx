
import React from 'react';
import { Star, BookOpen, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CV } from '../types';

interface CVListItemProps {
  cv: CV;
}

const CVListItem = ({ cv }: CVListItemProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{cv.candidateName}</TableCell>
      <TableCell>{cv.title}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {cv.skills.slice(0, 2).map((skill, index) => (
            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
              {skill}
            </span>
          ))}
          {cv.skills.length > 2 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              +{cv.skills.length - 2}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>{cv.experience} ans</TableCell>
      <TableCell>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < cv.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </TableCell>
      <TableCell>{cv.lastInteraction}</TableCell>
      <TableCell>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm">
            <BookOpen className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CVListItem;
