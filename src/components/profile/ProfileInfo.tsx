
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User as UserType, Address, SocialLink } from '@/types/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Camera,
  Plus,
  Trash2
} from 'lucide-react';

const profileFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  company: z.string().optional(),
  phone: z.string().optional(),
  biography: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  socialLinks: z.array(
    z.object({
      platform: z.enum(['facebook', 'twitter', 'instagram', 'linkedin', 'github', 'other']),
      url: z.string().url("URL invalide"),
      label: z.string().optional(),
    })
  ).optional(),
});

interface ProfileInfoProps {
  user: UserType;
  updateProfile: (data: Partial<UserType>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, updateProfile, uploadAvatar }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Set up form with existing user data
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      company: user.company || '',
      phone: user.phone || '',
      biography: user.biography || '',
      address: user.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
      socialLinks: user.socialLinks || [],
    },
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        await uploadAvatar(file);
      } catch (error) {
        console.error('Error uploading avatar:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    await updateProfile(data);
  };

  const addSocialLink = () => {
    const currentLinks = form.getValues('socialLinks') || [];
    form.setValue('socialLinks', [
      ...currentLinks,
      { platform: 'other', url: '', label: '' }
    ]);
  };

  const removeSocialLink = (index: number) => {
    const currentLinks = form.getValues('socialLinks') || [];
    form.setValue('socialLinks', currentLinks.filter((_, i) => i !== index));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'github': return <Github className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations de profil</CardTitle>
        <CardDescription>
          Mettez à jour vos informations personnelles et professionnelles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition"
              >
                <Camera className="h-6 w-6" />
              </label>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarUpload} 
                disabled={isUploading}
              />
            </div>
            {isUploading && <p className="text-sm mt-2">Téléchargement...</p>}
          </div>
          
          {/* Profile Form */}
          <div className="flex-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" /> Nom complet
                        </FormLabel>
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
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Email
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Votre email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" /> Téléphone
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Votre téléphone" {...field} />
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
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" /> Entreprise
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Votre entreprise" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="biography"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biographie</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Parlez-nous de vous..." 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Adresse
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rue</FormLabel>
                          <FormControl>
                            <Input placeholder="Rue" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ville</FormLabel>
                          <FormControl>
                            <Input placeholder="Ville" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code postal</FormLabel>
                          <FormControl>
                            <Input placeholder="Code postal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>État/Département</FormLabel>
                          <FormControl>
                            <Input placeholder="État/Département" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <FormControl>
                            <Input placeholder="Pays" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Réseaux sociaux</h3>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addSocialLink}
                      className="text-xs gap-1"
                    >
                      <Plus className="h-3 w-3" /> Ajouter
                    </Button>
                  </div>
                  
                  {form.watch('socialLinks')?.map((_, index) => (
                    <div className="flex gap-3" key={index}>
                      <FormField
                        control={form.control}
                        name={`socialLinks.${index}.platform`}
                        render={({ field }) => (
                          <FormItem className="flex-shrink-0 w-32">
                            <FormControl>
                              <select 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                {...field}
                              >
                                <option value="facebook">Facebook</option>
                                <option value="twitter">Twitter</option>
                                <option value="instagram">Instagram</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="github">GitHub</option>
                                <option value="other">Autre</option>
                              </select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`socialLinks.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="flex gap-2">
                                <span className="flex items-center pl-3 bg-muted rounded-l-md border border-r-0 border-input">
                                  {getPlatformIcon(form.watch(`socialLinks.${index}.platform`))}
                                </span>
                                <Input placeholder="URL" className="rounded-l-none" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeSocialLink(index)}
                        className="h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button type="submit" className="w-full">
                  Enregistrer les modifications
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
