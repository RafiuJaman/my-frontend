import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, Container } from "@mui/material";
import "./App.css";

function App() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => setData(JSON.stringify(data)))
      .catch((error) => setError("Failed to load data"));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={3}>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Hello World
            </Typography>
            <Box mt={2}>
              <Typography variant="body1" color="text.secondary">
                {error ? error : data ? data : "Loading..."}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;
