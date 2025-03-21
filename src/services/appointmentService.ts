
import { Appointment, AppointmentType, TimeSlot } from '@/types/appointment';
import { v4 as uuidv4 } from 'uuid';

// Mock data for appointment types
const appointmentTypes: AppointmentType[] = [
  {
    id: '1',
    name: 'Consultation initiale',
    description: 'Première rencontre pour discuter de votre projet',
    duration: 60,
    price: 100,
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'Suivi de projet',
    description: 'Point d\'avancement sur votre projet en cours',
    duration: 30,
    price: 50,
    color: 'bg-green-500',
  },
  {
    id: '3',
    name: 'Support technique',
    description: 'Assistance pour résoudre des problèmes techniques',
    duration: 45,
    price: 75,
    color: 'bg-yellow-500',
  },
];

// Mock data for appointments
let appointments: Appointment[] = [];

// Local storage keys
const APPOINTMENTS_KEY = 'appointments';
const APPOINTMENT_TYPES_KEY = 'appointmentTypes';

// Initialize data from localStorage
const initializeData = () => {
  try {
    const storedAppointments = localStorage.getItem(APPOINTMENTS_KEY);
    if (storedAppointments) {
      appointments = JSON.parse(storedAppointments);
    }
    
    const storedAppointmentTypes = localStorage.getItem(APPOINTMENT_TYPES_KEY);
    if (!storedAppointmentTypes) {
      // Initialize appointment types in localStorage
      localStorage.setItem(APPOINTMENT_TYPES_KEY, JSON.stringify(appointmentTypes));
    }
  } catch (error) {
    console.error('Error initializing appointment data:', error);
  }
};

// Call initializeData when the service is imported
initializeData();

// Helper function to save appointments to localStorage
const saveAppointments = () => {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
};

// Get all appointment types
export const getAppointmentTypes = async (): Promise<AppointmentType[]> => {
  try {
    const storedTypes = localStorage.getItem(APPOINTMENT_TYPES_KEY);
    return storedTypes ? JSON.parse(storedTypes) : appointmentTypes;
  } catch (error) {
    console.error('Error getting appointment types:', error);
    return appointmentTypes;
  }
};

// Get available time slots for a specific date
export const getAvailableTimeSlots = async (date: string, typeId: string): Promise<TimeSlot[]> => {
  try {
    // Get the appointment type to determine duration
    const types = await getAppointmentTypes();
    const appointmentType = types.find(type => type.id === typeId);
    
    if (!appointmentType) {
      throw new Error('Appointment type not found');
    }
    
    const duration = appointmentType.duration;
    
    // Generate time slots for the business hours (9 AM to 5 PM)
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 17;
    
    // Convert the date string to a Date object for the selected date
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();
    
    // Get appointments for this date
    const dateAppointments = appointments.filter(app => {
      const appDate = new Date(app.date);
      return appDate.getFullYear() === year && 
             appDate.getMonth() === month && 
             appDate.getDate() === day;
    });
    
    // Create time slots in increments of 30 minutes
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = new Date(year, month, day, hour, minute);
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + duration);
        
        // Skip if end time is past business hours
        if (endTime.getHours() > endHour || 
            (endTime.getHours() === endHour && endTime.getMinutes() > 0)) {
          continue;
        }
        
        // Check if the slot overlaps with any existing appointment
        const isAvailable = !dateAppointments.some(app => {
          const appStart = new Date(app.startTime);
          const appEnd = new Date(app.endTime);
          
          // Check for overlap
          return (startTime < appEnd && endTime > appStart);
        });
        
        slots.push({
          id: uuidv4(),
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          available: isAvailable
        });
      }
    }
    
    return slots;
  } catch (error) {
    console.error('Error getting available time slots:', error);
    return [];
  }
};

// Create a new appointment
export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Appointment> => {
  try {
    const now = new Date().toISOString();
    const newAppointment: Appointment = {
      ...appointment,
      id: uuidv4(),
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };
    
    appointments.push(newAppointment);
    saveAppointments();
    
    return newAppointment;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Get all appointments
export const getAppointments = async (userId?: string): Promise<Appointment[]> => {
  try {
    if (userId) {
      return appointments.filter(app => app.userId === userId);
    }
    return appointments;
  } catch (error) {
    console.error('Error getting appointments:', error);
    return [];
  }
};

// Get appointment by ID
export const getAppointmentById = async (id: string): Promise<Appointment | null> => {
  try {
    const appointment = appointments.find(app => app.id === id);
    return appointment || null;
  } catch (error) {
    console.error('Error getting appointment by ID:', error);
    return null;
  }
};

// Update appointment status
export const updateAppointmentStatus = async (id: string, status: AppointmentStatus): Promise<Appointment | null> => {
  try {
    const index = appointments.findIndex(app => app.id === id);
    if (index === -1) return null;
    
    appointments[index] = {
      ...appointments[index],
      status,
      updatedAt: new Date().toISOString()
    };
    
    saveAppointments();
    return appointments[index];
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return null;
  }
};

// Cancel appointment
export const cancelAppointment = async (id: string): Promise<boolean> => {
  return updateAppointmentStatus(id, 'canceled')
    .then(result => !!result)
    .catch(() => false);
};
