
import React from 'react';

export interface WysiwygEditorProps {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ content, onChange, placeholder }) => {
  return (
    <div className="p-4">
      <textarea 
        className="w-full h-[400px] p-4 border rounded-md"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

// Make sure we have both a named and default export
export default WysiwygEditor;
