
import React, { useState } from 'react';
import { Check, FileText, Download, ExternalLink, Copy, Sparkles, FileUp, Palette, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

// Interface pour le formulaire du CV
interface CVFormData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    summary: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
}

interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

interface Language {
  id: string;
  name: string;
  level: string; // 'basic', 'intermediate', 'advanced', 'native'
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
}

// Données d'exemple
const defaultCV: CVFormData = {
  personalInfo: {
    fullName: "Jean Dupont",
    title: "Développeur Web Full Stack",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    website: "www.jeandupont.dev",
    linkedin: "linkedin.com/in/jeandupont",
    summary: "Développeur web passionné avec 5 ans d'expérience en création d'applications web et mobiles. Spécialisé en React, Node.js et architecture cloud."
  },
  workExperience: [
    {
      id: "1",
      position: "Développeur Full Stack Senior",
      company: "Tech Innovate",
      location: "Paris, France",
      startDate: "2023-01",
      endDate: "",
      current: true,
      description: "Développement d'applications web pour des clients dans les secteurs finance et retail. Lead technique sur plusieurs projets React/Node.js. Mise en place de CI/CD et amélioration des performances."
    },
    {
      id: "2",
      position: "Développeur Frontend",
      company: "Digital Solutions",
      location: "Lyon, France",
      startDate: "2020-03",
      endDate: "2022-12",
      current: false,
      description: "Création d'interfaces utilisateur avec React et Vue.js. Optimisation des performances et expérience utilisateur. Collaboration avec des designers et des développeurs backend."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master en Informatique",
      institution: "Université de Paris",
      location: "Paris, France",
      startDate: "2018-09",
      endDate: "2020-06",
      description: "Spécialisation en développement web et technologies cloud."
    }
  ],
  skills: [
    { id: "1", name: "React", level: 5 },
    { id: "2", name: "Node.js", level: 4 },
    { id: "3", name: "TypeScript", level: 4 },
    { id: "4", name: "AWS", level: 3 }
  ],
  languages: [
    { id: "1", name: "Français", level: "native" },
    { id: "2", name: "Anglais", level: "advanced" },
    { id: "3", name: "Espagnol", level: "intermediate" }
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2022-04",
      expiry: "2025-04"
    }
  ]
};

