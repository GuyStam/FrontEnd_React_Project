import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getLecturerMessage,
  setLecturerMessage
} from "../assets/firebase/settings";

export default function Management() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadMessage = async () => {
      const saved = await getLecturerMessage();
      setMessage(saved);
    };
    loadMessage();
  }, []);

  const handleSave = async () => {
    await setLecturerMessage(message);
    setSuccess("Lecturer message updated");
  };

  return (
    <Box sx={{ padding: 3, maxWidth: "900px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Assistant",
          textAlign: "center",
          fontWeight: "bold",
          mb: 3,
          color: "#000",
        }}
      >
        Management Page
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7FC243" }}
          onClick={() => navigate("/management/courses")}
        >
          Manage Courses
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7FC243" }}
          onClick={() => navigate("/management/grades")}
        >
          Manage Grades
        </Button>
      </Box>

      <Typography variant="h5" sx={{ fontFamily: "Assistant", fontWeight: "bold", color: "#000", mb: 2 }}>
        Lecturer Message
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          label="Message for students"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ backgroundColor: "#F1F8E9", borderRadius: 2 }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7FC243" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}
