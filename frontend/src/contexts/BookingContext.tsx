import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Vehicle, VehicleType } from '../services/api';

interface BookingContextType {
  step: number;
  setStep: (step: number) => void;
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  wheelCount: number | null;
  setWheelCount: (count: number | null) => void;
  vehicleType: VehicleType | null;
  setVehicleType: (type: VehicleType | null) => void;
  vehicle: Vehicle | null;
  setVehicle: (vehicle: Vehicle | null) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  resetForm: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [wheelCount, setWheelCount] = useState<number | null>(null);
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const resetForm = () => {
    setStep(1);
    setFirstName('');
    setLastName('');
    setWheelCount(null);
    setVehicleType(null);
    setVehicle(null);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <BookingContext.Provider
      value={{
        step,
        setStep,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        wheelCount,
        setWheelCount,
        vehicleType,
        setVehicleType,
        vehicle,
        setVehicle,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        resetForm,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
