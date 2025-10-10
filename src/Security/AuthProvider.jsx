import React from "react";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Já checa no mount se o usuário ta logado
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.login(email, password);
    setUser(response);
    return response;
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
      setUser(null);
      navigate("/login");
    }
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem("accessToken");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
