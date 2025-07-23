import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/ui/Table";

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

export default function DashboardManager() {
  const [requests, setRequests] = useState<Request[]>([]);
  useEffect(() => {
    axios.get(`http://localhost:3000/requests/manager`).then((res) => {
      setRequests(res.data);
    });
  }, []);

  const pendingRequests = requests.filter((request: Request) => request.status === "pending");

  const allRequests = requests;

  return (
    <div className="container w-full p-4 grow mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-between">{pendingRequests.length > 0 && <h2 className="text-2xl font-bold">Richieste In Attesa</h2>}</div>
            {pendingRequests.length > 0 && <Table rows={pendingRequests} />}
            <h2 className="text-2xl font-bold">Tutte le mie richieste</h2>
            <Table rows={allRequests} />
          </div>
        </div>
      </div>
    </div>
  );
}
