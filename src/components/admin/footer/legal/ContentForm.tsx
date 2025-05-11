
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { WysiwygEditor } from '@/components/admin/WysiwygEditor';
import { LegalContent, LegalContents } from './types';

interface ContentFormProps {
  contentKey: keyof LegalContents;
  content: LegalContent;
  updateContent: (section: keyof LegalContents, field: keyof LegalContent, value: string | boolean) => void;
}

export const ContentForm = ({ contentKey, content, updateContent }: ContentFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${contentKey}-title`}>Titre de la page</Label>
        <Input
          id={`${contentKey}-title`}
          value={content.title}
          onChange={(e) => updateContent(contentKey, 'title', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${contentKey}-metaDescription`}>Description Meta (SEO)</Label>
        <Input
          id={`${contentKey}-metaDescription`}
          value={content.metaDescription || ''}
          onChange={(e) => updateContent(contentKey, 'metaDescription', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`${contentKey}-content`}>Contenu</Label>
        <div className="min-h-[400px] border rounded-md">
          <WysiwygEditor
            content={content.content}
            onChange={(value) => updateContent(contentKey, 'content', value)}
            placeholder="Commencez à éditer votre contenu..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`${contentKey}-published`}
          checked={content.isPublished}
          onChange={(e) => updateContent(contentKey, 'isPublished', e.target.checked)}
          className="rounded border-gray-300"
        />
        <Label htmlFor={`${contentKey}-published`}>Publier cette page</Label>
      </div>
    </div>
  );
};
