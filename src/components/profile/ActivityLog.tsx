
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoginHistory } from '@/types/auth';
import { History, Check, X, AlertTriangle } from 'lucide-react';

interface ActivityLogProps {
  loginHistory: LoginHistory[];
  formatDate: (dateString: string) => string;
}

const ActivityLog = ({ loginHistory, formatDate }: ActivityLogProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Journal d'activité
        </CardTitle>
        <CardDescription>
          Historique des connexions à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loginHistory.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Appareil</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Adresse IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.sort((a, b) => 
                new Date(b.timestamp || b.date || '').getTime() - new Date(a.timestamp || a.date || '').getTime()
              ).map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {entry.success ? (
                        <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 p-1 rounded-full">
                          <Check className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 p-1 rounded-full">
                          <X className="h-4 w-4" />
                        </div>
                      )}
                      {entry.success ? 'Réussi' : 'Échec'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(entry.timestamp || entry.date || '')}
                    <div className="text-xs text-muted-foreground">
                      {new Date(entry.timestamp || entry.date || '').toLocaleTimeString('fr-FR')}
                    </div>
                  </TableCell>
                  <TableCell>{entry.device || entry.deviceInfo || ''}</TableCell>
                  <TableCell>{entry.location || 'Inconnu'}</TableCell>
                  <TableCell>{entry.ipAddress || entry.ip || ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun historique de connexion disponible</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
