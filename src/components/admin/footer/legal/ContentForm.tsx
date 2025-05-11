
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import { LegalContent } from './types';

interface ContentFormProps {
  contentKey: string;
  content: LegalContent | undefined;
  updateContent: (section: any, field: keyof LegalContent, value: string | boolean) => void;
}

export const ContentForm: React.FC<ContentFormProps> = ({
  contentKey,
  content,
  updateContent
}) => {
  // Make sure content exists and has valid values with safe default fallbacks
  const safeContent = {
    title: content?.title || '',
    content: content?.content || '',
    metaDescription: content?.metaDescription || '',
    isPublished: content?.isPublished !== false
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${contentKey}-title`}>Titre de la page</Label>
        <Input
          id={`${contentKey}-title`}
          value={safeContent.title}
          onChange={(e) => updateContent(contentKey, 'title', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${contentKey}-metaDescription`}>Description Meta (SEO)</Label>
        <Input
          id={`${contentKey}-metaDescription`}
          value={safeContent.metaDescription}
          onChange={(e) => updateContent(contentKey, 'metaDescription', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${contentKey}-content`}>Contenu</Label>
        <div className="min-h-[400px] border rounded-md">
          <WysiwygEditor
            value={safeContent.content}
            onChange={(value) => updateContent(contentKey, 'content', value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`${contentKey}-published`}
          checked={safeContent.isPublished}
          onCheckedChange={(checked) => 
            updateContent(contentKey, 'isPublished', checked === true)
          }
        />
        <Label htmlFor={`${contentKey}-published`}>Publier cette page</Label>
      </div>
    </div>
  );
};

export default ContentForm;
