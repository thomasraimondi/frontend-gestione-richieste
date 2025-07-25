import { createContext, useContext, useState } from "react";

const ErrorContext = createContext<{
  error: { username: boolean; password: boolean; name: boolean; lastname: boolean; email: boolean; updateProfile: boolean };
  setError: (error: { username: boolean; password: boolean; name: boolean; lastname: boolean; email: boolean; updateProfile: boolean }) => void;
  errorMessage: { username: string; password: string; name: string; lastname: string; email: string; updateProfile: string };
  setErrorMessage: (errorMessage: { username: string; password: string; name: string; lastname: string; email: string; updateProfile: string }) => void;
}>({
  error: { username: false, password: false, name: false, lastname: false, email: false, updateProfile: false },
  setError: () => {},
  errorMessage: { username: "", password: "", name: "", lastname: "", email: "", updateProfile: "" },
  setErrorMessage: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<{ username: boolean; password: boolean; name: boolean; lastname: boolean; email: boolean; updateProfile: boolean }>({
    username: false,
    password: false,
    name: false,
    lastname: false,
    email: false,
    updateProfile: false,
  });
  const [errorMessage, setErrorMessage] = useState<{ username: string; password: string; name: string; lastname: string; email: string; updateProfile: string }>({
    username: "",
    password: "",
    name: "",
    lastname: "",
    email: "",
    updateProfile: "",
  });

  return <ErrorContext.Provider value={{ error, setError, errorMessage, setErrorMessage }}>{children}</ErrorContext.Provider>;
};

export const useError = () => useContext(ErrorContext);
