
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Save, Eye, Image, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Mock data pour un article individuel
const MOCK_BLOG_POST = {
  id: 'new',
  title: '',
  content: '',
  excerpt: '',
  image: '',
  status: 'draft',
  author: 'Admin',
  date: new Date().toISOString().split('T')[0],
  categories: ['Technologie'],
  tags: ['web', 'développement'],
};

const postSchema = z.object({
  title: z.string().min(5, { message: 'Le titre doit contenir au moins 5 caractères' }),
  excerpt: z.string().min(10, { message: 'L\'extrait doit contenir au moins 10 caractères' }),
  content: z.string().min(50, { message: 'Le contenu doit contenir au moins 50 caractères' }),
  image: z.string().optional(),
  status: z.enum(['draft', 'published']),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
});

type PostFormValues = z.infer<typeof postSchema>;

const AdminBlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewPost = id === 'new';
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      image: '',
      status: 'draft',
      categories: ['Technologie'],
      tags: ['web', 'développement'],
    },
  });

  useEffect(() => {
    if (!isNewPost) {
      // Ici, nous chargerions normalement les données depuis une API
      // Pour l'exemple, nous utilisons des données statiques
      const post = {
        ...MOCK_BLOG_POST,
        id: id || 'new',
        title: 'Les dernières tendances du développement web en 2023',
        excerpt: 'Découvrez les technologies et méthodologies qui dominent le paysage du développement web en 2023.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis ultricies nisl.',
        status: 'published' as 'draft' | 'published',
      };
      
      form.reset(post);
    }
  }, [id, isNewPost, form]);

  const onSubmit = (data: PostFormValues) => {
    // Ici, nous enverrions normalement les données à une API
    console.log('Form data', data);
    
    toast({
      title: isNewPost ? "Article créé" : "Article mis à jour",
      description: isNewPost 
        ? "L'article a été créé avec succès." 
        : "Les modifications ont été enregistrées avec succès.",
    });
    
    if (isNewPost) {
      navigate('/admin/blog');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/blog')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isNewPost ? 'Nouvel article' : 'Modifier l\'article'}
            </h1>
            <p className="text-muted-foreground">
              {isNewPost ? 'Créez un nouvel article de blog' : 'Modifiez le contenu de votre article'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate(`/blog/${id}`)} disabled={isNewPost}>
            <Eye className="mr-2 h-4 w-4" />
            Aperçu
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            <Save className="mr-2 h-4 w-4" />
            {form.getValues('status') === 'draft' ? 'Enregistrer' : 'Publier'}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de l'article" {...field} className="text-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Extrait</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Bref résumé de l'article" 
                            {...field} 
                            className="min-h-[80px]" 
                          />
                        </FormControl>
                        <FormDescription>
                          Cet extrait sera affiché dans les listes d'articles et les résultats de recherche.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="md:col-span-1">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image principale</FormLabel>
                        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
                          <CardContent className="flex flex-col items-center justify-center py-6">
                            {field.value ? (
                              <div className="relative w-full aspect-video bg-gray-100 rounded-md overflow-hidden">
                                <img 
                                  src={field.value} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover" 
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    field.onChange('');
                                  }}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Image className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  <Label
                                    htmlFor="image-upload"
                                    className="relative cursor-pointer rounded-md bg-white dark:bg-transparent font-medium text-primary hover:text-primary/80"
                                  >
                                    <span>Téléchargez une image</span>
                                    <Input
                                      id="image-upload"
                                      type="file"
                                      className="sr-only"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          // Ici, nous simulons le téléchargement d'une image
                                          // Dans un cas réel, nous enverrions le fichier à un serveur
                                          const reader = new FileReader();
                                          reader.onload = () => {
                                            field.onChange(reader.result as string);
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                  </Label>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  PNG, JPG, GIF jusqu'à 10MB
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenu</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Contenu de l'article..." 
                        {...field} 
                        className="min-h-[300px]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <option value="draft">Brouillon</option>
                          <option value="published">Publié</option>
                        </select>
                      </FormControl>
                      <FormDescription>
                        Les brouillons ne sont pas visibles sur le site public.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégories</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Technologie, Développement, Design..." 
                          value={field.value.join(', ')} 
                          onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                        />
                      </FormControl>
                      <FormDescription>
                        Séparez les catégories par des virgules.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="web, développement, react..." 
                          value={field.value.join(', ')} 
                          onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                        />
                      </FormControl>
                      <FormDescription>
                        Séparez les tags par des virgules.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default AdminBlogPost;
