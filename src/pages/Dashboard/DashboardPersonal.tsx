import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/ui/Table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

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
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/requests/user`).then((res) => {
      setRequests(res.data);
    });
  }, []);

  const pendingRequests = requests.filter((request: Request) => request.status === "pending");
  const approvedRequests = requests.filter((request: Request) => request.status === "approved");
  const rejectedRequests = requests.filter((request: Request) => request.status === "rejected");

  return (
    <div className="container w-full p-4 grow mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
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
            {pendingRequests.length > 0 && <Table rows={pendingRequests} />}
            {approvedRequests.length > 0 && <h2 className="text-2xl font-bold">Richieste Approvate</h2>}
            {approvedRequests.length > 0 && <Table rows={approvedRequests} />}
            {rejectedRequests.length > 0 && <h2 className="text-2xl font-bold">Richieste Rifiutate</h2>}
            {rejectedRequests.length > 0 && <Table rows={rejectedRequests} />}
          </div>
          {/* <h2 className="text-2xl font-bold">Tutte le mie richieste</h2>
          <Table rows={allRequests} /> */}
        </div>
      </div>
    </div>
  );
}
