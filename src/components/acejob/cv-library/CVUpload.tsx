import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  params: {
    id: string;
  };
};

export default function CVUpload({ params }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [cvs, setCvs] = useState([
    {
      id: "1",
      name: "CV 1",
    },
    {
      id: "2",
      name: "CV 2",
    },
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>Loading</>;
  }

  return (
    <div className="container max-w-7xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Candidature Spontanée</CardTitle>
          <CardDescription>
            Ajouter une candidature à la librairie de CVs
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" placeholder="Nom de la candidature" type="text" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Ajouter</Button>
          <Button variant="outline" className="w-full" asChild>
            <a href="#">Liste des candidatures</a>
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-10">
        <Table>
          <TableCaption>
            Liste des candidatures spontanées ({cvs.length})
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cvs.map((cv) => (
              <TableRow key={cv.id}>
                <TableCell className="font-medium">{cv.id}</TableCell>
                <TableCell>{cv.name}</TableCell>
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Supprimer
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Etes vous sur ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Cette action est irreversible. Etes vous sur de vouloir
                          supprimer cette candidature ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction>Supprimer</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
