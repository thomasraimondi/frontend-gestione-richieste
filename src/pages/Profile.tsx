import { useAuth } from "../contexts/AuthContext";
import { TextField, Button, Divider, Avatar, Alert } from "@mui/material";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function Profile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(undefined);
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username,
    name: user?.name,
    lastname: user?.lastname,
    email: user?.email,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true });
      console.log(res.data);
      setFormData({
        username: res.data.username,
        name: res.data.name,
        lastname: res.data.lastname,
        email: res.data.email,
      });
      setUserData(res.data);
    };
    fetchUserData();
    setUpdate(false);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.patch(`${import.meta.env.VITE_API_URL}/users`, formData, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setUpdate(true);
    });
  };

  return (
    <>
      {update && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="absolute top-[70px] left-1/2 -translate-x-1/2 w-1/2 z-50" onClose={() => setUpdate(false)}>
          Dati aggiornati con successo.
          <Button variant="contained" color="primary" sx={{ backgroundColor: "#114412" }} onClick={() => setUpdate(false)}>
            <CloseIcon />
          </Button>
        </Alert>
      )}
      <div className="container mx-auto p-4 mt-[70px] relative">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center">
            <div className="flex items-center justify-between">
              <Avatar sx={{ width: 100, height: 100, fontSize: "2rem" }}>
                {user?.img ? <img src={user?.img} alt="avatar" /> : formData?.name?.charAt(0).toUpperCase() + formData?.lastname?.charAt(0).toUpperCase()}
              </Avatar>
              {/* <InputFileUpload /> */}
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Dati personali</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <TextField id="password" label="Password" type="password" autoComplete="current-password" className="w-full md:w-1/2" />
                <TextField id="confirm-password" label="ConfermaPassword" type="password" autoComplete="current-password" className="w-full md:w-1/2" />
              </div>
              <Button variant="contained" color="primary" sx={{ backgroundColor: "#114412" }}>
                conferma
              </Button>
            </div>
            <Divider />
            <Modal />
          </div>
        </div>
      </div>
    </>
  );
}
