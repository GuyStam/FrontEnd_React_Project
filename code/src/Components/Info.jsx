// Info.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import InfoBox from "../Components/InfoBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { getStudentInfo } from "../assets/firebase/student";

function Info() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const load = async () => {
      const saved = await getStudentInfo();
      if (saved) setInfo(saved);
    };
    load();
  }, []);

  const buildContent = () => {
    if (!info) return null;

    return (
      <span>
        <strong>Name:</strong> {info.fullName || "-"}<br />
        <strong>Email:</strong> {info.email || "-"}<br />
        <strong>Address:</strong> {info.address || "-"}<br />
        <strong>Phone:</strong> {info.phone || "-"}<br />
        <strong>ID Number:</strong> {info.idNumber || "-"}
      </span>
    );
  };

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <InfoBox
        icon={<AssignmentIcon sx={{ fontSize: 40, color: "#7FC243" }} />}
        title="Student Information"
        content={buildContent()}
      />
    </Box>
  );
}

export function InfoStats() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Insights & Information
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Here you can find useful insights and stats about your activity in the system.
      </Typography>
    </Box>
  );
}

export default Info;
