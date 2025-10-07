// src/api/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const api = {
  createUser: async (user) => {
    const res = await axios.post(`${BASE_URL}/users`, user);
    return res.data;
  },
  createSchool: async (school) => {
    const res = await axios.post(`${BASE_URL}/schools`, school);
    return res.data;
  },
  createStudent: async (student) => {
    const res = await axios.post(`${BASE_URL}/students`, student);
    return res.data;
  },
  createAdmin: async (admin) => {
    const res = await axios.post(`${BASE_URL}/admins`, admin);
    return res.data;
  },
  login: async (email, password) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/users?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );
      return res.data;
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      throw new error();
    }
  },
};
