import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/ui/Table";
import { Box, TextField } from "@mui/material";

interface Request {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
  created_at: string;
  update_at: string;
  name: string;
  lastname: string;
  type: string;
}

export default function DashboardCrew() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchLastname, setSearchLastname] = useState("");
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/requests/crew`).then((res) => {
      setRequests(res.data);
    });
  }, []);

  const pendingRequests = requests.filter((request: Request) => request.status === "pending");
  const allRequests = requests;
  const filteredRequests = allRequests.filter(
    (request: Request) => request.name.toLowerCase().includes(search?.toLowerCase() || "") && request.lastname.toLowerCase().includes(searchLastname?.toLowerCase() || "")
    // request.type?.toLowerCase().includes(searchType?.toLowerCase() || "")
  );
  const filteredPendingRequests = pendingRequests.filter(
    (request: Request) => request.name.toLowerCase().includes(search?.toLowerCase() || "") && request.lastname.toLowerCase().includes(searchLastname?.toLowerCase() || "")
    // request.type?.toLowerCase().includes(searchType?.toLowerCase() || "")
  );

  return (
    <div className="container w-full p-4 grow mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Search</h2>
            <Box className="flex gap-4">
              <TextField id="outlined-search" label="Cerca Nome" type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <TextField id="outlined-search" label="Cerca Cognome" type="search" value={searchLastname} onChange={(e) => setSearchLastname(e.target.value)} />
              {/* <TextField id="outlined-search" label="Cerca Tipo" type="search" value={searchType} onChange={(e) => setSearchType(e.target.value)} /> */}
            </Box>
            <div className="flex gap-4 justify-between">{pendingRequests.length > 0 && <h2 className="text-2xl font-bold">Richieste In Attesa</h2>}</div>
            {pendingRequests.length > 0 && <Table rows={filteredPendingRequests} />}
          </div>
          <Box className="flex justify-between gap-4">
            <h2 className="text-2xl font-bold">Tutte le mie richieste</h2>
          </Box>
          <Table rows={filteredRequests} />
        </div>
      </div>
    </div>
  );
}
