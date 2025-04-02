// Forms.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Forms() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Forms Page</h2>
      <p>This is a simple forms page with multiple forms.</p>

      {/* כפתור שמוביל לטופס הקורסים */}
      <Button sx={{backgroundColor: "#7FC242"}}variant="contained" onClick={() => navigate("/forms/courses")}>
        Go to Courses Form
      </Button>
    </div>
  );
}
