
// Helper functions for the Profile page

/**
 * Gets the appropriate CSS color class for a status
 */
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-500';
    case 'in-progress': return 'bg-blue-500';
    case 'completed': return 'bg-green-500';
    case 'approved': return 'bg-green-500';
    case 'rejected': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

/**
 * Gets the translated status text
 */
export const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'En attente';
    case 'in-progress': return 'En cours';
    case 'completed': return 'Terminé';
    case 'approved': return 'Approuvé';
    case 'rejected': return 'Rejeté';
    default: return status;
  }
};

/**
 * Formats a date string to the French locale format
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

/**
 * Formats a number as a currency amount in EUR
 */
export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};
