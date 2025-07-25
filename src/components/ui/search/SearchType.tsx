import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SearchType({ searchType, setSearchType }: { searchType: string; setSearchType: (value: string) => void }) {
  return (
    <FormControl className="w-1/6">
      <InputLabel id="type-label">Tipo</InputLabel>
      <Select labelId="type-label" id="type-select" value={searchType} label="Tipo" onChange={(e) => setSearchType(e.target.value)}>
        <MenuItem value={"oraria"}>Orari</MenuItem>
        <MenuItem value={"ferie"}>Ferie</MenuItem>
        <MenuItem value={"permesso"}>Permesso o Riposo</MenuItem>
      </Select>
    </FormControl>
  );
}
