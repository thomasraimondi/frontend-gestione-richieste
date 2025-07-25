import { TextField } from "@mui/material";

export default function SearchName({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {
  return <TextField id="outlined-search" label="Nome" type="search" value={search} onChange={(e) => setSearch(e.target.value)} />;
}
