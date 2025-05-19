
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SectionRedirectCardProps {
  title: string;
  description: string;
  redirectPath: string;
  buttonText: string;
}

const SectionRedirectCard: React.FC<SectionRedirectCardProps> = ({
  title,
  description,
  redirectPath,
  buttonText
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {description}
        </p>
        <div className="mt-4">
          <Button variant="outline" onClick={() => window.location.href = redirectPath}>
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionRedirectCard;
