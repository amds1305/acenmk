import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Pen, Plus, Trash2 } from 'lucide-react';

interface FooterLink {
  name: string;
  href: string;
}

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
}

const AdminFooter = () => {
  const { toast } = useToast();
  
  // Services links
  const [serviceLinks, setServiceLinks] = useState<FooterLink[]>([
    { name: "Développement sur mesure", href: "#services" },
    { name: "Infrastructure cloud", href: "#services" },
    { name: "UX/UI Design", href: "#services" },
    { name: "Applications mobiles", href: "#services" },
    { name: "Transformation digitale", href: "#services" },
  ]);

  // Legal links
  const [legalLinks, setLegalLinks] = useState<FooterLink[]>([
    { name: "Mentions légales", href: "#" },
    { name: "Politique de confidentialité", href: "#" },
    { name: "Conditions d'utilisation", href: "#" },
    { name: "Cookies", href: "#" },
  ]);

  // Contact information
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([
    {
      icon: "Mail",
      title: "Email",
      value: "contact@visiontech.fr",
      href: "mailto:contact@visiontech.fr",
    },
    {
      icon: "Phone",
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      href: "tel:+33123456789",
    },
    {
      icon: "MapPin",
      title: "Adresse",
      value: "123 Avenue de l'Innovation, 75001 Paris",
      href: "https://maps.google.com",
    },
  ]);

  // Social media links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
  ]);

  // Company info
  const [companyName, setCompanyName] = useState("VISIONTECH");
  const [companyDescription, setCompanyDescription] = useState(
    "Solutions numériques innovantes pour transformer votre entreprise et accélérer votre croissance."
  );

  // For editing
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkHref, setNewLinkHref] = useState("");
  const [currentSection, setCurrentSection] = useState<"services" | "legal">("services");

  const [editingContact, setEditingContact] = useState<ContactInfo | null>(null);
  const [newContactIcon, setNewContactIcon] = useState("");
  const [newContactTitle, setNewContactTitle] = useState("");
  const [newContactValue, setNewContactValue] = useState("");
  const [newContactHref, setNewContactHref] = useState("");

  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [newSocialName, setNewSocialName] = useState("");
  const [newSocialHref, setNewSocialHref] = useState("");

  // Sauvegarder les données du footer en localStorage et dans Supabase si possible
  const saveFooterData = async () => {
    try {
      // Créer un objet avec toutes les données du footer
      const footerData = {
        companyInfo: {
          name: companyName,
          description: companyDescription
        },
        serviceLinks,
        legalLinks,
        contactInfo,
        socialLinks
      };
      
      // Sauvegarder en localStorage
      localStorage.setItem('footerData', JSON.stringify(footerData));
      
      // Essayer de sauvegarder dans Supabase via le service de sections
      try {
        const { supabase } = await import('@/lib/supabase');
        const { error } = await supabase
          .from('section_data')
          .upsert({
            section_id: 'footer',
            data: footerData,
            updated_at: new Date().toISOString()
          }, { onConflict: 'section_id' });
        
        if (error) throw error;
        
        // Invalider le cache pour forcer un rechargement
        const { useQueryClient } = await import('@tanstack/react-query');
        const queryClient = useQueryClient();
        queryClient.invalidateQueries();
        
        // Déclencher l'événement de changements administratifs
        window.dispatchEvent(new CustomEvent('admin-changes-saved'));
        
        // Forcer un rechargement après 1 seconde
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Erreur Supabase lors de la sauvegarde du footer:", error);
        // Continue malgré l'erreur Supabase, nous avons sauvegardé en localStorage
      }
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du footer:", error);
      return false;
    }
  };

  // Charger les données du footer depuis localStorage ou Supabase
  useEffect(() => {
    const loadFooterData = async () => {
      try {
        // Essayer de charger depuis Supabase d'abord
        try {
          const { supabase } = await import('@/lib/supabase');
          const { data, error } = await supabase
            .from('section_data')
            .select('data')
            .eq('section_id', 'footer')
            .single();
          
          if (error) throw error;
          
          if (data && data.data) {
            const footerData = data.data;
            
            if (footerData.companyInfo) {
              setCompanyName(footerData.companyInfo.name);
              setCompanyDescription(footerData.companyInfo.description);
            }
            
            if (footerData.serviceLinks) setServiceLinks(footerData.serviceLinks);
            if (footerData.legalLinks) setLegalLinks(footerData.legalLinks);
            if (footerData.contactInfo) setContactInfo(footerData.contactInfo);
            if (footerData.socialLinks) setSocialLinks(footerData.socialLinks);
            
            return; // Données chargées depuis Supabase, pas besoin de continuer
          }
        } catch (error) {
          console.error("Erreur Supabase lors du chargement du footer:", error);
          // Continuer avec localStorage en cas d'erreur
        }
        
        // Charger depuis localStorage si Supabase a échoué
        const savedData = localStorage.getItem('footerData');
        if (savedData) {
          const footerData = JSON.parse(savedData);
          
          if (footerData.companyInfo) {
            setCompanyName(footerData.companyInfo.name);
            setCompanyDescription(footerData.companyInfo.description);
          }
          
          if (footerData.serviceLinks) setServiceLinks(footerData.serviceLinks);
          if (footerData.legalLinks) setLegalLinks(footerData.legalLinks);
          if (footerData.contactInfo) setContactInfo(footerData.contactInfo);
          if (footerData.socialLinks) setSocialLinks(footerData.socialLinks);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du footer:", error);
      }
    };
    
    loadFooterData();
  }, []);

  // Handle links (services and legal)
  const handleSaveLink = () => {
    if (!newLinkName || !newLinkHref) {
      toast({
        title: "Erreur",
        description: "Nom et lien sont requis",
        variant: "destructive"
      });
      return;
    }

    const newLink = { name: newLinkName, href: newLinkHref };

    if (editingLink) {
      // Update existing link
      if (currentSection === "services") {
        setServiceLinks(serviceLinks.map(link => 
          link === editingLink ? newLink : link
        ));
      } else {
        setLegalLinks(legalLinks.map(link => 
          link === editingLink ? newLink : link
        ));
      }
      
      toast({
        title: "Succès",
        description: "Lien mis à jour"
      });
    } else {
      // Add new link
      if (currentSection === "services") {
        setServiceLinks([...serviceLinks, newLink]);
      } else {
        setLegalLinks([...legalLinks, newLink]);
      }
      
      toast({
        title: "Succès",
        description: "Lien ajouté"
      });
    }

    // Reset form
    setEditingLink(null);
    setNewLinkName("");
    setNewLinkHref("");
    
    // Sauvegarder les modifications
    saveFooterData();
  };

  const handleEditLink = (link: FooterLink, section: "services" | "legal") => {
    setEditingLink(link);
    setNewLinkName(link.name);
    setNewLinkHref(link.href);
    setCurrentSection(section);
  };

  const handleDeleteLink = (link: FooterLink, section: "services" | "legal") => {
    if (section === "services") {
      setServiceLinks(serviceLinks.filter(l => l !== link));
    } else {
      setLegalLinks(legalLinks.filter(l => l !== link));
    }
    
    toast({
      title: "Succès",
      description: "Lien supprimé"
    });
    
    // Sauvegarder les modifications
    saveFooterData();
  };

  // Handle contact info
  const handleSaveContact = () => {
    if (!newContactIcon || !newContactTitle || !newContactValue || !newContactHref) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont requis",
        variant: "destructive"
      });
      return;
    }

    const newContact = { 
      icon: newContactIcon, 
      title: newContactTitle, 
      value: newContactValue, 
      href: newContactHref 
    };

    if (editingContact) {
      // Update existing contact
      setContactInfo(contactInfo.map(contact => 
        contact === editingContact ? newContact : contact
      ));
      
      toast({
        title: "Succès",
        description: "Contact mis à jour"
      });
    } else {
      // Add new contact
      setContactInfo([...contactInfo, newContact]);
      
      toast({
        title: "Succès",
        description: "Contact ajouté"
      });
    }

    // Reset form
    setEditingContact(null);
    setNewContactIcon("");
    setNewContactTitle("");
    setNewContactValue("");
    setNewContactHref("");
    
    // Sauvegarder les modifications
    saveFooterData();
  };

  const handleEditContact = (contact: ContactInfo) => {
    setEditingContact(contact);
    setNewContactIcon(contact.icon);
    setNewContactTitle(contact.title);
    setNewContactValue(contact.value);
    setNewContactHref(contact.href);
  };

  const handleDeleteContact = (contact: ContactInfo) => {
    setContactInfo(contactInfo.filter(c => c !== contact));
    
    toast({
      title: "Succès",
      description: "Contact supprimé"
    });
    
    // Sauvegarder les modifications
    saveFooterData();
  };

  // Handle social links
  const handleSaveSocial = () => {
    if (!newSocialName || !newSocialHref) {
      toast({
        title: "Erreur",
        description: "Nom et lien sont requis",
        variant: "destructive"
      });
      return;
    }

    const newSocial = { name: newSocialName, href: newSocialHref };

    if (editingSocial) {
      // Update existing social link
      setSocialLinks(socialLinks.map(social => 
        social === editingSocial ? newSocial : social
      ));
      
      toast({
        title: "Succès",
        description: "Lien social mis à jour"
      });
    } else {
      // Add new social link
      setSocialLinks([...socialLinks, newSocial]);
      
      toast({
        title: "Succès",
        description: "Lien social ajouté"
      });
    }

    // Reset form
    setEditingSocial(null);
    setNewSocialName("");
    setNewSocialHref("");
    
    // Sauvegarder les modifications
    saveFooterData();
  };

  const handleEditSocial = (social: SocialLink) => {
    setEditingSocial(social);
    setNewSocialName(social.name);
    setNewSocialHref(social.href);
  };

  const handleDeleteSocial = (social: SocialLink) => {
    setSocialLinks(socialLinks.filter(s => s !== social));
    
    toast({
      title: "Succès",
      description: "Lien social supprimé"
    });
    
    // Sauvegarder les modifications
    saveFooterData();
  };

  // Update company info
  const handleUpdateCompanyInfo = () => {
    toast({
      title: "Succès",
      description: "Informations de l'entreprise mises à jour"
    });
    
    // Sauvegarder les modifications
    saveFooterData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Administration du pied de page</h1>
        <Button 
          onClick={saveFooterData}
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
        >
          Sauvegarder toutes les modifications
        </Button>
      </div>

      <Tabs defaultValue="company">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="links">Liens</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription>
                Modifier les informations générales de l'entreprise affichées dans le pied de page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom de l'entreprise</label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description de l'entreprise</label>
                  <Textarea
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button onClick={handleUpdateCompanyInfo}>
                  Mettre à jour
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="links" className="space-y-4 mt-4">
          <Tabs defaultValue="services">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="legal">Légal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Liens de services</CardTitle>
                  <CardDescription>
                    Gérer les liens de services affichés dans le pied de page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {serviceLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <div>
                            <p className="font-medium">{link.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{link.href}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleEditLink(link, "services")}>
                              <Pen className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteLink(link, "services")}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">
                        {editingLink && currentSection === "services" ? 'Modifier le lien' : 'Ajouter un nouveau lien'}
                      </h4>
                      <div className="grid gap-3">
                        <Input
                          placeholder="Nom du lien"
                          value={newLinkName}
                          onChange={(e) => setNewLinkName(e.target.value)}
                        />
                        <Input
                          placeholder="URL"
                          value={newLinkHref}
                          onChange={(e) => setNewLinkHref(e.target.value)}
                        />
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveLink}>
                            {editingLink && currentSection === "services" ? 'Mettre à jour' : 'Ajouter'}
                          </Button>
                          {editingLink && currentSection === "services" && (
                            <Button variant="outline" onClick={() => {
                              setEditingLink(null);
                              setNewLinkName('');
                              setNewLinkHref('');
                            }}>
                              Annuler
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="legal" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Liens légaux</CardTitle>
                  <CardDescription>
                    Gérer les liens légaux affichés dans le pied de page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {legalLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <div>
                            <p className="font-medium">{link.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{link.href}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleEditLink(link, "legal")}>
                              <Pen className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteLink(link, "legal")}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">
                        {editingLink && currentSection === "legal" ? 'Modifier le lien' : 'Ajouter un nouveau lien'}
                      </h4>
                      <div className="grid gap-3">
                        <Input
                          placeholder="Nom du lien"
                          value={newLinkName}
                          onChange={(e) => setNewLinkName(e.target.value)}
                        />
                        <Input
                          placeholder="URL"
                          value={newLinkHref}
                          onChange={(e) => setNewLinkHref(e.target.value)}
                        />
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveLink}>
                            {editingLink && currentSection === "legal" ? 'Mettre à jour' : 'Ajouter'}
                          </Button>
                          {editingLink && currentSection === "legal" && (
                            <Button variant="outline" onClick={() => {
                              setEditingLink(null);
                              setNewLinkName('');
                              setNewLinkHref('');
                            }}>
                              Annuler
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de contact</CardTitle>
              <CardDescription>
                Gérer les informations de contact affichées dans le pied de page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium">{info.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{info.value}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEditContact(info)}>
                          <Pen className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteContact(info)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">
                    {editingContact ? 'Modifier le contact' : 'Ajouter un nouveau contact'}
                  </h4>
                  <div className="grid gap-3">
                    <Input
                      placeholder="Icône (Mail, Phone, MapPin)"
                      value={newContactIcon}
                      onChange={(e) => setNewContactIcon(e.target.value)}
                    />
                    <Input
                      placeholder="Titre"
                      value={newContactTitle}
                      onChange={(e) => setNewContactTitle(e.target.value)}
                    />
                    <Input
                      placeholder="Valeur"
                      value={newContactValue}
                      onChange={(e) => setNewContactValue(e.target.value)}
                    />
                    <Input
                      placeholder="Lien (URL)"
                      value={newContactHref}
                      onChange={(e) => setNewContactHref(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveContact}>
                        {editingContact ? 'Mettre à jour' : 'Ajouter'}
                      </Button>
                      {editingContact && (
                        <Button variant="outline" onClick={() => {
                          setEditingContact(null);
                          setNewContactIcon('');
                          setNewContactTitle('');
                          setNewContactValue('');
                          setNewContactHref('');
                        }}>
                          Annuler
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Réseaux sociaux</CardTitle>
              <CardDescription>
                Gérer les liens vers les réseaux sociaux dans le pied de page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  {socialLinks.map((social, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div>
                        <p className="font-medium">{social.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{social.href}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEditSocial(social)}>
                          <Pen className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteSocial(social)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">
                    {editingSocial ? 'Modifier le réseau social' : 'Ajouter un nouveau réseau social'}
                  </h4>
                  <div className="grid gap-3">
                    <Input
                      placeholder="Nom (ex: Facebook, Twitter)"
                      value={newSocialName}
                      onChange={(e) => setNewSocialName(e.target.value)}
                    />
                    <Input
                      placeholder="URL"
                      value={newSocialHref}
                      onChange={(e) => setNewSocialHref(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveSocial}>
                        {editingSocial ? 'Mettre à jour' : 'Ajouter'}
                      </Button>
                      {editingSocial && (
                        <Button variant="outline" onClick={() => {
                          setEditingSocial(null);
                          setNewSocialName('');
                          setNewSocialHref('');
                        }}>
                          Annuler
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminFooter;
