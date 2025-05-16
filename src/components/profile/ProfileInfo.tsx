
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { Address, SocialLink } from '@/types/auth';

const ProfileInfo = () => {
  const { user, updateProfile, uploadAvatar } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const form = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      phone: user?.phone || '',
      biography: user?.biography || '',
      // Address fields with defaults
      address: user?.address ? {
        street: user.address.street || '',
        city: user.address.city || '',
        state: user.address.state || '',
        zipCode: user.address.zip || '',
        country: user.address.country || '',
      } : {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
      // Social links with defaults
      socialLinks: user?.socialLinks ? 
        user.socialLinks.map(link => ({
          platform: link.platform,
          url: link.url,
          label: link.label || '',
        })) : 
        [
          { platform: 'linkedin', url: '', label: 'LinkedIn' },
          { platform: 'twitter', url: '', label: 'Twitter' },
          { platform: 'github', url: '', label: 'GitHub' },
        ],
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const onSubmit = async (data: any) => {
    setIsSaving('saving');
    try {
      // Handle avatar upload if a new file was selected
      let avatarUrl = user?.avatar;
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar(avatarFile);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      // Update user profile with form data and new avatar if applicable
      await updateProfile({
        id: user?.id || '',
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        biography: data.biography,
        avatar: avatarUrl,
        address: {
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          zip: data.address.zipCode,
          country: data.address.country,
        } as Address,
      });

      setIsSaving('success');
      setTimeout(() => setIsSaving('idle'), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsSaving('error');
      setTimeout(() => setIsSaving('idle'), 5000);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Profil</CardTitle>
          <CardDescription>
            Gérez vos informations personnelles
          </CardDescription>
        </div>
        <SaveIndicator status={isSaving} />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar upload section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img
                    src={avatarPreview || user?.avatar || '/placeholder.svg'}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer text-sm text-primary hover:underline"
                  >
                    Changer d'image
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
              
              {/* Personal information section */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input type="email" {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Adresse</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rue</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
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
                          <FormLabel>État/Province</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code postal</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Pays</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <Button type="submit">
                Mettre à jour le profil
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
