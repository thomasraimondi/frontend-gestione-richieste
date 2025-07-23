import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-md p-4 grow">
      <div className="flex flex-col gap-4 bg-white p-[2rem] rounded-md w-1/3 ">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <TextField required id="email" label="Email" variant="outlined" name="email" value={email} onChange={handleChange} />
          </div>
          <Button variant="contained" type="submit" sx={{ backgroundColor: "#114412" }}>
            Send Email
          </Button>
        </form>
      </div>
    </div>
  );
}
