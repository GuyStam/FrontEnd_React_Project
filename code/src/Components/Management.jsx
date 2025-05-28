import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function Management() {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 3, maxWidth: "900px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#000",
          fontFamily: "Assistant",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        Management Panel
      </Typography>

      <Typography sx={{ mb: 3, fontFamily: "Assistant" }}>
        Here you can edit, add, or remove academic data.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7FC243", fontFamily: "Assistant", fontWeight: "bold" }}
          onClick={() => navigate("/management/courses")}
        >
          Manage Courses
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7FC243", fontFamily: "Assistant", fontWeight: "bold" }}
          onClick={() => navigate("/management/grades")}
        >
          Manage Grades
        </Button>
      </Box>
    </Box>
  );
}
