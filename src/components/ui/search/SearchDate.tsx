import { TextField } from "@mui/material";

export default function SearchDate({ searchDate, setSearchDate }: { searchDate: string; setSearchDate: (value: string) => void }) {
  return <TextField id="outlined-search" type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />;
}
