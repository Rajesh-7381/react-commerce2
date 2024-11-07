import React from 'react';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { Box, Button, Container, Grid, MenuItem, TextField, Typography, InputAdornment } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Flag } from 'react-world-flags'; 
import { Link } from 'react-router-dom';

const AddRoles = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <SideBar />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Header />

        {/* Form Container */}
        <Container>
          {/* Back Button and Title */}
          <Box display="flex" alignItems="center" mb={2}>
            <Link to={"/rolesList"}><ArrowBackIosNewIcon sx={{ cursor: 'pointer', mr: 1 }}  /></Link>
            <Typography variant="h6">Add Role</Typography>
          </Box>

   

          {/* Form Fields */}
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Prefix"
                  select
                  required
                  fullWidth
                  defaultValue=""
                >
                  <MenuItem value="Mr.">Mr.</MenuItem>
                  <MenuItem value="Ms.">Ms.</MenuItem>
                  <MenuItem value="Dr.">Dr.</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Type of user"
                  select
                  required
                  fullWidth
                  defaultValue=""
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Doctor">Doctor</MenuItem>
                  <MenuItem value="Patient">Patient</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="First name"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Last name"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        </Container>

        {/* Footer */}
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default AddRoles;
