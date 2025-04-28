import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Icons from "./Components/Icons";
import OnoAcademic from "./OnoAcademic.png";

export default function Header() {
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentInfo"));
    if (saved?.fullName) {
      setStudentName(saved.fullName.split(" ")[0]); // ניקח רק את השם הפרטי
    }
  }, []);

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
          <Button component={RouterLink} to="/" sx={navButtonStyle}>
            <Icons name="home" sx={iconStyle} />
            <Typography variant="body2" sx={textStyle}>Home</Typography>
          </Button>
          <Button component={RouterLink} to="/forms" sx={navButtonStyle}>
            <Icons name="forms" sx={iconStyle} />
            <Typography variant="body2" sx={textStyle}>Forms</Typography>
          </Button>
          <Button component={RouterLink} to="/management" sx={navButtonStyle}>
            <Icons name="management" sx={iconStyle} />
            <Typography variant="body2" sx={textStyle}>Management</Typography>
          </Button>
          <Button component={RouterLink} to="/help" sx={navButtonStyle}>
            <Icons name="help" sx={iconStyle} />
            <Typography variant="body2" sx={textStyle}>Help</Typography>
          </Button>
          <Button component={RouterLink} to="/info" sx={navButtonStyle}>
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
          <RouterLink to="/">
            <img
              src={OnoAcademic}
              alt="Ono Academic College Logo"
              style={{ maxHeight: "50px", cursor: "pointer" }}
            />
          </RouterLink>
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
