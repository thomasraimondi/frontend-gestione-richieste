import { useAuth } from "../contexts/AuthContext";
import { TextField, Button, Divider, Avatar, Alert } from "@mui/material";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import CheckIcon from "@mui/icons-material/Check";
import { useError } from "../contexts/errorContext";

interface UserData {
  username: string | undefined;
  name: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
}

interface FormData {
  username: string | undefined;
  name: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
}

export default function Profile() {
  const { user } = useAuth();
  const { error, errorMessage, setError, setErrorMessage } = useError();
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    username: user?.username,
    name: user?.name,
    lastname: user?.lastname,
    email: user?.email,
  });
  const [formDataPassword, setFormDataPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        window.location.reload();
      }, 2000);
      return () => {
        clearTimeout(timer);
        window.location.reload();
      };
    }
  }, [isSubmitted]);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true });
      setFormData({
        username: res.data.username,
        name: res.data.name,
        lastname: res.data.lastname,
        email: res.data.email,
      });
      setUserData(res.data);
    };
    fetchUserData();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch(`${import.meta.env.VITE_API_URL}/users`, formData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setSubmitMessage("Dati aggiornati con successo.");
        setIsSubmitted(true);
      })
      .catch((err: unknown) => {
        if (err instanceof AxiosError) {
          setError({ username: false, password: false, name: false, lastname: false, email: false, updateProfile: true });
          setErrorMessage({ username: "", password: "", name: "", lastname: "", email: "", updateProfile: "Errore aggiornamento dati" });
        }
      });
  };

  const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formDataPassword.password !== formDataPassword.confirmPassword) {
      setError({ password: true, name: false, lastname: false, email: false, username: false, updateProfile: false });
      setErrorMessage({ password: "Password and confirm password do not match", name: "", lastname: "", email: "", username: "", updateProfile: "" });
      return;
    }
    axios
      .patch(`${import.meta.env.VITE_API_URL}/users/password`, formDataPassword, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setSubmitMessage("Password aggiornata con successo.");
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.password) {
          setError({ password: true, name: false, lastname: false, email: false, username: false, updateProfile: false });
          setErrorMessage({ password: err.response.data.error.password, name: "", lastname: "", email: "", username: "", updateProfile: "" });
        }
      });
    // console.log(formDataPassword);
  };

  return (
    <>
      {isSubmitted && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity={error.updateProfile ? "error" : "success"}
          className="absolute top-[70px] left-1/2 -translate-x-1/2 w-1/2 z-50"
          onClose={() => setIsSubmitted(false)}
        >
          {submitMessage ? submitMessage : errorMessage.updateProfile ? errorMessage.updateProfile : "Dati aggiornati con successo."}
        </Alert>
      )}
      <div className="container mx-auto p-4 mt-[70px] relative">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center">
            <div className="flex items-center justify-between">
              <Avatar sx={{ width: 100, height: 100, fontSize: "2rem" }}>
                {user?.img ? <img src={user?.img} alt="avatar" /> : formData.name && formData.lastname ? formData.name.charAt(0).toUpperCase() + formData.lastname.charAt(0).toUpperCase() : ""}
              </Avatar>
              {/* <InputFileUpload /> */}
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Dati personali</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  <div className="flex gap-4">
                    <TextField
                      id="username"
                      label="Username"
                      value={user?.username}
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                      className="w-full md:w-1/3"
                    />
                    <TextField id="name" label="Nome" value={formData.name} className="w-full md:w-1/3" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <TextField id="lastname" label="Cognome" value={formData.lastname} className="w-full md:w-1/3" onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
                  </div>
                  <TextField id="email" label="Email" value={formData.email} className="w-full" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: "#114412" }}
                    type="submit"
                    disabled={formData.name === userData?.name && formData.lastname === userData?.lastname && formData.email === userData?.email}
                  >
                    Salva
                  </Button>
                </form>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Cambia password</h1>
              <form onSubmit={handleSubmitPassword} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    className="w-full md:w-1/2"
                    value={formDataPassword.password}
                    onChange={(e) => setFormDataPassword({ ...formDataPassword, password: e.target.value })}
                    error={error.password}
                    helperText={errorMessage.password}
                  />

                  <TextField
                    id="confirm-password"
                    label="ConfermaPassword"
                    type="password"
                    className="w-full md:w-1/2"
                    value={formDataPassword.confirmPassword}
                    onChange={(e) => setFormDataPassword({ ...formDataPassword, confirmPassword: e.target.value })}
                    error={error.password}
                  />
                </div>
                <Button variant="contained" color="primary" sx={{ backgroundColor: "#114412" }} type="submit">
                  Conferma
                </Button>
              </form>
            </div>
            <Divider />
            <Modal />
          </div>
        </div>
      </div>
    </>
  );
}
