import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, Container } from "@mui/material";
import useSWR from "swr";
import "./App.css";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

function App() {
  // SWR approach
  const { data, error } = useSWR("http://localhost:3001", fetcher);

  // useState and useEffect approach (commented out)
  /*
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        console.log("Received data:", data);
        setData(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setError("Failed to load data: " + error.message);
      });
  }, []);
  */

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
                {error ? `Error: ${error.message}` : data ? data : "Loading..."}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;
