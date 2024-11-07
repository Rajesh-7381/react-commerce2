import React from 'react';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { Box, Button, Container, Grid, TextField, Typography, InputAdornment } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const CreateMaterial  = () => {
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
            <Typography variant="h6">Create Material</Typography>
          </Box>

          {/* Form Fields */}
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Material Name"
                  required
                  fullWidth
                  placeholder="Enter material name"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Material Category"
                  required
                  fullWidth
                  placeholder="Enter material category"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Supplier Name"
                  type="text"
                  fullWidth
                  placeholder="Enter supplier name"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Supplier Address"
                  type="text"
                  fullWidth
                  placeholder="Enter supplier address"
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} sm={6} md={3}>
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
                  placeholder="Enter mobile number"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Supplier Email"
                  type="email"
                  fullWidth
                  placeholder="Enter supplier email"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Manufacturer Name"
                  fullWidth
                  placeholder="Enter manufacturer name"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Manufacturer Address"
                  fullWidth
                  placeholder="Enter manufacturer address"
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Manufacturer Contact Number"
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
                  placeholder="Enter contact number"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Manufacturer Email"
                  fullWidth
                  placeholder="Enter manufacturer email"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Material Cost Price"
                  fullWidth
                  placeholder="Enter cost price"
                />

              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="MRP"
                  fullWidth
                  placeholder="Enter MRP"
                />
              </Grid>

              {/* Row 4 */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="GST Type"
                  fullWidth
                  placeholder="Enter GST type"
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

export default CreateMaterial ;