import React from 'react'
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const ForgotPassword = () => {
  return (
    <div>
      <Box
        sx={{
        display: 'flex',
        minHeight: '100vh',
        // backgroundColor: '#f5f5f5',
        flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on small screens
        }}
     >
    {/* Left Side (Logo and Branding) */}
    <Box
      sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' }, // Hide on extra small screens
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(141.69deg, #25064C 0%, rgba(32, 40, 59, 0.6) 100%)',
        color: '#ffffff',
        opacity:0.9
      }}
    >
      <Typography variant="h2" component="div" fontWeight="bold" letterSpacing={3}>
        DENTIIFY
      </Typography>
    </Box>

    {/* Right Side (Login Form) */}
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: '20px', sm: '40px' }, // More padding on smaller screens
        position: 'relative', // For centering the copyright text
        gap:0
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: '30px', sm: '40px' },
          width: { xs: '90%', sm: '70%', md: '60%', lg: '50%' },
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" mb={2}>
          Forgot Password
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={4}>
          Please enter your Registered email to send OTP
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, padding: '10px' }}
          >
            Send OTP
          </Button>
        </form>
      </Paper>
      
      {/* Copyright Text */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mt: 2, textAlign: 'center', position: 'absolute', bottom: 16 }}
      >
        &copy; Copyright 2024 Dentiiify Admin Portal
      </Typography>
    </Box>
      </Box>
    </div>
  )
}

export default ForgotPassword