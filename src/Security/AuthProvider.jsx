// import React from "react";
// import { useState, useEffect } from "react";
// import { api } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   //Já checa no mount se o usuário ta logado
//   useEffect(() => {
//     const storedUser = localStorage.getItem("currentUser");
//     const accessToken = localStorage.getItem("accessToken");

//     if (storedUser && accessToken) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     const response = await api.login(email, password);
//     setUser(response);
//     return response;
//   };

//   const logout = async () => {
//     try {
//       await api.logout();
//       setUser(null);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout error", error);
//       setUser(null);
//       navigate("/login");
//     }
//   };

//   const isAuthenticated = () => {
//     return !!user && !!localStorage.getItem("accessToken");
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     isAuthenticated,
//     loading,
//   };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Ao montar, restaura o login salvo
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ Corrigido: login agora também salva localmente
  const login = async (email, password) => {
    const response = await api.login(email, password);

    // Espera-se que o backend retorne algo como:
    // { token, userType, fullName, email, ... }

    if (response.token) {
      localStorage.setItem("accessToken", response.token);
    }

    localStorage.setItem("currentUser", JSON.stringify(response));
    setUser(response);

    return response;
  };

  // ✅ Logout completo
  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      setUser(null);
      navigate("/login");
    }
  };

  const isAuthenticated = () => !!user && !!localStorage.getItem("accessToken");

  const value = { user, login, logout, isAuthenticated, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
