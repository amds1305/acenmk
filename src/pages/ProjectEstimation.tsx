
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z.string().min(10, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }),
  companyName: z.string().optional(),
  projectType: z.string({
    required_error: "Veuillez sélectionner un type de projet.",
  }),
  budget: z.string({
    required_error: "Veuillez sélectionner une fourchette de budget.",
  }),
  timeframe: z.string({
    required_error: "Veuillez sélectionner un délai.",
  }),
  description: z.string().min(20, {
    message: "La description doit contenir au moins 20 caractères.",
  }),
  services: z.array(z.string()).nonempty({
    message: "Veuillez sélectionner au moins un service.",
  }),
  complexity: z.number(),
  newsletter: z.boolean().default(false),
});

const services = [
  {
    id: "web-design",
    label: "Design Web",
  },
  {
    id: "web-dev",
    label: "Développement Web",
  },
  {
    id: "mobile-dev",
    label: "Développement Mobile",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
  },
  {
    id: "cms",
    label: "CMS / Wordpress",
  },
  {
    id: "seo",
    label: "SEO / Marketing",
  },
];

const ProjectEstimation = () => {
  const { toast } = useToast();
  const [estimationResult, setEstimationResult] = useState<{
    price: string;
    duration: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      description: "",
      services: [],
      complexity: 5,
      newsletter: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Calcul basique d'estimation de projet
    // Dans une vraie application, cela serait plus complexe et pourrait être fait côté serveur
    const basePrice = 1000;
    let priceMultiplier = 1;
    
    // Augmente le prix en fonction du type de projet
    switch (values.projectType) {
      case "website":
        priceMultiplier *= 1;
        break;
      case "webapp":
        priceMultiplier *= 1.5;
        break;
      case "ecommerce":
        priceMultiplier *= 2;
        break;
      case "mobile":
        priceMultiplier *= 1.8;
        break;
      default:
        priceMultiplier *= 1;
    }
    
    // Augmente le prix en fonction du nombre de services
    priceMultiplier += values.services.length * 0.15;
    
    // Ajuste le prix en fonction de la complexité
    priceMultiplier += (values.complexity - 5) * 0.1;
    
    // Calculer le prix estimé
    const estimatedPrice = Math.round(basePrice * priceMultiplier);
    const lowerEstimate = Math.round(estimatedPrice * 0.8);
    const higherEstimate = Math.round(estimatedPrice * 1.2);
    
    // Calculer le délai estimé
    let baseDuration = 2; // en semaines
    switch (values.timeframe) {
      case "urgent":
        baseDuration *= 0.8;
        break;
      case "normal":
        baseDuration *= 1;
        break;
      case "relaxed":
        baseDuration *= 1.2;
        break;
      default:
        baseDuration *= 1;
    }
    
    // Ajuster la durée en fonction de la complexité et du nombre de services
    baseDuration += (values.complexity / 10) * 2;
    baseDuration += values.services.length * 0.5;
    
    const durationInWeeks = Math.round(baseDuration);
    
    setEstimationResult({
      price: `${lowerEstimate} € - ${higherEstimate} €`,
      duration: `${durationInWeeks} semaine${durationInWeeks > 1 ? 's' : ''}`,
    });
    
    toast({
      title: "Estimation générée avec succès",
      description: "Nous avons créé une estimation basée sur vos besoins.",
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Estimation de votre projet</h1>
            <p className="text-xl text-muted-foreground">
              Obtenez une estimation rapide et gratuite de votre projet digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Comment ça fonctionne ?
                </h2>
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      1
                    </span>
                    <p>Remplissez le formulaire avec les détails de votre projet</p>
                  </li>
                  <li className="flex">
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      2
                    </span>
                    <p>Notre algorithme calcule une estimation approximative</p>
                  </li>
                  <li className="flex">
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      3
                    </span>
                    <p>Recevez votre estimation instantanément</p>
                  </li>
                  <li className="flex">
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      4
                    </span>
                    <p>Nous vous contactons pour affiner les détails si nécessaire</p>
                  </li>
                </ul>
              </div>

              {estimationResult && (
                <div className="bg-primary/10 rounded-lg p-6 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-4">Votre estimation</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-primary" />
                        Durée estimée:
                      </span>
                      <span className="font-semibold">{estimationResult.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-primary" />
                        Budget estimé:
                      </span>
                      <span className="font-semibold">{estimationResult.price}</span>
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-muted-foreground">
                    <p>* Cette estimation est indicative et peut varier en fonction des spécificités de votre projet.</p>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <a href="/#contact">
                      Discuter avec un expert
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean Dupont" {...field} />
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
                            <Input placeholder="jean@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input placeholder="06 12 34 56 78" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entreprise (optionnel)</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom de votre entreprise" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de projet</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type de projet" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="website">Site vitrine</SelectItem>
                            <SelectItem value="webapp">Application web</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="mobile">Application mobile</SelectItem>
                            <SelectItem value="redesign">Refonte de site</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Budget approximatif" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="small">Moins de 5 000 €</SelectItem>
                              <SelectItem value="medium">5 000 € - 10 000 €</SelectItem>
                              <SelectItem value="large">10 000 € - 25 000 €</SelectItem>
                              <SelectItem value="enterprise">Plus de 25 000 €</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeframe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Délai souhaité</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Délai approximatif" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="urgent">Urgent (&lt; 1 mois)</SelectItem>
                              <SelectItem value="normal">Normal (1-3 mois)</SelectItem>
                              <SelectItem value="relaxed">Flexible (&gt; 3 mois)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="services"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Services requis</FormLabel>
                          <FormDescription>
                            Sélectionnez tous les services dont vous avez besoin.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {services.map((service) => (
                            <FormField
                              key={service.id}
                              control={form.control}
                              name="services"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={service.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(service.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, service.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== service.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {service.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="complexity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complexité du projet</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <Slider
                              min={1}
                              max={10}
                              step={1}
                              defaultValue={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Simple</span>
                              <span>Complexe</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description du projet</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Décrivez votre projet en quelques lignes..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            S'inscrire à la newsletter
                          </FormLabel>
                          <FormDescription>
                            Recevez des conseils et astuces sur les projets digitaux.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Générer mon estimation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectEstimation;
