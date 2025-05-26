
import React, { useState } from 'react';
import { User, UserPreferences, Address, SocialLink } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, Loader2, Upload, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileInfoProps {
  user: User;
  updateProfile: (data: Partial<User>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, updateProfile, uploadAvatar }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    company: user.company || '',
    phone: user.phone || '',
    biography: user.biography || '',
    address: {
      street: user.address?.street || '',
      city: user.address?.city || '',
      state: user.address?.state || '',
      zipCode: user.address?.zipCode || '',
      country: user.address?.country || '',
    },
    socialLinks: user.socialLinks || [
      { platform: 'linkedin', url: '' },
      { platform: 'twitter', url: '' },
      { platform: 'github', url: '' },
    ],
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateProfile({
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        biography: formData.biography,
        address: formData.address as Address,
        socialLinks: formData.socialLinks as SocialLink[],
        avatar: user.avatar,
      });
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre profil."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploadingAvatar(true);
    
    try {
      const avatarUrl = await uploadAvatar(file);
      setFormData({ ...formData, avatar: avatarUrl });
      
      toast({
        title: "Avatar mis à jour",
        description: "Votre photo de profil a été mise à jour avec succès."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement de l'avatar."
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xl">
                  <UserIcon className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -right-2 -bottom-2">
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="bg-primary hover:bg-primary/90 text-white p-2 rounded-full">
                    {isUploadingAvatar ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </div>
                </Label>
                <Input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                  className="hidden" 
                />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="text-sm text-muted-foreground mt-1">
                Membre depuis le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
              <TabsTrigger value="address">Adresse</TabsTrigger>
              <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
            </TabsList>
            
            {/* Tab Content: Personal Information */}
            <TabsContent value="personal">
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      disabled 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biography">Biographie</Label>
                  <Textarea 
                    id="biography" 
                    name="biography" 
                    value={formData.biography} 
                    onChange={handleInputChange} 
                    rows={4} 
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Tab Content: Address */}
            <TabsContent value="address">
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Rue</Label>
                  <Input 
                    id="street" 
                    name="address.street" 
                    value={formData.address.street} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input 
                      id="city" 
                      name="address.city" 
                      value={formData.address.city} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Code postal</Label>
                    <Input 
                      id="zipCode" 
                      name="address.zipCode" 
                      value={formData.address.zipCode} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="state">État / Province</Label>
                    <Input 
                      id="state" 
                      name="address.state" 
                      value={formData.address.state} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Pays</Label>
                    <Input 
                      id="country" 
                      name="address.country" 
                      value={formData.address.country} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Tab Content: Social Media */}
            <TabsContent value="social">
              <div className="space-y-4 py-4">
                {formData.socialLinks?.map((link, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`socialLink-${index}`}>
                      {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                    </Label>
                    <Input 
                      id={`socialLink-${index}`} 
                      name={`socialLinks.${index}.url`} 
                      value={link.url} 
                      onChange={(e) => {
                        const newSocialLinks = [...formData.socialLinks];
                        newSocialLinks[index].url = e.target.value;
                        setFormData({ ...formData, socialLinks: newSocialLinks });
                      }} 
                      placeholder={`Votre URL ${link.platform}`} 
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Enregistrer les modifications
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default ProfileInfo;
