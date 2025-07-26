import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useError } from "./errorContext";

// 🔧 Configura axios per inviare cookie
axios.defaults.withCredentials = true;

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  username: string;
  role: string;
  img?: string;
}

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}>({
  user: null,
  loading: true,
  login: async () => false,
  logout: async () => {},
  checkAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setError, setErrorMessage } = useError();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // 🔄 Verifica autenticazione all'avvio

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/check-token`);
      setUser(res.data.user);
    } catch {
      setUser(null);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // 🔑 Login
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/login`, { username, password });
      await checkAuth();
      navigate("/dashboard");
      return true;
    } catch (err: unknown) {
      console.log(err);
      const axiosError = err as { response?: { data?: { error?: { username?: { message: string }; password?: { message: string } } } } };

      if (axiosError.response?.data?.error?.username) {
        setError({ username: true, password: false, name: false, lastname: false, email: false, updateProfile: false });
        setErrorMessage({ username: axiosError.response.data.error.username.message, password: "", name: "", lastname: "", email: "", updateProfile: "" });
      }
      if (axiosError.response?.data?.error?.password) {
        setError({ username: false, password: true, name: false, lastname: false, email: false, updateProfile: false });
        setErrorMessage({ username: "", password: axiosError.response.data.error.password.message, name: "", lastname: "", email: "", updateProfile: "" });
      }
      return false;
    }
  };

  // 🚪 Logou
  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/logout`);
      setUser(null);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>{children}</AuthContext.Provider>;
};

// 🔎 Hook per usare il context
export const useAuth = () => useContext(AuthContext);
