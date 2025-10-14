// src/api/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// Cria o axios instance com interceptadores
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

//request pro interceptador pra adicionar o token pros headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Resposta do interceptador pra gerir o token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //se n n tentamos dar refresh no token e o erro é 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        //Tentar dar refresh no token
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        //Tentar a request original com o novo token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        //refresh falhou -> desloga o usuário
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("currentUser");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  login: async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      //Salva os tokens
      // eslint-disable-next-line no-unused-vars
      const { accessToken, refreshToken, userId, userType } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      return res.data;
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data.error || error.message);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("currentUser");
    } catch (error) {
      console.error("Error ao fazer logout", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("currentUser");
    }
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const res = await axios.post(`${BASE_URL}/auth/refresh`, {
      refreshToken,
    });
    const { accessToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  },

  signUpStudent: async (payload) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup/student`, payload);

      // eslint-disable-next-line no-unused-vars
      const { accessToken, refreshToken, userId, userType, email, fullName } =
        res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      return res.data;
    } catch (error) {
      console.error(
        "Erro ao cadastrar escola:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.error || error.message);
    }
  },

  signUpSchool: async (payload) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup/school`, payload);

      // eslint-disable-next-line no-unused-vars
      const { accessToken, refreshToken, userId, userType, email, fullName } =
        res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      return res.data;
    } catch (error) {
      console.error(
        "Erro ao cadastrar escola:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.error || error.message);
    }
  },

  signUpAdmin: async (adminData) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup/admin`, adminData);

      // eslint-disable-next-line no-unused-vars
      const { accessToken, refreshToken, userId, userType, email, fullName } =
        res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      return res.data;
    } catch (error) {
      console.error(
        "Erro ao cadastrar admin:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.error || error.message);
    }
  },

  getSchoolByName: async (name) => {
    const { data } = await axiosInstance.get(
      `/schools/name/${encodeURIComponent(name)}`
    );
    return { data };
  },
  createAdmin: async (admin) => {
    const res = await axiosInstance.post("/admins", admin);
    return res.data;
  },
};
