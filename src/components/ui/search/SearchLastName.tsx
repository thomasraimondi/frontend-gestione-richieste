import { TextField } from "@mui/material";

export default function SearchLastName({ searchLastname, setSearchLastname }: { searchLastname: string; setSearchLastname: (value: string) => void }) {
  return <TextField id="outlined-search" label="Cognome" type="search" value={searchLastname} onChange={(e) => setSearchLastname(e.target.value)} />;
}
