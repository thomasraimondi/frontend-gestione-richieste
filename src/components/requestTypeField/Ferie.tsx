import { TextField } from "@mui/material";
import { useEffect } from "react";

export default function Permesso({ setFormData, formData }: { setFormData: (data: any) => void; formData: any }) {
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
    setFormData({ ...formData, date: minDate, dateEnd: minDate });
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
        sx={{ marginBottom: "10px" }}
      />
      <TextField
        type="date"
        value={formData.dateEnd}
        onChange={(e) => {
          const selectedDate = e.target.value;
          if (selectedDate <= formData.date) {
            alert("La data deve essere successiva alla data iniziale.");
            return;
          }
          setFormData({ ...formData, dateEnd: selectedDate });
        }}
        inputProps={{ min: formData.date }}
        label="Data Fine"
        slotProps={{ input: { sx: { height: "56px" } } }}
        sx={{ marginBottom: "10px" }}
      />
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
        autoFocus
      />
    </div>
  );
}
