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
  Avatar
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function InfoBox() {
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    idNumber: "",
    profilePicture: "" // תמונת פרופיל
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentInfo"));
    if (saved) setInfo(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (info.idNumber.length !== 9 || isNaN(info.idNumber)) {
      alert("ID must be exactly 9 digits.");
      return;
    }
    localStorage.setItem("studentInfo", JSON.stringify(info));
    setOpen(false);
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

  return (
    <Card sx={{ width: 320, backgroundColor: "#f9f9f9", boxShadow: 2, borderRadius: 2, p: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          {/* תמונת פרופיל */}
          {info.profilePicture ? (
            <Avatar
              src={info.profilePicture}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          ) : (
            <AssignmentIcon sx={{ fontSize: 60, color: "#7FC243", mb: 2 }} />
          )}

          <Typography variant="h6" sx={{ fontFamily: "Assistant", fontWeight: "bold" }}>
            Student Information
          </Typography>
        </Box>

        {/* כפתור לפתיחת פופאפ */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mb: 3, backgroundColor: "#7FC243", fontFamily: "Assistant", fontWeight: "bold" }}
          onClick={() => setOpen(true)}
        >
          UPDATE PERSONAL INFO
        </Button>

        {/* הצגת מידע מתחת לכפתור */}
        <Stack spacing={1} sx={{ fontFamily: "Assistant", color: "#555" }}>
          <Typography><b>Name:</b> {info.fullName || "-"}</Typography>
          <Typography><b>Email:</b> {info.email || "-"}</Typography>
          <Typography><b>Address:</b> {info.address || "-"}</Typography>
          <Typography><b>Phone:</b> {info.phone || "-"}</Typography>
          <Typography><b>ID Number:</b> {info.idNumber || "-"}</Typography>
        </Stack>

        {/* פופאפ טופס */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle sx={{ fontFamily: "Assistant", textAlign: "center", color: "#7FC243" }}>
            Update Personal Info
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                name="fullName"
                label="Full Name"
                value={info.fullName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={info.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="phone"
                label="Phone"
                value={info.phone}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="address"
                label="Address"
                value={info.address}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="idNumber"
                label="ID Number (9 digits)"
                value={info.idNumber}
                onChange={handleChange}
                inputProps={{ maxLength: 9 }}
                fullWidth
              />
              {/* קלט להעלאת תמונה */}
              <Button
                variant="outlined"
                component="label"
                sx={{ fontFamily: "Assistant", fontWeight: "bold" }}
              >
                Upload Profile Picture
                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", p: 2 }}>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ backgroundColor: "#7FC243", fontFamily: "Assistant", fontWeight: "bold", minWidth: 100 }}
            >
              SUBMIT
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              sx={{ backgroundColor: "#e53935", fontFamily: "Assistant", fontWeight: "bold", minWidth: 100 }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
