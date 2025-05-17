import axios from 'axios';

interface IkigaiData {
  whatILove: string[];
  whatImGoodAt: string[];
  whatTheWorldNeeds: string[];
  whatICanBePaidFor: string[];
  summary?: string;
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiService = {
  // Single method for both create and update
  saveIkigai: async (data: IkigaiData): Promise<IkigaiData> => {
    try {
      const response = await api.post('/ikigai', data);
      return response.data;
    } catch (error) {
      console.error('Error saving Ikigai data:', error);
      throw error;
    }
  },

  // Get all entries for the current user
  getAllIkigai: async (): Promise<IkigaiData[]> => {
    try {
      const response = await api.get('/ikigai');
      return response.data;
    } catch (error) {
      console.error('Error fetching Ikigai entries:', error);
      throw error;
    }
  },

  // Get a specific entry
  getIkigaiById: async (id: string): Promise<IkigaiData> => {
    try {
      const response = await api.get(`/ikigai/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Ikigai entry:', error);
      throw error;
    }
  },

  // Delete an entry
  deleteIkigai: async (id: string): Promise<void> => {
    try {
      await api.delete(`/ikigai/${id}`);
    } catch (error) {
      console.error('Error deleting Ikigai entry:', error);
      throw error;
    }
  }
};

export default apiService; 