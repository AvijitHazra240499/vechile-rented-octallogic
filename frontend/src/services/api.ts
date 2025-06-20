import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface VehicleType {
  id: number;
  name: string;
  wheelCount: number;
}

export interface Vehicle {
  id: number;
  model: string;
  available: boolean;
  VehicleType?: VehicleType;
}

export const getVehicleTypes = async (): Promise<VehicleType[]> => {
  const response = await axios.get(`${API_BASE_URL}/vehicle-types`);
  return response.data;
};

export const getVehiclesByType = async (typeId: number): Promise<Vehicle[]> => {
  const response = await axios.get(`${API_BASE_URL}/vehicles/type/${typeId}`);
  return response.data;
};

export const checkVehicleAvailability = async (
  vehicleId: number,
  startDate: string,
  endDate: string
): Promise<{ available: boolean }> => {
  const response = await axios.get(`${API_BASE_URL}/vehicles/check-availability`, {
    params: { vehicleId, startDate, endDate },
  });
  return response.data;
};

export const createBooking = async (bookingData: {
  firstName: string;
  lastName: string;
  vehicleId: number;
  startDate: string;
  endDate: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
  return response.data;
};
