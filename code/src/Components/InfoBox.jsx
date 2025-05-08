import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Avatar,
  CircularProgress
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { getStudentInfo, setStudentInfo } from "../assets/firebase/student";

export default function InfoBox() {
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    idNumber: "",
    profilePicture: ""
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInfo = async () => {
      setLoading(true);
      const saved = await getStudentInfo();
      if (saved) setInfo(saved);
      setLoading(false);
    };
    loadInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInfo((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (info.idNumber.length !== 9 || isNaN(info.idNumber)) {
      alert("ID must be exactly 9 digits.");
      return;
    }
    setLoading(true);
    await setStudentInfo(info);
    setLoading(false);
    setOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ width: 320, backgroundColor: "#f9f9f9", boxShadow: 2, borderRadius: 2, p: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          {info.profilePicture ? (
            <Avatar src={info.profilePicture} sx={{ width: 100, height: 100, mb: 2 }} />
          ) : (
            <AssignmentIcon sx={{ fontSize: 60, color: "#7FC243", mb: 2 }} />
          )}
          <Typography variant="h6" sx={{ fontFamily: "Assistant", fontWeight: "bold" }}>
            Student Information
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ mb: 3, backgroundColor: "#7FC243", fontFamily: "Assistant", fontWeight: "bold" }}
          onClick={() => setOpen(true)}
        >
          UPDATE PERSONAL INFO
        </Button>

        <Stack spacing={1} sx={{ fontFamily: "Assistant", color: "#555" }}>
          <Typography><b>Name:</b> {info.fullName || "-"}</Typography>
          <Typography><b>Email:</b> {info.email || "-"}</Typography>
          <Typography><b>Address:</b> {info.address || "-"}</Typography>
          <Typography><b>Phone:</b> {info.phone || "-"}</Typography>
          <Typography><b>ID Number:</b> {info.idNumber || "-"}</Typography>
        </Stack>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle sx={{ fontFamily: "Assistant", textAlign: "center", color: "#7FC243" }}>
            Update Personal Info
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField name="fullName" label="Full Name" value={info.fullName} onChange={handleChange} fullWidth />
              <TextField name="email" label="Email" type="email" value={info.email} onChange={handleChange} fullWidth />
              <TextField name="phone" label="Phone" value={info.phone} onChange={handleChange} fullWidth />
              <TextField name="address" label="Address" value={info.address} onChange={handleChange} fullWidth />
              <TextField name="idNumber" label="ID Number (9 digits)" value={info.idNumber} onChange={handleChange} inputProps={{ maxLength: 9 }} fullWidth />
              <Button variant="outlined" component="label" sx={{ fontFamily: "Assistant", fontWeight: "bold" }}>
                Upload Profile Picture
                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", p: 2 }}>
            <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "#7FC243", fontFamily: "Assistant", fontWeight: "bold", minWidth: 100 }}>
              {loading ? <CircularProgress size={24} /> : "SUBMIT"}
            </Button>
            <Button onClick={() => setOpen(false)} variant="contained" sx={{ backgroundColor: "#e53935", fontFamily: "Assistant", fontWeight: "bold", minWidth: 100 }}>
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
