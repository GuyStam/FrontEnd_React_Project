import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";

export default function ScheduleTable({ schedule }) {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontFamily: "Assistant", fontWeight: "bold" }}
      >
        Weekly Timetable
      </Typography>
      <TableContainer component={Paper} sx={{ border: "1px solid #7FC243", borderRadius: "8px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#eafaf1", border: "1px solid #7FC243", borderRadius: "5px", padding: "10px" }}>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "Assistant", border: "1px solid #7FC243" }}>Day</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "Assistant", border: "1px solid #7FC243" }}>Time</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontFamily: "Assistant", border: "1px solid #7FC243" }}>Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((entry, idx) => (
              <TableRow key={idx} sx={{ backgroundColor: "white", border: "1px solid #7FC243", borderRadius: "5px" }}>
                <TableCell sx={{ border: "1px solid #7FC243" }}>{entry.day}</TableCell>
                <TableCell sx={{ border: "1px solid #7FC243" }}>{entry.time}</TableCell>
                <TableCell sx={{ border: "1px solid #7FC243" }}>{entry.courseName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
