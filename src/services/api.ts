// API service for Strava data fetching
import axios from 'axios';

// API base URL - change this to your deployed backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Authentication API
export const authAPI = {
  // Check authentication status
  getStatus: async () => {
    try {
      const response = await api.get('/auth/status');
      return response.data;
    } catch (error) {
      console.error('Auth status error:', error);
      return { authenticated: false };
    }
  },

  // Get login URL
  getLoginUrl: () => `${API_BASE_URL}/auth/login`,

  // Logout
  logout: async () => {
    try {
      const response = await api.get('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
};

// Athlete API
export const athleteAPI = {
  // Get athlete profile
  getProfile: async () => {
    try {
      const response = await api.get('/athlete/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // Get athlete stats
  getStats: async () => {
    try {
      const response = await api.get('/athlete/stats');
      return response.data;
    } catch (error) {
      console.error('Get stats error:', error);
      throw error;
    }
  }
};

// Activities API
export const activitiesAPI = {
  // Get all activities with pagination
  getActivities: async (params = {}) => {
    try {
      const response = await api.get('/activities', { params });
      return response.data;
    } catch (error) {
      console.error('Get activities error:', error);
      throw error;
    }
  },

  // Get activity by ID
  getActivity: async (id: string) => {
    try {
      const response = await api.get(`/activities/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get activity ${id} error:`, error);
      throw error;
    }
  },

  // Get yearly stats
  getYearlyStats: async () => {
    try {
      const response = await api.get('/activities/stats/yearly');
      return response.data;
    } catch (error) {
      console.error('Get yearly stats error:', error);
      throw error;
    }
  }
};

// Segments API
export const segmentsAPI = {
  // Get starred segments
  getStarredSegments: async (params = {}) => {
    try {
      const response = await api.get('/segments/starred', { params });
      return response.data;
    } catch (error) {
      console.error('Get starred segments error:', error);
      throw error;
    }
  },

  // Get segment by ID
  getSegment: async (id: string) => {
    try {
      const response = await api.get(`/segments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get segment ${id} error:`, error);
      throw error;
    }
  },

  // Get segment efforts
  getSegmentEfforts: async (id: string, params = {}) => {
    try {
      const response = await api.get(`/segments/${id}/efforts`, { params });
      return response.data;
    } catch (error) {
      console.error(`Get segment ${id} efforts error:`, error);
      throw error;
    }
  },

  // Get all segments from activities
  getSegmentsFromActivities: async () => {
    try {
      const response = await api.get('/segments/from-activities');
      return response.data;
    } catch (error) {
      console.error('Get segments from activities error:', error);
      throw error;
    }
  }
};

export default {
  auth: authAPI,
  athlete: athleteAPI,
  activities: activitiesAPI,
  segments: segmentsAPI
};
