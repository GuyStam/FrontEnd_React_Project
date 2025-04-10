// InfoBox.jsx – A reusable summary card component
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function InfoBox({ icon, title, content }) {
  return (
    <Card sx={{ width: 260, minHeight: 140, display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#f9f9f9" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ mr: 1 }}>{icon}</Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "#555" }}>
          {content || "No data available"}
        </Typography>
      </CardContent>
    </Card>
  );
}
