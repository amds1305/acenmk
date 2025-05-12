
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  service?: string;
  source?: string;
  description: string;
  status: 'new' | 'in-progress' | 'processed' | 'archived';
  tags: string[];
  assignedTo?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadInteraction {
  id: string;
  lead_id: string;
  user_id: string;
  user_name: string;
  type: 'note' | 'email' | 'call' | 'meeting' | 'task';
  content: string;
  created_at: string;
}

export interface LeadTag {
  id: string;
  name: string;
  color: string;
}

export interface LeadTask {
  id: string;
  lead_id: string;
  title: string;
  description?: string;
  due_date?: string;
  status: 'pending' | 'completed' | 'canceled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadFilter {
  search?: string;
  status?: string;
  tags?: string[];
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface LeadStats {
  total: number;
  newLeads: number;
  inProgressLeads: number;
  processedLeads: number;
  archivedLeads: number;
  conversionRate: number;
  responseTime: number;
}
