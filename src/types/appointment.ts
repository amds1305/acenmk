
export type AppointmentStatus = 'pending' | 'confirmed' | 'canceled' | 'completed';

export type TimeSlot = {
  id: string;
  startTime: string; // Format ISO
  endTime: string;   // Format ISO
  available: boolean;
};

export type AppointmentType = {
  id: string;
  name: string;
  description: string;
  duration: number; // Duration in minutes
  price?: number;
  color?: string;
};

export interface Appointment {
  id: string;
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  date: string; // Format ISO
  startTime: string; // Format ISO
  endTime: string;   // Format ISO
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string; // Format ISO
  updatedAt: string; // Format ISO
}
