import HeaderMessage from "../components/ui/HeaderMessage";
import { useAuth } from "../contexts/AuthContext";
import { TextField, Button, Divider, Avatar } from "@mui/material";
import Modal from "../components/Modal";

export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      <HeaderMessage title="Profilo" />
      <div className="container mx-auto p-4">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center">
            <div className="flex items-center justify-between">
              <Avatar sx={{ width: 100, height: 100, fontSize: "2rem" }}>
                {user?.img ? <img src={user?.img} alt="avatar" /> : user?.name.charAt(0).toUpperCase() + user?.lastname.charAt(0).toUpperCase()}
              </Avatar>
              {/* <InputFileUpload /> */}
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Dati personali</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <TextField
                  id="username"
                  label="Username"
                  defaultValue={user?.username}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  className="w-full md:w-1/3"
                />
                <TextField id="name" label="Nome" defaultValue={user?.name} className="w-full md:w-1/3" />
                <TextField id="lastname" label="Cognome" defaultValue={user?.lastname} className="w-full md:w-1/3" />
              </div>
              <TextField id="email" label="Email" defaultValue={user?.email} className="w-full" />
              <Button variant="contained" color="primary" sx={{ backgroundColor: "#114412" }}>
                Salva
              </Button>
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
