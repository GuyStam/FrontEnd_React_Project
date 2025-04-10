import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Icons from "./Components/Icons";
import OnoAcademic from "./OnoAcademic.png"


export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#7FC243"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // מפזר את הכפתורים בצד אחד ואת הלוגו בצד השני
          alignItems: "center"
        }}
      >
        {/* אזור הכפתורים */}
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#FFF"
            }}
          >
            <Icons name="home" sx={{ fontSize: 30, color: "#FFF" }} />
            <Typography variant="body2" sx={{ color: "#FFF" }}>
              Home
            </Typography>
          </Button>
          <Button
            component={RouterLink}
            to="/forms"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#FFF"
            }}
          >
            <Icons name="forms" sx={{ fontSize: 30, color: "#FFF" }} />
            <Typography variant="body2" sx={{ color: "#FFF" }}>
              Forms
            </Typography>
          </Button>
          <Button
            component={RouterLink}
            to="/management"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#FFF"
            }}
          >
            <Icons name="management" sx={{ fontSize: 30, color: "#FFF" }} />
            <Typography variant="body2" sx={{ color: "#FFF" }}>
              Management
            </Typography>
          </Button>
          <Button
            component={RouterLink}
            to="/help"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#FFF"
            }}
          >
            <Icons name="help" sx={{ fontSize: 30, color: "#FFF" }} />
            <Typography variant="body2" sx={{ color: "#FFF" }}>
              Help
            </Typography>
          </Button>
          <Button
            component={RouterLink}
            to="/info"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#FFF"
            }}
          >
            <Icons name="info" sx={{ fontSize: 30, color: "#FFF" }} />
            <Typography variant="body2" sx={{ color: "#FFF" }}>
              Info
            </Typography>
          </Button>
        </Box>

        {/* הלוגו מימין */}
        <Box>
  <RouterLink to="/">
    <img
      src={OnoAcademic}
      alt="Ono Logo"
      style={{ maxHeight: "50px", cursor: "pointer" }}
    />
  </RouterLink>
  </Box>
      </Toolbar>
    </AppBar>
  );
}
