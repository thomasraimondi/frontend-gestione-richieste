import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import HeaderMessage from "../../components/ui/HeaderMessage";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Oraria from "../../components/requestTypeField/Oraria";
import Permesso from "../../components/requestTypeField/Permesso";
import Ferie from "../../components/requestTypeField/Ferie";

export default function AddRequests() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    motivo: "",
    date: "",
    dateEnd: "",
    type: "",
    options: "",
    time: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("http://localhost:3000/requests", formData).then((res: any) => {
      navigate("/dashboard");
    });
  };

  return (
    <>
      <HeaderMessage title="Inserisci Nuova Richiesta" />
      <div className="container w-full  lg:w-1/2 p-4 grow mx-auto">
        <div className="flex flex-col gap-4 my-auto">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormControl>
                  <InputLabel id="type-request">Tipo di Richiesta</InputLabel>
                  <Select labelId="type-request" id="type-request-select" value={formData.type} label="Tipo di Richiesta" onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                    <MenuItem value="oraria">Oraria</MenuItem>
                    <MenuItem value="permesso">Permesso o Riposo</MenuItem>
                    <MenuItem value="ferie">Ferie</MenuItem>
                  </Select>
                </FormControl>
                {formData.type === "oraria" && <Oraria setFormData={setFormData} formData={formData} />}
                {formData.type === "permesso" && <Permesso setFormData={setFormData} formData={formData} />}
                {formData.type === "ferie" && <Ferie setFormData={setFormData} formData={formData} />}
                <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: "#114412" }}>
                  Inserisci
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
