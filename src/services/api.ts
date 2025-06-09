
import axios from 'axios';

const API_BASE_URL = 'https://logistics-management-1-0eul.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product API calls
export const productApi = {
  getAllProducts: () => api.get('/products'),
  getProductById: (id: string) => api.get(`/products/${id}`),
  createProduct: (product: any) => api.post('/products', product),
  updateProduct: (id: string, product: any) => api.put(`/products/${id}`, product),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  trackProduct: (barcode: string) => api.get(`/products/track/${barcode}`),
};

// Inventory API calls
export const inventoryApi = {
  getAllInventory: () => api.get('/inventory'),
  getInventoryById: (id: string) => api.get(`/inventory/${id}`),
  updateStock: (id: string, quantity: number) => api.patch(`/inventory/${id}/stock`, { quantity }),
  getLowStockItems: () => api.get('/inventory/low-stock'),
  getExpiringItems: () => api.get('/inventory/expiring'),
};

// Feedback API calls
export const feedbackApi = {
  getAllFeedback: () => api.get('/feedback'),
  createFeedback: (feedback: any) => api.post('/feedback', feedback),
  getFeedbackByProduct: (productId: string) => api.get(`/feedback/product/${productId}`),
  getFeedbackStats: () => api.get('/feedback/stats'),
};

// Analytics API calls
export const analyticsApi = {
  getDashboardMetrics: () => api.get('/analytics/dashboard'),
  getProductMovement: () => api.get('/analytics/movement'),
  getExpiryAlerts: () => api.get('/analytics/expiry-alerts'),
  getDefectTracing: () => api.get('/analytics/defects'),
};

// User/Auth API calls
export const authApi = {
  login: (credentials: { email: string; password: string; role?: string }) => api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout'),
};

export default api;
