import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NotificationIcon, ProfileIcon } from './Icons';

const Header = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/rolesList':
      case '/addRoles':
        return 'Roles';
      case '/serviceProviderList':
      case '/createServiceProvider':
        return 'Service Providers';
      case '/productList':
      case '/createProduct':
        return 'Products';
      case '/jobsList':
      case '/createJobs':
        return 'Jobs';
      case '/courseList':
      case '/createCourse':
        return 'Courses';
      case '/materialList':
      case '/createMaterial':
        return 'Materials';
      case '/serviceList':
      case '/createService':
        return 'Services';
      case '/userList':
      case '/createUser ':
        return 'Users';
      default:
        return '';
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ padding: '0 32px', left: '32px' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0' }}>
        <Box display="flex" alignItems="center" sx={{ marginTop: '17px', marginBottom: '16.61px' }}>
          <Box component="img" src="/path-to-your-logo.svg" alt="Logo" sx={{ height: '24px', marginRight: '8px' }} />
          <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>
            DENTIIFY
          </Typography>
          <Typography variant="h6" style={{ color: '#333', fontWeight: 'bold', marginLeft: '24px' }}>
            {getTitle()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            edge="end"
            color="inherit"
            sx={{
              marginRight: '8px',
              padding: '10px',
            }}
          >
            <NotificationIcon style={{ color: '#333' }} />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            sx={{
              padding: '10px',
            }}
          >
            <ProfileIcon style={{ color: '#333' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
