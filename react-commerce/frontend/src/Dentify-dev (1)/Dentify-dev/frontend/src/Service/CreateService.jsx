import React from 'react';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { Box, Button, Container, Grid, TextField, Typography, InputAdornment } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const CreateService  = () => {
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
            <Typography variant="h6">Create Service</Typography>
          </Box>

          {/* Form Fields */}
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* First Row */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Service Name"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Service Category"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Digital Marketing Service"
                  type="text"
                  fullWidth
                />
              </Grid>

              {/* Second Row */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Address"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Mobile Number"
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
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Service Price"
                  type="text"
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

export default CreateService ;