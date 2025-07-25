import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/ui/Table";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSearch } from "../../contexts/SearchContext";
import SearchType from "../../components/ui/search/SearchType";
import SearchDate from "../../components/ui/search/SearchDate";

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
  const { searchType, setSearchType, searchDate, setSearchDate } = useSearch();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/requests/user`).then((res) => {
      setRequests(res.data);
      setSearchDate("");
      setSearchType("");
    });
  }, []);

  const pendingRequests = requests.filter((request: Request) => request.status === "pending");
  const approvedRequests = requests.filter((request: Request) => request.status === "approved");
  const rejectedRequests = requests.filter((request: Request) => request.status === "rejected");

  const filteredPendingRequests = pendingRequests.filter(
    (request: Request) => request.type.toLowerCase().includes(searchType?.toLowerCase() || "") && request.date.toLowerCase().includes(searchDate?.toLowerCase() || "")
  );
  const filteredApprovedRequests = approvedRequests.filter(
    (request: Request) => request.type.toLowerCase().includes(searchType?.toLowerCase() || "") && request.date.toLowerCase().includes(searchDate?.toLowerCase() || "")
  );
  const filteredRejectedRequests = rejectedRequests.filter(
    (request: Request) => request.type.toLowerCase().includes(searchType?.toLowerCase() || "") && request.date.toLowerCase().includes(searchDate?.toLowerCase() || "")
  );

  return (
    <div className="container w-full p-4 grow mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Cerca</h2>
            <Box className="flex gap-4">
              <SearchType searchType={searchType} setSearchType={setSearchType} />
              <SearchDate searchDate={searchDate} setSearchDate={setSearchDate} />
            </Box>
            <div className="flex gap-4 justify-between items-center">
              {pendingRequests.length > 0 && <h2 className="text-2xl font-bold">Richieste In Attesa</h2>}
              {requests.length === 0 && <h2 className="text-2xl font-bold">Inserisci la tua prima richiesta</h2>}
              <Button variant="contained" color="primary" sx={{ backgroundColor: "#114412", display: { xs: "none", md: "block" } }} onClick={() => navigate("/add-requests")}>
                Inserisci Richiesta
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "#114412", display: { xs: "block", md: "none" }, width: "50px", height: "50px", borderRadius: "50%", padding: 0, minWidth: "50px" }}
                onClick={() => navigate("/add-requests")}
              >
                <AddIcon />
              </Button>
            </div>
            {pendingRequests.length > 0 && <Table rows={filteredPendingRequests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())} />}
            {approvedRequests.length > 0 && <h2 className="text-2xl font-bold">Richieste Approvate</h2>}
            {approvedRequests.length > 0 && <Table rows={filteredApprovedRequests} />}
            {rejectedRequests.length > 0 && <h2 className="text-2xl font-bold">Richieste Rifiutate</h2>}
            {rejectedRequests.length > 0 && <Table rows={filteredRejectedRequests} />}
          </div>
          {/* <h2 className="text-2xl font-bold">Tutte le mie richieste</h2>
          <Table rows={allRequests} /> */}
        </div>
      </div>
    </div>
  );
}
