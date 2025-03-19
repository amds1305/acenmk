
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';

interface WysiwygEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  content,
  onChange,
  placeholder = 'Commencez à écrire...'
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('URL de l\'image');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL du lien', previousUrl);
    
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-2 flex flex-wrap gap-1 items-center border-b">
        <Toggle
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Titre 1"
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Titre 2"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Toggle
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Gras"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Italique"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Toggle
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Liste à puces"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Liste numérotée"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Toggle
          pressed={editor.isActive('blockquote')}
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Citation"
        >
          <Quote className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          pressed={editor.isActive({ textAlign: 'left' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Aligner à gauche"
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: 'center' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Centrer"
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: 'right' })}
          onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
          size="sm"
          className="h-8 w-8 p-0"
          title="Aligner à droite"
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={setLink} title="Lien">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={addImage} title="Image">
          <ImageIcon className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Annuler"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Refaire"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      
      <EditorContent editor={editor} className="p-4 min-h-[200px] prose max-w-none dark:prose-invert prose-sm sm:prose-base lg:prose-lg focus:outline-none" />
    </div>
  );
};

export default WysiwygEditor;
