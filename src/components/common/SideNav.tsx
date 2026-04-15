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
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 240;

const SideNav: React.FC = () => {
  const location = useLocation();

  const getMenuContent = () => {
    if (location.pathname.startsWith('/caps')) {
      return [
        { text: 'Listado CAPS', icon: <ListIcon />, path: '/caps' },
        { text: 'Nuevo CAPS', icon: <AddCircleOutlinedIcon />, path: '/caps/new' },
      ];
    }
    if (location.pathname.startsWith('/assessments')) {
      return [
        { text: 'Todas las Encuestas', icon: <AssessmentIcon />, path: '/assessments' },
        { text: 'Nueva Encuesta', icon: <AddCircleOutlinedIcon />, path: '/assessments/new' },
      ];
    }
    return [{ text: 'Dashboard General', icon: <DashboardIcon />, path: '/' }];
  };

  const menuItems = getMenuContent();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
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
    </Drawer>
  );
};

export default SideNav;
