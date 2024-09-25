import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import NewPage from "./newPage";
import SuccessPage from "./success";
import FormsTable from "./Table";

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<App />} /> {/* Root path */}
          <Route path="/new-page" element={<NewPage />} /> {/* New page path */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/table" element={<FormsTable />} /> {/* 404 page */}
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
