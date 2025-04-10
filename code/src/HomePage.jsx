// HomePage.jsx – Improved with Stats, Timetable & Countdown
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TimerIcon from "@mui/icons-material/Timer";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MessageIcon from "@mui/icons-material/Message";
import InfoBox from "./Components/InfoBox";
import ScheduleTable from "./Components/ScheduleTable";

const getDaysUntil = (dateStr) => {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `${diff} days left` : "Semester ended";
};

const semesterEndDate = "2025-06-30";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [average, setAverage] = useState(null);
  const [lecturerMessage, setLecturerMessage] = useState("");

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }

    const storedAverage = localStorage.getItem("averageGrade");
    if (storedAverage) {
      setAverage(storedAverage);
    }

    const storedMessage = localStorage.getItem("lecturerMessage");
    if (storedMessage) {
      setLecturerMessage(storedMessage);
    }
  }, []);

  const nextAssignment = courses
    .map((c) => c.nextAssignment)
    .filter(Boolean)
    .sort()[0];

  const daysLeft = getDaysUntil(semesterEndDate);

  const sampleSchedule = [
    {
      day: "Sunday",
      time: "10:00 - 12:00",
      courseName: "Math for Business",
      lecturer: "Dr. Cohen",
      classNumber: "101",
      lessonNumber: "1",
    },
    {
      day: "Monday",
      time: "14:00 - 16:00",
      courseName: "Information Systems",
      lecturer: "Ms. Levi",
      classNumber: "202",
      lessonNumber: "2",
    },
    {
      day: "Wednesday",
      time: "12:00 - 14:00",
      courseName: "React Basics",
      lecturer: "Mr. Azulay",
      classNumber: "303",
      lessonNumber: "3",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Assistant",
          textAlign: "center",
          marginBottom: "2rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Welcome to the Improved Student Portal
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <InfoBox icon={<AssignmentIcon />} title="Upcoming Assignments" content={nextAssignment ? `Next due: ${nextAssignment}` : "No upcoming assignments"} />
        <InfoBox icon={<SchoolIcon />} title="Current GPA" content={average || "N/A"} />
        <InfoBox icon={<CalendarTodayIcon />} title="Upcoming Exams" content={nextAssignment ? `Exam on: ${nextAssignment}` : "No exams scheduled"} />
        <InfoBox icon={<TimerIcon />} title="Time Until Semester Ends" content={daysLeft} />
        <InfoBox icon={<ScheduleIcon />} title="Weekly Timetable" content="Displayed below" />
        <InfoBox icon={<MessageIcon />} title="Lecturer Message" content={lecturerMessage || "No message available"} />
      </Box>

      <ScheduleTable schedule={sampleSchedule} />
    </Box>
  );
}
