import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { getStudentInfo } from "../assets/firebase/student";
import { helpTexts } from "../constants/helpTexts"; // ודא שהנתיב מתאים למיקום שלך

const ADMIN_EMAIL = "guyroeiono1@gmail.com";

export default function Help() {
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ fullName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const info = await getStudentInfo();
      if (info) {
        setStudentInfo({
          fullName: info.fullName || "",
          email: info.email || "",
          phone: info.phone || "",
        });
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSend = () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }
    setOpenConfirm(true);
  };

  const handleConfirmSend = () => {
    const subject = encodeURIComponent("Support Request");
    const body = encodeURIComponent(
      `From: ${studentInfo.fullName}\nEmail: ${studentInfo.email}\nPhone: ${studentInfo.phone}\n\nMessage:\n${message.trim()}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${ADMIN_EMAIL}&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
    setMessage("");
    setOpenSnackbar(true);
    setOpenConfirm(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, maxWidth: 900, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ fontFamily: "Assistant", textAlign: "center", fontWeight: "bold", mb: 3 }}>
        {helpTexts.title}
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>{helpTexts.welcome}</Typography>

      {helpTexts.sections.filter(s => !s.isForm).map((section, i) => (
        <React.Fragment key={i}>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" sx={{ mb: 1, color: "#7FC243" }}>
            {section.title}
          </Typography>
          {section.content && (
            <Typography sx={{ mb: 3 }}>{section.content}</Typography>
          )}
        </React.Fragment>
      ))}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 2, color: "#7FC243" }}>
        {helpTexts.sections.find(s => s.isForm)?.title}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label={helpTexts.labels.message}
          fullWidth
          multiline
          minRows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ backgroundColor: "#F1F8E9", borderRadius: 2, padding: 2 }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "#7FC243", fontFamily: "Assistant", fontWeight: "bold", textTransform: "none" }}
          onClick={handleSend}
        >
          {helpTexts.labels.send}
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {helpTexts.labels.alert}
        </Alert>
      </Snackbar>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>{helpTexts.labels.confirmTitle}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>{helpTexts.labels.confirmCancel}</Button>
          <Button onClick={handleConfirmSend} variant="contained" color="success">
            {helpTexts.labels.confirmSend}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
