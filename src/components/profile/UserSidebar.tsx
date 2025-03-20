
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Phone, Mail, Edit2, Save, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User as UserType, Message } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  company: z.string().optional(),
  phone: z.string().optional(),
});

interface UserSidebarProps {
  user: UserType;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  updateProfile: (data: Partial<UserType>) => Promise<void>;
  messages: Message[];
  formatDate: (dateString: string) => string;
}

const UserSidebar = ({ 
  user, 
  isEditing, 
  setIsEditing, 
  updateProfile, 
  messages, 
  formatDate 
}: UserSidebarProps) => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      company: user.company || '',
      phone: user.phone || '',
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        company: user.company || '',
        phone: user.phone || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <div className="lg:col-span-4">
      <Card>
        <CardHeader className="text-center pb-0">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.role === 'admin' ? 'Administrateur' : 'Client'}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entreprise</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre entreprise" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre téléphone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 opacity-70" />
                  <span>{user.email}</span>
                </div>
                {user.company && (
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 opacity-70" />
                    <span>{user.company}</span>
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 opacity-70" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 opacity-70" />
                  <span>Membre depuis {formatDate(user.createdAt)}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-6" 
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Modifier mon profil
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      
      <RecentMessages messages={messages} formatDate={formatDate} navigate={navigate} />
    </div>
  );
};

interface RecentMessagesProps {
  messages: Message[];
  formatDate: (dateString: string) => string;
  navigate: ReturnType<typeof useNavigate>;
}

const RecentMessages = ({ messages, formatDate, navigate }: RecentMessagesProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Messages récents
        </CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-3 rounded-lg border ${!message.read ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center">
                    <Badge variant={message.sender === 'admin' ? "default" : "secondary"} className="text-xs">
                      {message.sender === 'admin' ? 'Support' : 'Vous'}
                    </Badge>
                    {!message.read && message.sender === 'admin' && (
                      <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary border-primary/30">
                        Non lu
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Aucun message</p>
        )}
        
        <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/messages')}>
          Voir tous les messages
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserSidebar;
