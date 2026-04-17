import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Divider,
} from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 240;

interface SideNavProps {
  mobileOpen?: boolean;
  handleDrawerToggle?: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();

  const getMenuContent = () => {
    if (location.pathname.startsWith('/caps')) {
      return [{ text: 'Listado CAPS', icon: <ListIcon />, path: '/caps' }];
    }
    if (location.pathname.startsWith('/assessments')) {
      return [{ text: 'Todas las Encuestas', icon: <AssessmentIcon />, path: '/assessments' }];
    }
    return [{ text: 'Dashboard General', icon: <DashboardIcon />, path: '/' }];
  };

  const menuItems = getMenuContent();

  const getMobileOnlyMenuContent = () => {
    return [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
      { text: 'CAPS', icon: <ListIcon />, path: '/caps' },
      { text: 'Encuestas', icon: <AssessmentIcon />, path: '/assessments' },
    ];
  };

  const drawerContent = (
    <>
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        {/* Mobile Main Menu Links */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <List>
            {getMobileOnlyMenuContent().map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  selected={
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path)
                  }
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 76, 140, 0.08)',
                      borderRight: '4px solid #004C8C',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname.startsWith(item.path) ? 'primary.main' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
        </Box>

        {/* Contextual Links */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 76, 140, 0.08)',
                    borderRight: '4px solid #004C8C',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 76, 140, 0.12)',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: location.pathname === item.path ? 600 : 400,
                        color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
      </Box>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #e0e0e0',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default SideNav;
