import axios from 'axios';
import { Property, Income, Expense, NetIncome } from '../types';

const API_BASE_URL = '/api-proxy';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

// Add a request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log('API Request:', {
    url: config.url,
    method: config.method,
    data: config.data,
  });
  return config;
});

// Add a response interceptor for better error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error('API Error Request:', error.request);
    } else {
      console.error('API Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export const propertyService = {
  getAll: () => api.get<Property[]>('/properties'),
  getById: (id: number) => api.get<Property>(`/properties/${id}`),
  create: (data: Omit<Property, 'property_id'>) => api.post<Property>('/properties', data),
  update: (id: number, data: Partial<Property>) => api.put<Property>(`/properties/${id}`, data),
  delete: (id: number) => api.delete(`/properties/${id}`),
};

export const incomeService = {
  getByPropertyId: (propertyId: number) => api.get<Income[]>(`/income/${propertyId}`),
  create: (propertyId: number, data: any) => 
    api.post<Income>(`/income/${propertyId}`, data),
  delete: (propertyId: number, incomeId: number) => 
    api.delete(`/properties/${propertyId}/income/${incomeId}`),
};

export const expenseService = {
  getByPropertyId: (propertyId: number) => api.get<Expense[]>(`/expenses/${propertyId}`),
  create: (propertyId: number, data: any) => 
    api.post<Expense>(`/expenses/${propertyId}`, data),
  delete: (propertyId: number, expenseId: number) => 
    api.delete(`/properties/${propertyId}/expenses/${expenseId}`),
};

export const reportService = {
  getNetIncome: (propertyId: number) => api.get<NetIncome>(`/netincome/${propertyId}`),
};

export default api;
