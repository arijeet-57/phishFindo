import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Analyze content
  analyze: async (content, file = null) => {
    const formData = new FormData();
    formData.append('content', content || '');
    if (file) {
      formData.append('file', file);
    }

    const response = await axios.post(`${API_URL}/api/analyze`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Get scan history
  getHistory: async () => {
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
  },

  // Get single scan by ID
  getScan: async (id) => {
    const response = await axios.get(`${API_URL}/scan/${id}`);
    return response.data;
  }
};