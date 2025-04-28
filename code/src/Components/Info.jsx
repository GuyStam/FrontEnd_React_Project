<<<<<<< HEAD
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
=======
// Info.jsx – Insights & Dashboard Overview
import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

export default function Info() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Insights & Information
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Here you can find useful insights and stats about your activity in the system. These will help you track progress, upcoming deadlines, and your overall academic view.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">📚 Total Courses</Typography>
              <Typography variant="h4">6</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">📝 Assignments Due This Week</Typography>
              <Typography variant="h4">2</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">📅 Next Class</Typography>
              <Typography variant="h5">April 14, 2025</Typography>
              <Typography variant="body2">Course: Web Development</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">📈 GPA (Current)</Typography>
              <Typography variant="h4">3.6</Typography>
              <Typography variant="body2">Updated weekly based on grades</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">📊 Submission Rate</Typography>
              <Typography variant="h4">87%</Typography>
              <Typography variant="body2">Assignments submitted on time</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
>>>>>>> 6819656cafc50b41b1097fa39756a01acd9abcef
    </Box>
  );
}
