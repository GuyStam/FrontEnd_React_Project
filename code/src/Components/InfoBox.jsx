// Components/InfoBox.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export default function InfoBox({ title, content, icon }) {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "1rem",
        minWidth: "300px",
        flex: "1 1 30%",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: "0.5rem" }}>
        {icon}
        <Typography variant="h6" sx={{ fontFamily: "Assistant" }}>
          {title}
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: "Assistant" }}>
        {content || "כאן יעודכן מידע בהמשך"}
      </Typography>
    </Box>
  );
}
