import React from 'react';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { Box, Button, Container, Grid, MenuItem, TextField, Typography, InputAdornment } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Flag } from 'react-world-flags'; // or use any flag library

const CreateUser = () => {
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
            <ArrowBackIosNewIcon sx={{ cursor: 'pointer', mr: 1 }} />
            <Typography variant="h6">Create User</Typography>
          </Box>

          {/* Form Title */}
          {/* <Typography variant="h5" gutterBottom>
            Add Role
          </Typography> */}

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

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                />
              </Grid>

              {/* Mobile number field with country flag */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Mobile number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src="https://flagcdn.com/w20/in.png" // Replace with appropriate flag URL or icon
                          alt="India"
                          style={{ width: 20, height: 15 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* WhatsApp number field with WhatsApp icon */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="WhatsApp number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WhatsAppIcon color="success" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Hospital Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Dental Lab name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Radiology Center"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Material Supplier Name"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Registration ID (Role is dentist)"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="GST Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Designation"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Assign Role"
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

export default CreateUser;
