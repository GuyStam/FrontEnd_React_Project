// ScheduleTable.jsx – Displays weekly class schedule in a table
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
      <Typography variant="h5" sx={{ mt: 5, mb: 2, fontWeight: "bold" }}>
        Weekly Timetable
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#eee" }}>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Lecturer</TableCell>
              <TableCell>Lesson #</TableCell>
              <TableCell>Class #</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.courseName}</TableCell>
                <TableCell>{item.lecturer}</TableCell>
                <TableCell>{item.lessonNumber}</TableCell>
                <TableCell>{item.classNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
