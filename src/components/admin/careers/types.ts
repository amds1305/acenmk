
export interface Job {
  id: string;
  title: string;
  type: 'full-time' | 'part-time' | 'remote' | 'hybrid';
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

export const typesOptions = [
  { value: 'full-time', label: 'Temps plein' },
  { value: 'part-time', label: 'Temps partiel' },
  { value: 'remote', label: 'Télétravail' },
  { value: 'hybrid', label: 'Hybride' },
];

export const emptyJob: Job = {
  id: '',
  title: '',
  type: 'full-time',
  location: '',
  department: '',
  description: '',
  responsibilities: [],
  requirements: [],
  postedDate: '',
};
