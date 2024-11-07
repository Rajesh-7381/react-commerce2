import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box, Drawer } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { CourseIcon, JobIcon, MaterialIcon, ProductIcon, RolesIcon, ServiceIcon, ServiceProviderIcon, UsersIcon } from './Icons';

const menuItems = [
  { name: 'Roles', icon: <RolesIcon />, paths: ['/rolesList', '/addRoles'] },
  { name: 'Users', icon: <UsersIcon />, paths: ['/userList', '/createUser '] },
  { name: 'Product', icon: <ProductIcon />, paths: ['/productList', '/createProduct'] },
  { name: 'Service', icon: <ServiceIcon />, paths: ['/serviceList', '/createService'] },
  { name: 'Service Provider', icon: <ServiceProviderIcon />, paths: ['/serviceProviderList', '/createServiceProvider'] },
  { name: 'Material', icon: <MaterialIcon />, paths: ['/materialList', '/createMaterial'] },
  { name: 'Jobs', icon: <JobIcon />, paths: ['/jobsList', '/createJobs'] },
  { name: 'Courses', icon: <CourseIcon />, paths: ['/courseList', '/createCourse'] },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          backgroundColor: '#439BFF',
          color: '#fff',
          borderRadius: '0px 15px 15px 0px',
          top: '80px',
        },
      }}
    >
      <Box
        component="nav"
        sx={{
          width: '240px',
          position: 'fixed',
          top: '104px',
          left: '16px',
          right: '16px',
          height: 'auto',
        }}
      >
        <List sx={{ padding: '16px 0' }}>
          {menuItems.map((item, index) => {
            const isSelected = item.paths.includes(location.pathname);

            return (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.paths[0]}
                aria-current={isSelected ? 'page' : undefined}
                sx={{
                  color: isSelected ? '#1976d2' : '#fff',
                  backgroundColor: isSelected ? '#fff' : 'transparent',
                  '&:hover': {
                    backgroundColor: isSelected ? '#fff' : '#0d47a1',
                  },
                  borderRadius: '14px',
                  margin: '3px 0px',
                  padding: '10px 16px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  boxShadow: isSelected ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
                  width: 'calc(100% - 32px)',
                }}
              >
                <ListItemIcon sx={{ color: isSelected ? '#1976d2' : '#fff', minWidth: '40px', fontSize: '1.5rem' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ fontWeight: 'normal' }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
