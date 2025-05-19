import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/jobPortal.png";
import "../App.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <img className="logo" src={logo} alt="Job Portal" />
          </Box>
            {/* <Typography variant="h6" component="div" >
          Job Portal
          </Typography> */}
            {token ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
