import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MapIcon from '@mui/icons-material/Map';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { CapsService } from '../../services/storage/CapsService';
import { AssessmentService } from '../../services/storage/AssessmentService';
import type { CAPS, Assessment, AssessmentResult } from '../../domain/types/models';

interface CapsWithLatestScore extends CAPS {
  latestAssessment?: Assessment & { result?: AssessmentResult };
}

const CapsList: React.FC = () => {
  const [view, setView] = useState('table');
  const [capsData, setCapsData] = useState<CapsWithLatestScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const allCaps = await CapsService.getAll();
      const enrichedCaps = await Promise.all(
        allCaps.map(async (caps) => {
          const latest = await AssessmentService.getLatestByCapsId(caps.id);
          return { ...caps, latestAssessment: latest };
        })
      );
      setCapsData(enrichedCaps);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleView = (_event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const getScoreColor = (category?: string) => {
    switch (category) {
      case 'A':
        return 'success';
      case 'B':
        return 'warning';
      case 'C':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderTable = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caps table">
        <TableHead sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Nombre del CAPS</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Ubicación</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Tipo de Sistema</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Última Encuesta</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="center">
              Sostenibilidad
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {capsData.map((row) => (
            <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {row.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {row.community}
                </Typography>
              </TableCell>
              <TableCell>{`${row.municipality}, ${row.department}`}</TableCell>
              <TableCell>
                <Chip label={row.systemType} size="small" variant="outlined" />
              </TableCell>
              <TableCell>{row.latestAssessment?.surveyDate || 'N/A'}</TableCell>
              <TableCell align="center">
                {row.latestAssessment?.result ? (
                  <Chip
                    label={`${row.latestAssessment.result.finalScore}% (${row.latestAssessment.result.category})`}
                    color={getScoreColor(row.latestAssessment.result.category)}
                    sx={{ fontWeight: 700, minWidth: 80 }}
                  />
                ) : (
                  <Typography variant="caption" color="textSecondary">
                    Sin datos
                  </Typography>
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" title="Ver Detalles">
                  <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="primary" title="Nueva Encuesta">
                  <AssessmentIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderCards = () => (
    <Grid container spacing={3}>
      {capsData.map((row) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={row.id}>
          <Card
            variant="outlined"
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <Box>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                    {row.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {row.municipality}, {row.department}
                  </Typography>
                </Box>
                {row.latestAssessment?.result && (
                  <Chip
                    label={row.latestAssessment.result.category}
                    color={getScoreColor(row.latestAssessment.result.category)}
                    size="small"
                    sx={{ fontWeight: 800 }}
                  />
                )}
              </Stack>

              <Stack spacing={1}>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                    Tipo de Sistema
                  </Typography>
                  <Typography variant="body2">{row.systemType}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                    Puntuación Sostenibilidad
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {row.latestAssessment?.result
                      ? `${row.latestAssessment.result.finalScore}%`
                      : 'N/A'}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Button fullWidth variant="outlined" size="small" startIcon={<VisibilityIcon />}>
                Ver Ficha
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (loading) {
    return <Typography>Cargando datos...</Typography>;
  }

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

      {view === 'table' && renderTable()}
      {view === 'cards' && renderCards()}
      {view === 'map' && (
        <Paper sx={{ p: 10, textAlign: 'center', backgroundColor: '#f0f4f8' }}>
          <MapIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="textSecondary">
            Vista de Mapa
          </Typography>
          <Typography variant="body2" color="textSecondary">
            La integración con mapas geográficos estará disponible en la siguiente fase.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CapsList;
