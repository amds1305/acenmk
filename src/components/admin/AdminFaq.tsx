
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash, Save, EyeIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const INITIAL_FAQS = [
  {
    id: '1',
    question: 'Quels types de projets développez-vous ?',
    answer: 'Nous développons une large gamme de solutions numériques, des sites web et applications mobiles aux systèmes d\'entreprise complexes et solutions e-commerce. Notre expertise couvre le développement front-end, back-end, mobile et cloud.',
    category: 'Services',
  },
  {
    id: '2',
    question: 'Quelles technologies utilisez-vous pour vos projets ?',
    answer: 'Nous utilisons les technologies les plus récentes et adaptées à chaque projet spécifique. Cela inclut React, Vue.js, Node.js, Python, Java, .NET, ainsi que des solutions cloud comme AWS, Google Cloud et Azure. Nous choisissons toujours les technologies en fonction des besoins spécifiques de chaque client.',
    category: 'Technologies',
  },
  {
    id: '3',
    question: 'Comment se déroule un projet type avec votre équipe ?',
    answer: 'Notre processus commence par une phase de découverte où nous comprenons vos besoins et objectifs. Ensuite, nous passons à la conception et au prototypage, suivis du développement et des tests. Après le lancement, nous offrons un support continu et des mises à jour. Tout au long du projet, nous maintenons une communication transparente et des points d\'étape réguliers.',
    category: 'Processus',
  },
  {
    id: '4',
    question: 'Combien coûte un projet de développement ?',
    answer: 'Le coût varie considérablement en fonction de la complexité, de l\'échelle et des fonctionnalités requises. Nous proposons des devis personnalisés après avoir compris vos besoins spécifiques. Nos tarifs sont transparents et compétitifs, avec différentes options pour s\'adapter à divers budgets.',
    category: 'Tarifs',
  },
  {
    id: '5',
    question: 'Proposez-vous des services de maintenance après le lancement ?',
    answer: 'Oui, nous offrons des services de maintenance continue et de support technique après le lancement. Nos forfaits de maintenance incluent les mises à jour de sécurité, la correction de bugs, les petites améliorations et l\'assistance technique régulière pour garantir que votre solution reste performante et à jour.',
    category: 'Support',
  },
  {
    id: '6',
    question: 'Combien de temps faut-il pour développer un projet ?',
    answer: 'La durée de développement dépend de la complexité et de l\'ampleur du projet. Un site web vitrine peut prendre 4-6 semaines, tandis qu\'une application complexe peut nécessiter plusieurs mois. Nous établissons un calendrier réaliste au début du projet et vous tenons informé de l\'avancement.',
    category: 'Processus',
  },
];

const FAQ_CATEGORIES = ['Services', 'Technologies', 'Processus', 'Tarifs', 'Support', 'Général'];

const AdminFaq = () => {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [editingFaq, setEditingFaq] = useState<null | typeof INITIAL_FAQS[0] & { isNew?: boolean }>(null);
  const [faqToDelete, setFaqToDelete] = useState<null | { id: string, question: string }>(null);
  
  const [sectionSettings, setSectionSettings] = useState({
    title: 'Questions Fréquentes',
    subtitle: 'Trouvez des réponses aux questions les plus courantes sur nos services et notre façon de travailler',
  });

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === faqs.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newFaqs = [...faqs];
    [newFaqs[index], newFaqs[newIndex]] = [newFaqs[newIndex], newFaqs[index]];
    setFaqs(newFaqs);
  };

  const handleEdit = (faq: typeof editingFaq) => {
    setEditingFaq(faq);
  };

  const handleSaveFaq = () => {
    if (!editingFaq) return;
    
    const newFaqs = [...faqs];
    
    if (editingFaq.isNew) {
      newFaqs.push({
        ...editingFaq,
        id: Date.now().toString(),
      });
    } else {
      const index = newFaqs.findIndex(f => f.id === editingFaq.id);
      if (index !== -1) {
        newFaqs[index] = editingFaq;
      }
    }
    
    setFaqs(newFaqs);
    setEditingFaq(null);
    
    toast({
      title: editingFaq.isNew ? "Question ajoutée" : "Question mise à jour",
      description: editingFaq.isNew 
        ? "La nouvelle question a été ajoutée avec succès." 
        : "La question a été mise à jour avec succès.",
    });
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    setFaqToDelete(null);
    
    toast({
      title: "Question supprimée",
      description: "La question a été supprimée avec succès.",
    });
  };

  const handleSaveSection = () => {
    // Ici nous sauvegarderions normalement les données vers une API
    console.log('Section settings', sectionSettings);
    console.log('FAQs', faqs);
    
    toast({
      title: "Modifications enregistrées",
      description: "La section FAQ a été mise à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">FAQ</h1>
          <p className="text-muted-foreground">
            Gérez les questions fréquemment posées qui apparaissent sur votre site.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.open('/faq', '_blank')}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Voir
          </Button>
          <Button onClick={handleSaveSection}>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de la section</CardTitle>
          <CardDescription>Personnalisez le titre et le sous-titre de la section FAQ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="section-title">Titre</Label>
            <Input 
              id="section-title" 
              value={sectionSettings.title} 
              onChange={(e) => setSectionSettings({...sectionSettings, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section-subtitle">Sous-titre</Label>
            <Textarea 
              id="section-subtitle" 
              value={sectionSettings.subtitle} 
              onChange={(e) => setSectionSettings({...sectionSettings, subtitle: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Liste des questions</h2>
        <Button 
          onClick={() => handleEdit({ 
            id: '', 
            question: '', 
            answer: '', 
            category: 'Général',
            isNew: true 
          })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une question
        </Button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={faq.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="font-medium text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground mt-2">{faq.answer}</p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="ghost" size="icon" onClick={() => handleMove(index, 'up')} disabled={index === 0}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleMove(index, 'down')} disabled={index === faqs.length - 1}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 pt-4 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(faq)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setFaqToDelete({ id: faq.id, question: faq.question })}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogDescription>
                          Êtes-vous sûr de vouloir supprimer la question "{faqToDelete?.question}" ? Cette action est irréversible.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setFaqToDelete(null)}>
                          Annuler
                        </Button>
                        <Button variant="destructive" onClick={() => faqToDelete && handleDeleteFaq(faqToDelete.id)}>
                          Supprimer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for editing FAQs */}
      <Dialog
        open={editingFaq !== null}
        onOpenChange={(open) => !open && setEditingFaq(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingFaq?.isNew ? 'Ajouter une question' : 'Modifier la question'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="faq-category">Catégorie</Label>
              <select
                id="faq-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={editingFaq?.category || 'Général'}
                onChange={(e) => setEditingFaq(prev => prev ? {...prev, category: e.target.value} : null)}
              >
                {FAQ_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="faq-question">Question</Label>
              <Input 
                id="faq-question" 
                value={editingFaq?.question || ''} 
                onChange={(e) => setEditingFaq(prev => prev ? {...prev, question: e.target.value} : null)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="faq-answer">Réponse</Label>
              <Textarea 
                id="faq-answer" 
                value={editingFaq?.answer || ''} 
                onChange={(e) => setEditingFaq(prev => prev ? {...prev, answer: e.target.value} : null)}
                className="min-h-[150px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingFaq(null)}>
              Annuler
            </Button>
            <Button onClick={handleSaveFaq}>
              {editingFaq?.isNew ? 'Ajouter' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFaq;
