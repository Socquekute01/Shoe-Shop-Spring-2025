import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Thêm interceptor để tự động thêm token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý lỗi global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xử lý logout khi token hết hạn
      localStorage.removeItem("accessToken");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default {
  // Authentication
  login: (data) => api.post("/login", data),
  register: (data) => api.post("/register", data),
  getMe: (id) => api.get(`/customer/detail/${id}`),
  logout: () => api.post(`/logout`),

  // Admin
  getDashboardStats: () => api.get("/api/admin/stats"),
  getOrders: (params) => api.get("/api/orders", { params }),
  getProducts: (params) => api.get("/api/products", { params }),

  // User
  // updateProfile: (data) => api.put("/api/users/me", data),
  getCart: () => api.get("/api/carts"),
  updateCart: (data) => api.put("/api/carts", data),

  // User management endpoints
  getUsers: () => api.get("/customer"),
  getUserById: (id) => api.get(`/customer/detail/${id}`),
  updateUserById: (id, userData) => api.put(`/customer/detail/${id}`, userData),
  deleteUserById: (id) => api.delete(`/customer/delete/${id}`),
};
