
import React from 'react';

export interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Dummy implementation - replace with your actual editor component
export const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ value, onChange }) => {
  return (
    <div className="p-4">
      <textarea 
        className="w-full h-[400px] p-4 border rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
