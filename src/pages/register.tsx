import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { useError } from "../contexts/errorContext";

export default function Register() {
  const [userData, setUserData] = useState<{ username: string; password: string; confirmPassword: string; email: string; name: string; lastname: string }>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    lastname: "",
  });
  const { error, errorMessage, setError, setErrorMessage } = useError();
  const navigate = useNavigate();

  useEffect(() => {
    setError({ password: false, name: false, lastname: false, email: false, username: false });
    setErrorMessage({ password: "", name: "", lastname: "", email: "", username: "" });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError({ password: true, name: false, lastname: false, email: false, username: false });
      setErrorMessage({ password: "Password and confirm password do not match", name: "", lastname: "", email: "", username: "" });
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_URL}/register`, userData)
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.name) {
          setError({ name: true, password: false, lastname: false, email: false, username: false });
          setErrorMessage({ name: err.response.data.error.name, password: "", lastname: "", email: "", username: "" });
        }
        if (err.response.data.error.lastname) {
          setError({ lastname: true, password: false, name: false, email: false, username: false });
          setErrorMessage({ lastname: err.response.data.error.lastname, password: "", name: "", email: "", username: "" });
        }
        if (err.response.data.error.email) {
          setError({ email: true, password: false, name: false, lastname: false, username: false });
          setErrorMessage({ email: err.response.data.error.email, password: "", name: "", lastname: "", username: "" });
        }
        if (err.response.data.error.username) {
          setError({ username: true, password: false, name: false, lastname: false, email: false });
          setErrorMessage({ username: err.response.data.error.username, password: "", name: "", lastname: "", email: "" });
        }
        if (err.response.data.error.password) {
          setError({ password: true, name: false, lastname: false, email: false, username: false });
          setErrorMessage({ password: err.response.data.error.password, name: "", lastname: "", email: "", username: "" });
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-md p-4 grow">
      <div className="flex flex-col gap-4 bg-white p-[2rem] rounded-md w-full sm:w-1/2 lg:w-1/3 mt-[70px]">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <TextField required id="name" label="Name" variant="outlined" name="name" value={userData.name} onChange={handleChange} error={error.name} helperText={errorMessage.name} />
          </div>
          <div className="flex flex-col gap-2">
            <TextField
              required
              id="lastname"
              label="Lastname"
              variant="outlined"
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
              error={error.lastname}
              helperText={errorMessage.lastname}
            />
          </div>
          <div className="flex flex-col gap-2">
            <TextField required id="email" label="Email" variant="outlined" name="email" value={userData.email} onChange={handleChange} error={error.email} helperText={errorMessage.email} />
          </div>
          <div className="flex flex-col gap-2">
            <TextField
              required
              id="username"
              label="Username"
              variant="outlined"
              name="username"
              value={userData.username}
              onChange={handleChange}
              error={error.username}
              helperText={errorMessage.username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <TextField
              required
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              name="password"
              value={userData.password}
              onChange={handleChange}
              error={error.password}
              helperText={errorMessage.password}
            />
          </div>
          <div className="flex flex-col gap-2">
            <TextField
              required
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              error={error.password}
              helperText={errorMessage.password}
            />
          </div>
          <Button variant="contained" type="submit" sx={{ backgroundColor: "#114412" }}>
            Register
          </Button>
        </form>
        <div className="flex justify-center items-center gap-2">
          <p className="text-sm text-gray-500">Already have an account?</p>
          <Link to="/login" className="text-sm text-gray-500 font-bold">
            Login
          </Link>
        </div>
        {/* <Divider />
        <div className="flex justify-center items-center gap-2 flex-col">
          <Button variant="outlined" startIcon={<GoogleIcon />} className="w-full" sx={{ borderColor: "#114412", color: "#114412", "&:hover": { borderColor: "#114412", color: "#114412" } }}>
            Sign up with Google
          </Button>
          <Button variant="outlined" startIcon={<AppleIcon />} className="w-full" sx={{ borderColor: "#114412", color: "#114412" }}>
            Sign up with Apple
          </Button>
        </div> */}
      </div>
    </div>
  );
}
