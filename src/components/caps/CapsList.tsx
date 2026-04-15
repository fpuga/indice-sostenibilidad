import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MapIcon from '@mui/icons-material/Map';
import AddIcon from '@mui/icons-material/Add';

const CapsList: React.FC = () => {
  const [view, setView] = React.useState('table');

  const handleView = (_event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Comités (CAPS)
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Nuevo CAPS
        </Button>
      </Stack>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleView}
            aria-label="view switcher"
            size="small"
          >
            <ToggleButton value="table" aria-label="table view">
              <ViewListIcon sx={{ mr: 1 }} /> Tabla
            </ToggleButton>
            <ToggleButton value="cards" aria-label="cards view">
              <ViewModuleIcon sx={{ mr: 1 }} /> Tarjetas
            </ToggleButton>
            <ToggleButton value="map" aria-label="map view">
              <MapIcon sx={{ mr: 1 }} /> Mapa
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Paper>

      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1">
          El listado de CAPS en vista "{view}" se mostrará aquí.
        </Typography>
      </Paper>
    </Box>
  );
};

export default CapsList;
