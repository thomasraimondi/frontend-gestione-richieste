import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";

export default function Oraria({ setFormData, formData }: { setFormData: (data: any) => void; formData: any }) {
  useEffect(() => {
    const nDay = new Date().getDay();
    let addDays = new Date();
    let minDate = "";
    if (nDay === 1) {
      addDays = new Date(addDays.setDate(addDays.getDate() + 14));
      minDate = addDays.toISOString().split("T")[0];
    } else if (nDay === 2) {
      addDays = new Date(addDays.setDate(addDays.getDate() + 20));
      minDate = addDays.toISOString().split("T")[0];
    } else if (nDay === 3) {
      addDays = new Date(addDays.setDate(addDays.getDate() + 19));
      minDate = addDays.toISOString().split("T")[0];
    } else if (nDay === 4) {
      addDays = new Date(addDays.setDate(addDays.getDate() + 18));
      minDate = addDays.toISOString().split("T")[0];
    } else if (nDay === 5) {
      addDays = new Date(addDays.setDate(addDays.getDate() + 17));
      minDate = addDays.toISOString().split("T")[0];
    } else if (nDay === 6) {
      addDays = new Date(addDays.setDate(addDays.getDate() + 16));
      minDate = addDays.toISOString().split("T")[0];
    } else if (nDay === 0) {
      addDays = new Date(addDays.setDate(addDays.getDate() + 15));
      minDate = addDays.toISOString().split("T")[0];
    }
    setFormData({ ...formData, date: minDate });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <TextField
        type="date"
        value={formData.date}
        onChange={(e) => {
          const selectedDate = e.target.value;
          if (selectedDate < formData.date) {
            alert("La data selezionata non è valida.");
            return;
          }
          setFormData({ ...formData, date: selectedDate });
        }}
        inputProps={{ min: formData.date }}
        label="Data"
        slotProps={{ input: { sx: { height: "56px" } } }}
      />
      <div className="flex gap-2 w-full mt-2 mb-2">
        <FormControl className="grow">
          <InputLabel id="options">Opzioni</InputLabel>
          <Select
            labelId="options"
            id="options-select"
            value={formData.options}
            label="Opzioni"
            onChange={(e) => {
              setFormData({ ...formData, options: e.target.value });
            }}
          >
            <MenuItem value="inizia-il-turno-dalle-ore">Inizia il turno dalle ore</MenuItem>
            <MenuItem value="termina-il-turno-entro-le-ore">Termina il turno entro le ore</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="time"
          defaultValue="00:00"
          label="Orario"
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          slotProps={{ input: { sx: { width: "100px", height: "56px" } } }}
        />
      </div>
      <TextField
        label="Motivo"
        multiline
        rows={4}
        onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
        InputLabelProps={{
          sx: {
            // Sfondo bianco dietro la label per coprire il bordo
            backgroundColor: "background.paper",
            px: 0.5,
          },
        }}
      />
    </div>
  );
}
