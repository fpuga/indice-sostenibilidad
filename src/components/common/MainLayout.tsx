import React from 'react';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopNav />
      <SideNav />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
