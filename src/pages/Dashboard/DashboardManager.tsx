import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/ui/Table";
import { useSearch } from "../../contexts/SearchContext";
import { Box } from "@mui/material";
import SearchName from "../../components/ui/search/SearchName";
import SearchLastName from "../../components/ui/search/SearchLastName";
import SearchDate from "../../components/ui/search/SearchDate";
import SearchType from "../../components/ui/search/SearchType";

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
  const { search, setSearch, searchLastname, setSearchLastname, searchType, setSearchType, searchDate, setSearchDate } = useSearch();
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/requests/manager`).then((res) => {
      setRequests(res.data);
      setSearchDate("");
      setSearchType("");
      setSearchLastname("");
      setSearch("");
    });
  }, []);

  const pendingRequests = requests.filter((request: Request) => request.status === "pending");
  const allRequests = requests;

  const filteredPendingRequests = pendingRequests.filter(
    (request: Request) =>
      request.name.toLowerCase().includes(search?.toLowerCase() || "") &&
      request.lastname.toLowerCase().includes(searchLastname?.toLowerCase() || "") &&
      request.type.toLowerCase().includes(searchType?.toLowerCase() || "") &&
      request.date.toLowerCase().includes(searchDate?.toLowerCase() || "")
  );
  const filteredAllRequests = allRequests.filter(
    (request: Request) =>
      request.name.toLowerCase().includes(search?.toLowerCase() || "") &&
      request.lastname.toLowerCase().includes(searchLastname?.toLowerCase() || "") &&
      request.type.toLowerCase().includes(searchType?.toLowerCase() || "") &&
      request.date.toLowerCase().includes(searchDate?.toLowerCase() || "")
  );

  return (
    <div className="container w-full p-4 grow mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Cerca</h2>
            <Box className="flex gap-4">
              <SearchName search={search} setSearch={setSearch} />
              <SearchLastName searchLastname={searchLastname} setSearchLastname={setSearchLastname} />
              <SearchType searchType={searchType} setSearchType={setSearchType} />
              <SearchDate searchDate={searchDate} setSearchDate={setSearchDate} />
            </Box>
            <div className="flex gap-4 justify-between">{pendingRequests.length > 0 && <h2 className="text-2xl font-bold">Richieste In Attesa</h2>}</div>
            {pendingRequests.length > 0 && <Table rows={filteredPendingRequests.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())} />}
            <h2 className="text-2xl font-bold">Tutte le mie richieste</h2>
            <Table rows={filteredAllRequests} />
          </div>
        </div>
      </div>
    </div>
  );
}
