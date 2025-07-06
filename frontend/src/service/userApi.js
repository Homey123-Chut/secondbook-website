import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

// Register a new user
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data;
};

// Login user
export const loginUser = async (loginData) => {
  const res = await axios.post(`${API_URL}/login`, loginData);
  return res.data;
};

// Get user profile by ID
export const fetchUserProfile = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Update user profile
export const updateUserProfile = async (id, profileData) => {
  const res = await axios.put(`${API_URL}/${id}`, profileData);
  return res.data;
};

// Delete user
export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};