import { useEffect, useState } from "react";
import HeaderMessage from "../components/ui/HeaderMessage";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Table from "../components/ui/Table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Request {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  update_at: string;
}
export default function Dashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3000/requests/user`).then((res) => {
      setRequests(res.data);
    });
  }, []);

  const pendingRequests = requests.filter((request: Request) => request.status === "pending");
  const approvedRequests = requests.filter((request: Request) => request.status === "approved");
  const rejectedRequests = requests.filter((request: Request) => request.status === "rejected");
  const allRequests = requests;

  return (
    <>
      <HeaderMessage title="Dashboard" />
      <div className="container w-full p-4 grow mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 justify-between">
                <h2 className="text-2xl font-bold">Richieste In Attesa</h2>
                <Button variant="contained" color="primary" sx={{ backgroundColor: "#114412" }} onClick={() => navigate("/add-requests")}>
                  Inserisci Richiesta
                </Button>
              </div>
              <Table rows={pendingRequests} />
              <h2 className="text-2xl font-bold">Richieste Approvate</h2>
              <Table rows={approvedRequests} />
              <h2 className="text-2xl font-bold">Richieste Rifiutate</h2>
              <Table rows={rejectedRequests} />
            </div>
            <h2 className="text-2xl font-bold">Tutte le mie richieste</h2>
            <Table rows={allRequests} />
          </div>
        </div>
      </div>
    </>
  );
}
