import { createContext, useContext, useState } from "react";

const ErrorContext = createContext<{
  error: { username: boolean; password: boolean; name: boolean; lastname: boolean; email: boolean };
  setError: (error: { username: boolean; password: boolean; name: boolean; lastname: boolean; email: boolean }) => void;
  errorMessage: { username: string; password: string; name: string; lastname: string; email: string };
  setErrorMessage: (errorMessage: { username: string; password: string; name: string; lastname: string; email: string }) => void;
}>({
  error: { username: false, password: false, name: false, lastname: false, email: false },
  setError: () => {},
  errorMessage: { username: "", password: "", name: "", lastname: "", email: "" },
  setErrorMessage: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<{ username: boolean; password: boolean; name: boolean; lastname: boolean; email: boolean }>({
    username: false,
    password: false,
    name: false,
    lastname: false,
    email: false,
  });
  const [errorMessage, setErrorMessage] = useState<{ username: string; password: string; name: string; lastname: string; email: string }>({
    username: "",
    password: "",
    name: "",
    lastname: "",
    email: "",
  });

  return <ErrorContext.Provider value={{ error, setError, errorMessage, setErrorMessage }}>{children}</ErrorContext.Provider>;
};

export const useError = () => useContext(ErrorContext);