// Composant principal
const CVGenerator = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [cvData, setCvData] = useState<CVFormData>(defaultCV);

  const form = useForm<CVFormData>({
    defaultValues: defaultCV
  });

  const handleFormSubmit = (data: CVFormData) => {
    setCvData(data);
    setActiveTab("preview");
  };

  const templates = [
    { id: "modern", name: "Moderne", description: "Design épuré et contemporain" },
    { id: "classic", name: "Classique", description: "Mise en page traditionnelle et professionnelle" },
    { id: "creative", name: "Créatif", description: "Style unique pour se démarquer" },
    { id: "minimalist", name: "Minimaliste", description: "Simplicité et élégance" },
    { id: "executive", name: "Exécutif", description: "Pour les postes de direction" },
    { id: "technical", name: "Technique", description: "Idéal pour les profils IT" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Générateur de CV</CardTitle>
          <CardDescription>Créez un CV professionnel en quelques étapes simples</CardDescription>
          <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-2">
              <TabsTrigger value="edit">Édition</TabsTrigger>
              <TabsTrigger value="template">Modèles</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <TabsContent value="edit" className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                {/* Informations personnelles */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Prénom Nom" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personalInfo.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre professionnel</FormLabel>
                          <FormControl>
                            <Input placeholder="ex: Développeur Web" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personalInfo.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personalInfo.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Résumé professionnel</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez brièvement votre profil professionnel..." 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Expérience professionnelle - version simplifiée pour la démo */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Expérience professionnelle</h3>
                  <div className="border p-4 rounded-md mb-4">
                    <p className="text-sm text-muted-foreground">
                      Ici, vous pourriez ajouter, modifier ou supprimer vos expériences professionnelles. 
                      Cette fonctionnalité serait complètement interactive avec des formulaires dynamiques.
                    </p>
                  </div>
                </div>

                {/* Formation */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Formation</h3>
                  <div className="border p-4 rounded-md mb-4">
                    <p className="text-sm text-muted-foreground">
                      Section pour gérer vos diplômes et formations académiques.
                    </p>
                  </div>
                </div>

                {/* Compétences */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Compétences</h3>
                  <div className="border p-4 rounded-md mb-4">
                    <p className="text-sm text-muted-foreground">
                      Ajoutez vos compétences techniques et évaluez votre niveau pour chacune d'elles.
                    </p>
                  </div>
                </div>

                <Button type="submit">Prévisualiser le CV</Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="template" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map(template => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </CardContent>
                  <CardFooter className="pt-2">
                    {selectedTemplate === template.id ? (
                      <div className="flex items-center text-primary gap-1">
                        <Check className="h-4 w-4" />
                        <span>Sélectionné</span>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => setSelectedTemplate(template.id)}>
                        Sélectionner
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="style" className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Style visuel</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Couleurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Button className="w-8 h-8 p-0 rounded-full bg-blue-500" />
                        <Button className="w-8 h-8 p-0 rounded-full bg-green-500" />
                        <Button className="w-8 h-8 p-0 rounded-full bg-red-500" />
                        <Button className="w-8 h-8 p-0 rounded-full bg-purple-500" />
                        <Button className="w-8 h-8 p-0 rounded-full bg-gray-800" />
                        <Button variant="outline" className="w-8 h-8 p-0 rounded-full">
                          <Palette className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Choisissez une palette de couleurs pour votre CV ou créez une palette personnalisée.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Typographie</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Roboto</span>
                          <Button variant="ghost" size="sm">Changer</Button>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <Button variant="outline" size="sm" className="text-xs">Normal</Button>
                          <Button variant="outline" size="sm" className="text-xs font-bold">Gras</Button>
                          <Button variant="outline" size="sm" className="text-xs italic">Italique</Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sélectionnez la police et les styles typographiques pour votre CV.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Mise en page</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-auto py-8 flex flex-col gap-2">
                        <div className="w-full flex items-center justify-center">
                          <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                        </div>
                        <div className="w-full flex gap-2">
                          <div className="w-1/3 space-y-2">
                            <div className="w-full h-3 bg-gray-200 rounded"></div>
                            <div className="w-full h-12 bg-gray-200 rounded"></div>
                          </div>
                          <div className="w-2/3 space-y-2">
                            <div className="w-full h-3 bg-gray-200 rounded"></div>
                            <div className="w-full h-12 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <span className="mt-2 text-xs">Une colonne</span>
                      </Button>

                      <Button variant="outline" className="h-auto py-8 flex flex-col gap-2">
                        <div className="w-full flex items-center justify-center">
                          <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                        </div>
                        <div className="w-full flex gap-2">
                          <div className="w-1/3 space-y-2">
                            <div className="w-full h-3 bg-gray-200 rounded"></div>
                            <div className="w-full h-24 bg-gray-200 rounded"></div>
                          </div>
                          <div className="w-2/3 space-y-2">
                            <div className="w-full h-3 bg-gray-200 rounded"></div>
                            <div className="w-full h-24 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <span className="mt-2 text-xs">Deux colonnes</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="p-0">
            <div className="bg-gray-100 dark:bg-gray-800 border-t">
              <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Aperçu du CV</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Copy className="h-4 w-4" />
                    Copier
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Partager
                  </Button>
                  <Button size="sm" className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Optimiser
                  </Button>
                </div>
              </div>
              
              {/* Preview du CV - Version simplifiée pour la démo */}
              <div className="p-8 flex justify-center">
                <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-lg rounded-md p-8 min-h-[800px]">
                  <div className="border-b pb-6 mb-6">
                    <h1 className="text-3xl font-bold">{cvData.personalInfo.fullName}</h1>
                    <h2 className="text-xl text-primary mt-1">{cvData.personalInfo.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                      <span>{cvData.personalInfo.email}</span>
                      <span>{cvData.personalInfo.phone}</span>
                      <span>{cvData.personalInfo.location}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Profil</h3>
                    <p>{cvData.personalInfo.summary}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Expérience professionnelle</h3>
                    {cvData.workExperience.map(exp => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{exp.position}</h4>
                          <div className="text-sm text-muted-foreground">
                            {exp.startDate} — {exp.current ? 'Présent' : exp.endDate}
                          </div>
                        </div>
                        <div className="text-primary">{exp.company}, {exp.location}</div>
                        <p className="mt-1 text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Formation</h3>
                    {cvData.education.map(edu => (
                      <div key={edu.id} className="mb-4">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <div className="text-sm text-muted-foreground">
                            {edu.startDate} — {edu.endDate}
                          </div>
                        </div>
                        <div className="text-primary">{edu.institution}, {edu.location}</div>
                        <p className="mt-1 text-sm">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Compétences</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {cvData.skills.map(skill => (
                        <div key={skill.id} className="flex items-center gap-2">
                          <span>{skill.name}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div 
                                key={i}
                                className={`w-2 h-2 rounded-full mx-0.5 ${i < skill.level ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVGenerator;
