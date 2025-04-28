import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  Divider,
} from "@mui/material";

const ADMIN_EMAIL = "guyroeiono1@gmail.com";

export default function Help() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem("studentInfo"));
    if (savedInfo) {
      setStudentInfo({
        fullName: savedInfo.fullName,
        email: savedInfo.email,
        phone: savedInfo.phone,
      });
    }
  }, []);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      alert("Please enter a message.");
      return;
    }

    const subject = encodeURIComponent("Support Request");
    const body = encodeURIComponent(
      `From: ${studentInfo.fullName}\nEmail: ${studentInfo.email}\nPhone: ${studentInfo.phone}\n\nMessage:\n${trimmedMessage}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${ADMIN_EMAIL}&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");

    setMessage("");
    setOpen(true);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: "900px", margin: "0 auto" }}>
      {/* כותרת במרכז הדף עם צבע שחור */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Assistant",
          textAlign: "center",
          fontWeight: "bold",
          mb: 3,
          color: "#000", // צבע שחור
        }}
      >
        Help & User Guide
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Welcome to the help page! Here you will find guidance on how to use
        the system. You can also contact us through the form below if you need
        assistance.
      </Typography>

      {/* הסבר על כל עמוד */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 1, color: "#7FC243" }}>
        🏠 **Home Page**
      </Typography>
      <Typography sx={{ mb: 3 }}>
        The Home Page is your dashboard. It displays an overview of your
        assignments, GPA, upcoming exams, and more. Stay on top of your studies!
      </Typography>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 1, color: "#7FC243" }}>
        📋 **Forms**
      </Typography>
      <Typography sx={{ mb: 3 }}>
        The Forms section allows you to view and submit any required forms for
        your courses. You can track deadlines and upload your assignments here.
      </Typography>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 1, color: "#7FC243" }}>
        🛠️ **Management**
      </Typography>
      <Typography sx={{ mb: 3 }}>
        The Management area is for administrators to manage courses, assignments, and other data. It's where you can add or modify course details.
      </Typography>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 1, color: "#7FC243" }}>
        📝 **Info**
      </Typography>
      <Typography sx={{ mb: 3 }}>
        The Info section contains your personal details. You can update your contact information such as your name, email, and phone number here.
      </Typography>

      {/* צור קשר */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" sx={{ mb: 2, color: "#7FC243" }}>
        📩 **Need Help? Send us a message**
      </Typography>

      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <TextField
          label="Your message"
          fullWidth
          multiline
          minRows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{
            backgroundColor: "#F1F8E9",
            borderRadius: 2,
            padding: 2,
            color: "#333",
          }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#7FC242",
            fontFamily: "Assistant",
            fontWeight: "bold",
            textTransform: "none",
          }}
          onClick={handleSend}
        >
          Send
        </Button>
      </Stack>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Gmail compose opened. Ready to send to Admin.
        </Alert>
      </Snackbar>
    </Box>
  );
}
