// Help.jsx – Help & User Guide with clear cards and links
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Stack,
  TextField,
  Snackbar,
  Alert,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setOpen(true);
      setMessage("");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Help & User Guide
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        This page provides a clear overview of how to use the system step-by-step, from navigation to managing your data. Use the cards below to access detailed instructions.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">🏠 Home Page</Typography>
              <Typography>
                Start from the home page to get a general view of the system. From here, you can navigate to any section.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/")}>Go to Home</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">📋 Forms Area</Typography>
              <Typography>
                In the Forms area, you can view course data in read-only mode. You can filter and sort data using the toolbar.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/forms")}>Go to Forms</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">🛠 Management Area</Typography>
              <Typography>
                Administrators can manage course data: add, edit, delete, upload and download courses in JSON format.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/management")}>Go to Management</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">💾 Saving & Loading Data</Typography>
              <Typography>
                Use the "Upload" and "Download" buttons in the Management area to save a backup or restore previous course data from a file.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate("/management/courses")}>Manage Courses</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        📩 Need Help? Send us a message:
      </Typography>

      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <TextField
          label="Your message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" sx={{ backgroundColor: "#7FC242" }} onClick={handleSend}>
          Send
        </Button>
      </Stack>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>Message sent successfully!</Alert>
      </Snackbar>
    </Box>
  );
}
