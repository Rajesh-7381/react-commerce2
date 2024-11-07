import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SendOTP = () => {
  const navigate=useNavigate();


  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        // backgroundColor: '#f5f5f5',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left Side (Logo and Branding) */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(141.69deg, #25064C 0%, rgba(32, 40, 59, 0.6) 100%)',
          color: '#ffffff',
          opacity:0.9,
        }}
      >
        <Typography variant="h2" component="div" fontWeight="bold" letterSpacing={3}>
          DENTIIFY
        </Typography>
      </Box>

      {/* Right Side (OTP Form) */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: '20px', sm: '40px' },
          position: 'relative',
          gap:0,
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
            OTP Verification
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={4}>
            Please enter the 6-digit OTP sent to your ***sk@gmail.com
          </Typography>
          <form noValidate autoComplete="off" >
            <TextField
              label="OTP"
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
              Verify
            </Button>
          </form>

          {/* Static Timer Text and Resend OTP Link */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Didn't get OTP? 
              <Typography 
                variant="body2" 
                color="primary" 
                sx={{ cursor: 'pointer', textDecoration: 'underline', display: 'inline' }}
              >
                Re-send
              </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              00:30
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SendOTP;