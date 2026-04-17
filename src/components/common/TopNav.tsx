import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

interface TopNavProps {
  onDrawerToggle: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ onDrawerToggle }) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'primary.main',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <WaterDropIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, mr: 4, fontFamily: 'Archivo', fontWeight: 700, letterSpacing: 0.5 }}
        >
          IS-JMP
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              opacity: isActive('/') ? 1 : 0.7,
              borderBottom: isActive('/') ? '2px solid white' : 'none',
              borderRadius: 0,
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/caps"
            color="inherit"
            sx={{
              opacity: isActive('/caps') ? 1 : 0.7,
              borderBottom: isActive('/caps') ? '2px solid white' : 'none',
              borderRadius: 0,
            }}
          >
            CAPS
          </Button>
          <Button
            component={Link}
            to="/assessments"
            color="inherit"
            sx={{
              opacity: isActive('/assessments') ? 1 : 0.7,
              borderBottom: isActive('/assessments') ? '2px solid white' : 'none',
              borderRadius: 0,
            }}
          >
            Encuestas
          </Button>
        </Box>
        <Box sx={{ flexGrow: { xs: 1, md: 0 } }} /> {/* Spacer for mobile */}
        <Box>
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.875rem' }}>
              AD
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleClose}>Mi Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Configuración</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
