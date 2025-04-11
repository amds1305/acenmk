
import React from 'react';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { CVFormData } from './types';

interface CVFormProps {
  defaultValues: CVFormData;
  onSubmit: (data: CVFormData) => void;
}

const CVForm = ({ defaultValues, onSubmit }: CVFormProps) => {
  const form = useForm<CVFormData>({
    defaultValues
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = 
    useFieldArray({ control: form.control, name: "workExperience" });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = 
    useFieldArray({ control: form.control, name: "education" });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = 
    useFieldArray({ control: form.control, name: "skills" });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Input type="email" placeholder="email@exemple.com" {...field} />
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
                    <Input placeholder="+33 6 12 34 56 78" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localisation</FormLabel>
                  <FormControl>
                    <Input placeholder="Paris, France" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site web</FormLabel>
                  <FormControl>
                    <Input placeholder="www.monsite.com" {...field} />
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

        {/* Expérience professionnelle */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Expérience professionnelle</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendExperience({
                id: crypto.randomUUID(),
                position: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                description: ""
              })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>
          
          {experienceFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name={`workExperience.${index}.position`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poste</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Développeur Frontend" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`workExperience.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entreprise</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de l'entreprise" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`workExperience.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez vos responsabilités et réalisations..." 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-red-500 hover:text-red-700"
                      onClick={() => removeExperience(index)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </FormItem>
                )}
              />
            </div>
          ))}
          
          {experienceFields.length === 0 && (
            <div className="text-center border border-dashed p-6 rounded-md">
              <p className="text-sm text-gray-500">Cliquez sur "Ajouter" pour inclure une expérience professionnelle</p>
            </div>
          )}
        </div>

        {/* Formation */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Formation</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendEducation({
                id: crypto.randomUUID(),
                degree: "",
                institution: "",
                location: "",
                startDate: "",
                endDate: "",
                description: ""
              })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>
          
          {educationFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diplôme</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Master en Informatique" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.institution`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Établissement</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de l'école ou université" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 text-red-500 hover:text-red-700"
                onClick={() => removeEducation(index)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Supprimer
              </Button>
            </div>
          ))}
          
          {educationFields.length === 0 && (
            <div className="text-center border border-dashed p-6 rounded-md">
              <p className="text-sm text-gray-500">Cliquez sur "Ajouter" pour inclure une formation</p>
            </div>
          )}
        </div>

        {/* Compétences */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Compétences</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSkill({
                id: crypto.randomUUID(),
                name: "",
                level: 3
              })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`skills.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="ex: React" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
          
          {skillFields.length === 0 && (
            <div className="text-center border border-dashed p-6 rounded-md">
              <p className="text-sm text-gray-500">Cliquez sur "Ajouter" pour inclure une compétence</p>
            </div>
          )}
        </div>

        <Button type="submit">Prévisualiser le CV</Button>
      </form>
    </Form>
  );
};

export default CVForm;
