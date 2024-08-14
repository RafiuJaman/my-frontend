import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Container,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import "./App.css";
import TableComponent from "./tableComponent";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

function App() {
  const { data, error } = useSWR("http://localhost:3001", fetcher);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/new-page"); // Navigate to the new page
  };

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
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleButtonClick}
              >
                Go to New Page
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <TableComponent />
    </Box>
  );
}

export default App;
