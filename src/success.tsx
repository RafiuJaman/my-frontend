import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Go back to the form
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: 4,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Congratulations!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Your claim has been submitted successfully.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleGoBack}
      >
        Go Back to Form
      </Button>
    </Box>
  );
};

export default SuccessPage;
