import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";  // ייבוא של useNavigate
import Icons from "./Components/Icons";
import OnoAcademic from "./OnoAcademic.png";

export default function Header() {
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();  // יצירת הפונקציה navigate

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentInfo"));
    if (saved?.fullName) {
      setStudentName(saved.fullName.split(" ")[0]); // ניקח רק את השם הפרטי
    }
  }, []);

  const handleNavigate = (path) => {
    navigate(path);  // ניווט לדף הרצוי
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#7FC243",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* אזור הכפתורים */}
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button onClick={() => handleNavigate("/")} sx={navButtonStyle}>
            <Icons name="home" sx={iconStyle} />
            <Typography variant="body2" sx={textStyle}>Home</Typography>
          </Button>
          <Button onClick={() => handleNavigate("/forms")} sx={navButtonStyle}>
            <Icons name="forms" sx={iconStyle} />
            <Typography variant="body2" sx={textStyle}>Forms</Typography>
          </Button>
          <Button onClick={() => handleNavigate("/management")} sx={navButtonStyle}>
            <Icons name="management" sx={iconStyle} />
            <Typography variant="body2" sx={textStyle}>Management</Typography>
          </Button>
          <Button onClick={() => handleNavigate("/help")} sx={navButtonStyle}>
            <Icons name="help" sx={iconStyle} />
            <Typography variant="body2" sx={textStyle}>Help</Typography>
          </Button>
          <Button onClick={() => handleNavigate("/info")} sx={navButtonStyle}>
            <Icons name="info" sx={iconStyle} />
            <Typography variant="body2" sx={textStyle}>Personal Info</Typography>
          </Button>
        </Box>

        {/* אזור הימני: ברוך הבא + לוגו */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {studentName && (
            <Typography sx={{ color: "white", fontFamily: "Assistant", fontWeight: "bold" }}>
              Hello, {studentName}
            </Typography>
          )}
          <Button onClick={() => handleNavigate("/")} sx={{ padding: 0 }}>
            <img
              src={OnoAcademic}
              alt="Ono Academic College Logo"
              style={{ maxHeight: "50px", cursor: "pointer" }}
            />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// סטיילינג שחוזר על עצמו
const navButtonStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#FFF",
  textTransform: "none",
};

const iconStyle = {
  fontSize: 30,
  color: "#FFF",
};

const textStyle = {
  color: "#FFF",
  fontFamily: "Assistant",
  fontWeight: "bold",
};
