import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Stack,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AssessmentService } from '../../services/storage/AssessmentService';
import { CapsService } from '../../services/storage/CapsService';
import type { Assessment, AssessmentResult } from '../../domain/types/models';

interface AssessmentWithCaps extends Assessment {
  capsName?: string;
  result?: AssessmentResult;
}

const AssessmentList: React.FC = () => {
  const [view, setView] = useState('table');
  const [assessments, setAssessments] = useState<AssessmentWithCaps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const allAssessments = await AssessmentService.getAll();
      const enriched = await Promise.all(
        allAssessments.map(async (ass) => {
          const caps = await CapsService.getById(ass.capsId);
          return { ...ass, capsName: caps?.name };
        })
      );
      setAssessments(enriched);
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
      <Table sx={{ minWidth: 650 }} aria-label="assessments table">
        <TableHead sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>CAPS</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Encuestador</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="center">
              Resultado
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assessments.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>{row.surveyDate}</TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {row.capsName || 'Desconocido'}
                </Typography>
              </TableCell>
              <TableCell>{row.surveyorName}</TableCell>
              <TableCell align="center">
                {row.result ? (
                  <Chip
                    label={`${row.result.finalScore}% (${row.result.category})`}
                    color={getScoreColor(row.result.category)}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" title="Ver Resultados">
                  <VisibilityIcon fontSize="small" />
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
      {assessments.map((row) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={row.id}>
          <Card variant="outlined">
            <CardContent>
              <Stack
                direction="row"
                sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography variant="caption" color="textSecondary">
                  {row.surveyDate}
                </Typography>
                {row.result && (
                  <Chip
                    label={row.result.category}
                    color={getScoreColor(row.result.category)}
                    size="small"
                    sx={{ fontWeight: 800 }}
                  />
                )}
              </Stack>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {row.capsName}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Encuestador: {row.surveyorName}
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
                  {row.result?.finalScore}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (loading) return <Typography>Cargando...</Typography>;

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

      {view === 'table' ? renderTable() : renderCards()}
    </Box>
  );
};

export default AssessmentList;
