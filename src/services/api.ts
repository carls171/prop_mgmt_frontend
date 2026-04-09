import axios from 'axios';
import { Property, Income, Expense, NetIncome } from '../types';

const API_BASE_URL = import.meta.env.DEV 
  ? '/api-proxy' 
  : 'https://prop-mgmt-api-1064799326078.us-central1.run.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

export const propertyService = {
  getAll: () => api.get<Property[]>('/properties'),
  getById: (id: number) => api.get<Property>(`/properties/${id}`),
  create: (data: Omit<Property, 'property_id'>) => api.post<Property>('/properties', data),
  update: (id: number, data: Partial<Property>) => api.put<Property>(`/properties/${id}`, data),
  delete: (id: number) => api.delete(`/properties/${id}`),
};

export const incomeService = {
  getByPropertyId: (propertyId: number) => api.get<Income[]>(`/income/${propertyId}`),
  create: (propertyId: number, data: Omit<Income, 'income_id' | 'property_id'>) => 
    api.post<Income>(`/income/${propertyId}`, data),
  delete: (propertyId: number, incomeId: number) => 
    api.delete(`/properties/${propertyId}/income/${incomeId}`),
};

export const expenseService = {
  getByPropertyId: (propertyId: number) => api.get<Expense[]>(`/expenses/${propertyId}`),
  create: (propertyId: number, data: Omit<Expense, 'expense_id' | 'property_id'>) => 
    api.post<Expense>(`/expenses/${propertyId}`, data),
};

export const reportService = {
  getNetIncome: (propertyId: number) => api.get<NetIncome>(`/netincome/${propertyId}`),
};

export default api;
