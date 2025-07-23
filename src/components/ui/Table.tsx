import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { Chip, Typography } from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { useState } from "react";
import DetailRequest from "../DetailRequest";

interface Row {
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

export default function BasicTable({ rows }: { rows: Row[] }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "10%" }}>Utente</TableCell>
              <TableCell align="left" sx={{ width: "10%" }}>
                Tipo
              </TableCell>
              <TableCell align="left" sx={{ width: "10%" }}>
                Data Richiesta
              </TableCell>
              <TableCell align="left" sx={{ width: "50%", display: { xs: "none", md: "table-cell" } }}>
                Descrizione
              </TableCell>
              <TableCell align="left" sx={{ width: "10%", display: { xs: "none", md: "table-cell" } }}>
                Data Creazione
              </TableCell>
              <TableCell align="left" sx={{ width: "10%", display: { xs: "none", md: "table-cell" } }}>
                Stato
              </TableCell>
              <TableCell align="left" sx={{ width: { xs: "10%", md: "10%" } }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <div>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        fontSize: "1rem",
                        border: 4,
                        borderColor: row?.status === "pending" ? "warning.main" : row?.status === "approved" ? "success.main" : "error.main",
                      }}
                      onClick={() => {
                        setSelectedDetailId(selectedDetailId === row.id ? null : row.id);
                      }}
                    >
                      {(row?.name?.charAt(0)?.toUpperCase() || "") + (row?.lastname?.charAt(0)?.toUpperCase() || "")}
                    </Avatar>
                    {selectedDetailId === row.id && (
                      <Typography variant="body1" sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                        {row?.name} {row?.lastname}
                      </Typography>
                    )}
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left" sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {row.description}
                </TableCell>
                <TableCell align="left" sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {row.created_at}
                </TableCell>
                <TableCell align="left" sx={{ display: { xs: "none", md: "table-cell" } }}>
                  <Chip
                    label={row.status === "pending" ? "In attesa" : row.status === "approved" ? "Approvata" : "Rifiutata"}
                    color={row.status === "pending" ? "warning" : row.status === "approved" ? "success" : "error"}
                    icon={row.status === "pending" ? <PauseCircleFilledIcon /> : row.status === "approved" ? <CheckCircleIcon /> : <CancelIcon />}
                    sx={{ fontSize: "0.8rem", mb: 1 }}
                  />
                </TableCell>
                <TableCell align="left">
                  <InfoOutlineIcon
                    onClick={() => {
                      setOpen(true);
                      setId(row.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {open && <DetailRequest id={id} setOpen={setOpen} />}
    </>
  );
}
