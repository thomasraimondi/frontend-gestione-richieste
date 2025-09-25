import { createContext, useContext, useState } from "react";

const ErrorContext = createContext<{
  error: { username_format: boolean; username_exists: boolean; password: boolean; name: boolean; lastname: boolean; email_format: boolean; email_exists: boolean; updateProfile: boolean };
  setError: (error: {
    username_format: boolean;
    username_exists: boolean;
    password: boolean;
    name: boolean;
    lastname: boolean;
    email_format: boolean;
    email_exists: boolean;
    updateProfile: boolean;
  }) => void;
  errorMessage: { username: string; password: string; name: string; lastname: string; email: string; updateProfile: string };
  setErrorMessage: (errorMessage: { username: string; password: string; name: string; lastname: string; email: string; updateProfile: string }) => void;
}>({
  error: { username_format: false, username_exists: false, password: false, name: false, lastname: false, email_format: false, email_exists: false, updateProfile: false },
  setError: () => {},
  errorMessage: { username: "", password: "", name: "", lastname: "", email: "", updateProfile: "" },
  setErrorMessage: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<{
    username_format: boolean;
    username_exists: boolean;
    password: boolean;
    name: boolean;
    lastname: boolean;
    email_format: boolean;
    email_exists: boolean;
    updateProfile: boolean;
  }>({
    username_format: false,
    username_exists: false,
    password: false,
    name: false,
    lastname: false,
    email_format: false,
    email_exists: false,
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
