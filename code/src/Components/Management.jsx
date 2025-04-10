import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export default function Management() {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Management Menu
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Please choose a form to manage:
      </Typography>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#7FC242", mr: 2 }}
        onClick={() => navigate("/management/courses")}
      >
        Manage Courses
      </Button>
    </div>
  );
}
