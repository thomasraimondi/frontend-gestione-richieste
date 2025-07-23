import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Card, CardContent, Typography, Box, Chip } from "@mui/material";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import { useAuth } from "../contexts/AuthContext";
import CloseIcon from "@mui/icons-material/Close";

interface Request {
  id: number;
  description: string;
  date: string;
  status: string;
  created_at: string;
  update_at: string;
  name: string;
  lastname: string;
  type: string;
  time: string;
  options: string;
  dateend: string;
  img: string;
}

export default function DetailRequest({ id, setOpen }: { id: number; setOpen: (open: boolean) => void }) {
  const { user } = useAuth();
  const [request, setRequest] = useState<Request | null>(null);
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/requests/${id}`).then((res) => {
        setRequest(res.data[0]);
        console.log(res.data[0]);
      });
    }
  }, [id]);

  const handleApprove = () => {
    axios
      .patch("http://localhost:3000/requests/update", { id, status: "approved" })
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReject = () => {
    axios
      .patch("http://localhost:3000/requests/update", { id, status: "rejected" })
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box className="flex justify-center items-center min-h-[60vh] bg-black/50 py-8 px-4 fixed top-0 left-0 w-full h-full z-50">
        <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Box className="flex justify-end mb-4">
              <CloseIcon onClick={() => setOpen(false)} sx={{ fontSize: 30, cursor: "pointer" }} />
            </Box>
            <Box className="flex justify-end gap-4">
              <Box className="flex gap-4 w-1/3">
                <Chip
                  label={request?.type === "oraria" ? "Oraria" : request?.type === "ferie" ? "Ferie" : request?.type === "permesso" ? "Permesso" : "Riposo"}
                  sx={{ fontSize: "1rem", mb: 1, backgroundColor: "#114412", color: "white" }}
                />
              </Box>
              <Box className="flex flex-col items-center mb-6 mx-auto w-1/3">
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: "2rem",
                    mb: 2,
                    border: 4,
                    borderColor: request?.status === "pending" ? "warning.main" : request?.status === "approved" ? "success.main" : "error.main",
                  }}
                >
                  {request?.img ? (
                    <img src={request?.img} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    (request?.name?.charAt(0)?.toUpperCase() || "") + (request?.lastname?.charAt(0)?.toUpperCase() || "")
                  )}
                </Avatar>
                <Typography variant="h6" fontWeight={700} gutterBottom className="text-center">
                  {request?.name} {request?.lastname}
                </Typography>
              </Box>
              <Box className="flex gap-4 w-1/3 justify-end">
                <Chip
                  label={
                    <span className="hidden md:block text-center w-full text-sm"> {request?.status === "pending" ? "In attesa" : request?.status === "approved" ? "Approvata" : "Rifiutata"} </span>
                  }
                  color={request?.status === "pending" ? "warning" : request?.status === "approved" ? "success" : "error"}
                  icon={request?.status === "pending" ? <PauseCircleFilledIcon /> : request?.status === "approved" ? <CheckCircleIcon /> : <CancelIcon />}
                  sx={{
                    fontSize: "1rem",
                    mb: 1,
                  }}
                />
              </Box>
            </Box>
            {request?.type === "oraria" && (
              <Box className="flex flex-col gap-2">
                <Box className="flex gap-4 items-center">
                  <Typography variant="subtitle2" fontWeight={700}>
                    Data richiesta:
                  </Typography>
                  <Typography>{request?.date}</Typography>
                </Box>
                <Box className="flex gap-4 items-center">
                  <Typography variant="subtitle2" fontWeight={700}>
                    Opzioni:
                  </Typography>
                  <Typography>{request?.options?.replaceAll("-", " ")}</Typography>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Orario richiesto:
                  </Typography>
                  <Typography>{request?.time || "-"}</Typography>
                </Box>
                <Box className="flex gap-4 items-center">
                  <Typography variant="subtitle2" fontWeight={700}>
                    Motivo:
                  </Typography>
                  <Typography>{request?.description}</Typography>
                </Box>
              </Box>
            )}
            {request?.type === "ferie" && (
              <Box className="flex flex-col gap-2">
                <Box className="flex gap-4 items-center">
                  <Typography variant="subtitle2" fontWeight={700}>
                    Data inizio:
                  </Typography>
                  <Typography>{request?.date}</Typography>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Data fine:
                  </Typography>
                  <Typography>{request?.dateend}</Typography>
                </Box>
                <Box className="flex gap-4 items-center">
                  <Typography variant="subtitle2" fontWeight={700}>
                    Motivo:
                  </Typography>
                  <Typography>{request?.description}</Typography>
                </Box>
              </Box>
            )}
            {request?.type === "permesso" && (
              <Box className="flex flex-col gap-2">
                <Box className="flex gap-4 items-center">
                  <Typography variant="subtitle2" fontWeight={700}>
                    Data richiesta:
                  </Typography>
                  <Typography>{request?.date}</Typography>
                </Box>
                <Box className="flex gap-4 items-center">
                  <Typography variant="subtitle2" fontWeight={700}>
                    Motivo:
                  </Typography>
                  <Typography>{request?.description}</Typography>
                </Box>
              </Box>
            )}
            {request?.name !== user?.name && request?.lastname !== user?.lastname && request?.status === "pending" && (
              <Box className="flex justify-center gap-4 mt-4">
                <ThumbUpAltRoundedIcon sx={{ fontSize: 40, color: "green", cursor: "pointer" }} onClick={() => handleApprove()} />
                <ThumbDownAltRoundedIcon sx={{ fontSize: 40, color: "red", cursor: "pointer" }} onClick={() => handleReject()} />
              </Box>
            )}
            <Box className="flex gap-4 justify-end mt-5 text-gray-400">
              <Typography variant="subtitle2" fontWeight={700}>
                Created:
              </Typography>
              <Typography>{request?.created_at}</Typography>
              <Typography variant="subtitle2" fontWeight={700}>
                Updated:
              </Typography>
              <Typography>{request?.update_at}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
