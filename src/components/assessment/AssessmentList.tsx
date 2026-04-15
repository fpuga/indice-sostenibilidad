import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Stack,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const AssessmentList: React.FC = () => {
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
          Encuestas de Sostenibilidad
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Nueva Encuesta
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
          </ToggleButtonGroup>
        </Stack>
      </Paper>

      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1">
          Todas las encuestas realizadas se listarán aquí en vista "{view}".
        </Typography>
      </Paper>
    </Box>
  );
};

export default AssessmentList;
