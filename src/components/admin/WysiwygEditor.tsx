
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link'
  ];

  return (
    <ReactQuill 
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className="min-h-[300px]"
    />
  );
};
