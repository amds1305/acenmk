import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import {
  getAppointmentTypes,
  getAvailableTimeSlots,
  createAppointment,
  getAppointments
} from '@/services/appointmentService';
import { AppointmentType, TimeSlot, Appointment } from '@/types/appointment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppointmentTypeSelector from '@/components/appointment/AppointmentTypeSelector';
import AppointmentDatePicker from '@/components/appointment/AppointmentDatePicker';
import AppointmentTimeSlots from '@/components/appointment/AppointmentTimeSlots';
import AppointmentForm from '@/components/appointment/AppointmentForm';
import AppointmentSummary from '@/components/appointment/AppointmentSummary';
import AppointmentList from '@/components/appointment/AppointmentList';
import { AlertCircle, Calendar, CheckCircle, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

const Appointments = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for appointment booking
  const [selectedType, setSelectedType] = useState<AppointmentType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  // Fetch appointment types
  const { data: appointmentTypes = [] } = useQuery({
    queryKey: ['appointmentTypes'],
    queryFn: getAppointmentTypes,
  });
  
  // Fetch time slots when date and type are selected
  const { 
    data: timeSlots = [], 
    isLoading: isLoadingTimeSlots,
    refetch: refetchTimeSlots
  } = useQuery({
    queryKey: ['timeSlots', selectedDate?.toISOString(), selectedType?.id],
    queryFn: () => {
      if (!selectedDate || !selectedType) return [];
      return getAvailableTimeSlots(selectedDate.toISOString(), selectedType.id);
    },
    enabled: !!selectedDate && !!selectedType,
  });
  
  // Fetch user appointments
  const { 
    data: userAppointments = [],
    refetch: refetchAppointments
  } = useQuery({
    queryKey: ['userAppointments', user?.id],
    queryFn: () => getAppointments(user?.id),
    enabled: !!user?.id,
  });
  
  // Reset slot selection when date or type changes
  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate, selectedType]);
  
  // Handle type selection
  const handleSelectType = (type: AppointmentType) => {
    setSelectedType(type);
    if (selectedDate) {
      refetchTimeSlots();
    }
  };
  
  // Handle date selection
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    if (selectedType) {
      refetchTimeSlots();
    }
  };
  
  // Handle time slot selection
  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };
  
  // Navigate between booking steps
  const handleNextStep = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };
  
  // Handle form submission
  const handleSubmitAppointment = async (formData: any) => {
    if (!selectedType || !selectedDate || !selectedSlot) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez compléter toutes les informations requises.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const appointmentData = {
        userId: user?.id,
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPhone: formData.userPhone,
        date: selectedDate.toISOString(),
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        type: selectedType,
        notes: formData.notes,
      };
      
      await createAppointment(appointmentData);
      
      toast({
        title: "Rendez-vous confirmé !",
        description: "Votre rendez-vous a été enregistré avec succès.",
      });
      
      setBookingComplete(true);
      refetchAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la prise de rendez-vous.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset booking form
  const handleResetBooking = () => {
    setSelectedType(null);
    setSelectedDate(undefined);
    setSelectedSlot(null);
    setBookingStep(1);
    setBookingComplete(false);
  };
  
  return (
    <>
      <Header />
      <main className="min-h-screen py-16 px-4 sm:px-6 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto pt-10 pb-20">
          <h1 className="text-3xl font-bold mb-8">Planifier un rendez-vous</h1>
          
          <Tabs defaultValue="new">
            <TabsList className="mb-8">
              <TabsTrigger value="new" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Nouveau rendez-vous
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Mes rendez-vous
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="new" className="space-y-8">
              {!isAuthenticated && (
                <Alert variant="default" className="my-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    <p>Pour une meilleure expérience, nous vous recommandons de vous connecter avant de prendre rendez-vous.</p>
                    <div className="mt-2">
                      <button
                        onClick={() => navigate('/login')}
                        className="text-primary underline font-medium"
                      >
                        Se connecter
                      </button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {bookingComplete ? (
                <div className="text-center py-12 px-4 sm:px-6 space-y-4">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold">Rendez-vous confirmé !</h2>
                  <p className="text-muted-foreground">
                    Votre rendez-vous a été programmé avec succès. Vous recevrez une confirmation par email.
                  </p>
                  
                  {selectedType && selectedDate && selectedSlot && (
                    <div className="max-w-md mx-auto mt-6 text-left rounded-lg border p-6 bg-card">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{selectedType.name}</p>
                            {selectedType.duration && (
                              <p className="text-sm text-muted-foreground">Durée: {selectedType.duration} min</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">
                              {format(selectedDate, 'EEEE d MMMM yyyy')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">
                              {format(new Date(selectedSlot.startTime), 'HH:mm')} - 
                              {format(new Date(selectedSlot.endTime), 'HH:mm')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <button
                      onClick={handleResetBooking}
                      className="text-primary underline font-medium"
                    >
                      Prendre un autre rendez-vous
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="md:col-span-3 space-y-8">
                    {bookingStep === 1 && (
                      <>
                        <AppointmentTypeSelector
                          types={appointmentTypes}
                          selectedType={selectedType}
                          onSelectType={handleSelectType}
                        />
                        
                        {selectedType && (
                          <div className="mt-8">
                            <AppointmentDatePicker
                              selectedDate={selectedDate}
                              onSelectDate={handleSelectDate}
                            />
                          </div>
                        )}
                        
                        {selectedDate && selectedType && (
                          <div className="mt-8">
                            <AppointmentTimeSlots
                              timeSlots={timeSlots}
                              selectedSlot={selectedSlot}
                              onSelectSlot={handleSelectSlot}
                              isLoading={isLoadingTimeSlots}
                            />
                          </div>
                        )}
                        
                        {selectedSlot && (
                          <div className="flex justify-end mt-8">
                            <button
                              onClick={handleNextStep}
                              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                            >
                              Continuer
                            </button>
                          </div>
                        )}
                      </>
                    )}
                    
                    {bookingStep === 2 && (
                      <>
                        <div className="flex items-center mb-8">
                          <button 
                            onClick={handlePrevStep}
                            className="text-primary hover:underline mr-2"
                          >
                            Retour
                          </button>
                          <h3 className="text-lg font-medium">Finaliser votre rendez-vous</h3>
                        </div>
                        
                        <AppointmentForm
                          onSubmit={handleSubmitAppointment}
                          isSubmitting={isSubmitting}
                        />
                      </>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="sticky top-24">
                      <AppointmentSummary
                        selectedType={selectedType}
                        selectedDate={selectedDate}
                        selectedSlot={selectedSlot}
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="upcoming">
              <AppointmentList 
                appointments={userAppointments}
                refreshAppointments={refetchAppointments}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Appointments;
