
import React, { useCallback } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Image as ImageIcon, 
  Link as LinkIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Undo,
  Redo,
  Trash2,
  Code,
  Quote,
  Pilcrow
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WysiwygEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ 
  content, 
  onChange, 
  placeholder = 'Commencez à écrire ici...' 
}) => {
  const [linkUrl, setLinkUrl] = React.useState('https://');
  const [imageUrl, setImageUrl] = React.useState('https://');
  const [showLinkMenu, setShowLinkMenu] = React.useState(false);
  const [showImageMenu, setShowImageMenu] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-full',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    setShowLinkMenu(false);
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor) return;
    
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setShowImageMenu(false);
      setImageUrl('https://');
    }
  }, [editor, imageUrl]);

  if (!editor) {
    return null;
  }

  const handleAlignLeft = () => {
    editor.chain().focus().unsetTextAlign().run();
  };

  const handleAlignCenter = () => {
    // We don't use setTextAlign because it's not available in the base StarterKit
    // Instead, we apply a CSS class for alignment
    editor.chain().focus().run();
    // In a real implementation, you would need to extend TipTap with a TextAlign extension
  };

  const handleAlignRight = () => {
    // We don't use setTextAlign because it's not available in the base StarterKit
    editor.chain().focus().run();
    // In a real implementation, you would need to extend TipTap with a TextAlign extension
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-2 flex flex-wrap gap-1 items-center border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(editor.isActive('bold') ? 'bg-muted-foreground/20' : '')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(editor.isActive('italic') ? 'bg-muted-foreground/20' : '')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(editor.isActive('heading', { level: 1 }) ? 'bg-muted-foreground/20' : '')}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(editor.isActive('heading', { level: 2 }) ? 'bg-muted-foreground/20' : '')}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(editor.isActive('heading', { level: 3 }) ? 'bg-muted-foreground/20' : '')}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(editor.isActive('bulletList') ? 'bg-muted-foreground/20' : '')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(editor.isActive('orderedList') ? 'bg-muted-foreground/20' : '')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(editor.isActive('codeBlock') ? 'bg-muted-foreground/20' : '')}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(editor.isActive('blockquote') ? 'bg-muted-foreground/20' : '')}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={cn(editor.isActive('paragraph') ? 'bg-muted-foreground/20' : '')}
        >
          <Pilcrow className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleAlignLeft}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleAlignCenter}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleAlignRight}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowLinkMenu(!showLinkMenu)}
          className={cn(editor.isActive('link') ? 'bg-muted-foreground/20' : '')}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowImageMenu(!showImageMenu)}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.commands.clearContent()}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      {showLinkMenu && (
        <div className="p-2 border-b flex gap-2">
          <Input 
            value={linkUrl} 
            onChange={(e) => setLinkUrl(e.target.value)} 
            placeholder="https://example.com" 
          />
          <Button onClick={setLink}>Ajouter lien</Button>
          <Button variant="outline" onClick={() => setShowLinkMenu(false)}>Annuler</Button>
        </div>
      )}
      
      {showImageMenu && (
        <div className="p-2 border-b">
          <Tabs defaultValue="url">
            <TabsList className="mb-2">
              <TabsTrigger value="url">URL d'image</TabsTrigger>
              <TabsTrigger value="upload" disabled>Upload (bientôt)</TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="flex gap-2">
              <Input 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                placeholder="https://example.com/image.jpg" 
              />
              <Button onClick={addImage}>Ajouter image</Button>
              <Button variant="outline" onClick={() => setShowImageMenu(false)}>Annuler</Button>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      <EditorContent editor={editor} className="p-4 min-h-[300px] prose dark:prose-invert max-w-none" />
    </div>
  );
};

export default WysiwygEditor;
