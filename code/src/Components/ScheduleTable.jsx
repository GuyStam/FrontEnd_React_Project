// Components/ScheduleTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function ScheduleTable({ schedule }) {
  return (
    <TableContainer component={Paper} sx={{ border: "2px solid #7FC243", marginTop: "2rem" }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", padding: "1rem", fontFamily: "Assistant" }}
      >
        Weekly Schedule
      </Typography>
      <Table>
        <TableHead sx={{ backgroundColor: "#f4fff0" }}>
          <TableRow>
            <TableCell><strong>Day</strong></TableCell>
            <TableCell><strong>Time</strong></TableCell>
            <TableCell><strong>Course</strong></TableCell>
            <TableCell><strong>Lecturer</strong></TableCell>
            <TableCell><strong>Lesson #</strong></TableCell>
            <TableCell><strong>Classroom</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((lesson, index) => (
            <TableRow key={index}>
              <TableCell>{lesson.day}</TableCell>
              <TableCell>{lesson.time}</TableCell>
              <TableCell>{lesson.courseName}</TableCell>
              <TableCell>{lesson.lecturer}</TableCell>
              <TableCell>{lesson.lessonNumber}</TableCell>
              <TableCell>{lesson.classNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
