import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import InfoBox from "../Components/InfoBox"; // תוודא שהנתיב נכון אצלך
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function Info() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentInfo"));
    if (saved) setInfo(saved);
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
