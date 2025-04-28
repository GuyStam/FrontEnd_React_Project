import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function Forms() {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: 3, maxWidth: "900px", margin: "0 auto" }}>
      {/* כותרת במרכז הדף */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#000", // צבע שחור
          fontFamily: "Assistant",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Forms Page
      </Typography>
      <Typography sx={{ mb: 3 }}>
        This is a simple forms page with multiple forms.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7FC243" }}
          onClick={() => navigate("/forms/courses")}
        >
          Go to Courses Form
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7FC243" }}
          onClick={() => navigate("/forms/grades")}
        >
          Go to Grades Form
        </Button>
      </Box>
    </Box>
  );
}
