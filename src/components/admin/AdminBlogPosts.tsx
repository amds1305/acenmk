
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash, Eye, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data pour les articles de blog
const MOCK_BLOG_POSTS = [
  { id: '1', title: 'Les dernières tendances du développement web en 2023', status: 'Publié', date: '2023-05-12', views: 1240 },
  { id: '2', title: 'Comment optimiser les performances de votre application React', status: 'Publié', date: '2023-06-18', views: 856 },
  { id: '3', title: 'L\'intelligence artificielle dans le développement de logiciels', status: 'Brouillon', date: '2023-07-05', views: 0 },
  { id: '4', title: 'Guide complet sur TypeScript pour les développeurs JavaScript', status: 'Publié', date: '2023-08-22', views: 1582 },
  { id: '5', title: 'Migration vers le cloud: stratégies et bonnes pratiques', status: 'Publié', date: '2023-09-10', views: 723 },
  { id: '6', title: 'Sécurité des applications: les vulnérabilités courantes à éviter', status: 'Brouillon', date: '2023-10-03', views: 0 },
];

const AdminBlogPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState(MOCK_BLOG_POSTS);
  const [postToDelete, setPostToDelete] = useState<{ id: string, title: string } | null>(null);
  const { toast } = useToast();

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Article supprimé",
      description: "L'article a été supprimé avec succès.",
    });
    setPostToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Articles de blog</h1>
          <p className="text-muted-foreground">Gérez vos articles de blog, créez du nouveau contenu ou mettez à jour l'existant.</p>
        </div>
        <Link to="/admin/blog/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Articles ({filteredPosts.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Vues</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'Publié' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}>
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>{post.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/blog/${post.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/admin/blog/${post.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setPostToDelete({ id: post.id, title: post.title })}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmer la suppression</DialogTitle>
                              <DialogDescription>
                                Êtes-vous sûr de vouloir supprimer l'article "{postToDelete?.title}" ? Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setPostToDelete(null)}>
                                Annuler
                              </Button>
                              <Button variant="destructive" onClick={() => postToDelete && handleDelete(postToDelete.id)}>
                                Supprimer
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mb-2 opacity-20" />
                      <p>Aucun article trouvé</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogPosts;
