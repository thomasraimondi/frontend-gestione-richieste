import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/errorContext";
import HeaderMessage from "../components/ui/HeaderMessage";

export default function Login() {
  const { login } = useAuth();
  const { error, errorMessage, setError, setErrorMessage } = useError();
  const [userData, setUserData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  useEffect(() => {
    setError({ username: false, password: false, name: false, lastname: false, email: false });
    setErrorMessage({ username: "", password: "", name: "", lastname: "", email: "" });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(userData.username, userData.password);
  };

  return (
    <>
      <HeaderMessage title="Gestione Richieste" />
      <div className="flex flex-col items-center md:justify-center p-4 grow">
        <div className="flex flex-col gap-5 bg-white p-4 rounded-md w-full sm:w-1/2 lg:w-1/3">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="text-sm text-gray-500">Please enter your credentials</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <TextField
                required
                id="username"
                label="Username"
                variant="outlined"
                name="username"
                value={userData.username}
                onChange={handleChange}
                helperText={errorMessage.username}
                error={error.username}
              />
            </div>
            <div className="flex flex-col gap-2">
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                helperText={errorMessage.password}
                error={error.password}
              />
            </div>
            <div className="flex justify-end items-center">
              <Link to="/forgot-password" className="text-sm text-gray-500 font-bold">
                Forgot Password
              </Link>
            </div>
            <Button variant="contained" type="submit" sx={{ backgroundColor: "#114412" }}>
              Login
            </Button>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-sm text-gray-500">Don't have an account?</p>
              <Link to="/register" className="text-sm text-gray-500 font-bold">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
