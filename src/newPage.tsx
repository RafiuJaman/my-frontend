// NewPage.js
import { Typography, Box, Container } from "@mui/material";

function NewPage() {
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
        <Typography variant="h3" component="h1" gutterBottom>
          New Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is the new page content.
        </Typography>
      </Container>
    </Box>
  );
}

export default NewPage;
