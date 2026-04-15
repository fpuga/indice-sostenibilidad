import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, Grid, Card, CardContent, Stack, Divider } from '@mui/material';
import { CapsService } from '../services/storage/CapsService';
import { AssessmentService } from '../services/storage/AssessmentService';
import WaterIcon from '@mui/icons-material/Water';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalCaps: 0,
    totalAssessments: 0,
    avgScore: 0,
    categoryCounts: { A: 0, B: 0, C: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      const caps = await CapsService.getAll();
      const assessments = await AssessmentService.getAll();

      const results = assessments.map((a) => a.result).filter(Boolean);
      const sum = results.reduce((acc, r) => acc + (r?.finalScore || 0), 0);
      const avg = results.length > 0 ? Math.round(sum / results.length) : 0;

      const counts = results.reduce(
        (acc, r) => {
          if (r?.category) acc[r.category]++;
          return acc;
        },
        { A: 0, B: 0, C: 0 }
      );

      setStats({
        totalCaps: caps.length,
        totalAssessments: assessments.length,
        avgScore: avg,
        categoryCounts: counts,
      });
    };
    fetchData();
  }, []);

  const getAvgColor = (score: number) => {
    if (score >= 80) return 'success.main';
    if (score >= 60) return 'warning.main';
    return 'error.main';
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Dashboard de Sostenibilidad
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={2}>
            <CardContent>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ p: 1, backgroundColor: 'rgba(0, 76, 140, 0.1)', borderRadius: 2 }}>
                  <WaterIcon color="primary" />
                </Box>
                <Box>
                  <Typography color="textSecondary" variant="caption" sx={{ fontWeight: 600 }}>
                    TOTAL CAPS
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.totalCaps}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={2}>
            <CardContent>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ p: 1, backgroundColor: 'rgba(46, 125, 50, 0.1)', borderRadius: 2 }}>
                  <AssessmentIcon color="success" />
                </Box>
                <Box>
                  <Typography color="textSecondary" variant="caption" sx={{ fontWeight: 600 }}>
                    ENCUESTAS
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.totalAssessments}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={2}>
            <CardContent>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ p: 1, backgroundColor: 'rgba(245, 124, 0, 0.1)', borderRadius: 2 }}>
                  <TrendingUpIcon color="warning" />
                </Box>
                <Box>
                  <Typography color="textSecondary" variant="caption" sx={{ fontWeight: 600 }}>
                    ÍNDICE PROMEDIO
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: getAvgColor(stats.avgScore) }}
                  >
                    {stats.avgScore}%
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Distribución por Categoría
            </Typography>
            <Stack spacing={3}>
              <Box>
                <Stack direction="row" sx={{ mb: 1, justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Categoría A (Sostenible)
                  </Typography>
                  <Typography variant="body2">{stats.categoryCounts.A} CAPS</Typography>
                </Stack>
                <Box
                  sx={{
                    height: 8,
                    width: '100%',
                    backgroundColor: '#eee',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(stats.categoryCounts.A / stats.totalCaps) * 100}%`,
                      backgroundColor: 'success.main',
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Stack direction="row" sx={{ mb: 1, justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Categoría B (En Riesgo Leve)
                  </Typography>
                  <Typography variant="body2">{stats.categoryCounts.B} CAPS</Typography>
                </Stack>
                <Box
                  sx={{
                    height: 8,
                    width: '100%',
                    backgroundColor: '#eee',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(stats.categoryCounts.B / stats.totalCaps) * 100}%`,
                      backgroundColor: 'warning.main',
                    }}
                  />
                </Box>
              </Box>

              <Box>
                <Stack direction="row" sx={{ mb: 1, justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Categoría C (Crítico)
                  </Typography>
                  <Typography variant="body2">{stats.categoryCounts.C} CAPS</Typography>
                </Stack>
                <Box
                  sx={{
                    height: 8,
                    width: '100%',
                    backgroundColor: '#eee',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(stats.categoryCounts.C / stats.totalCaps) * 100}%`,
                      backgroundColor: 'error.main',
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Información del Proyecto
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Este sistema automatiza el cálculo del Índice de Sostenibilidad para Comités de Agua
              Potable y Saneamiento (CAPS) en Nicaragua.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
              CRITERIOS EVALUADOS:
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
              • Organización y Aspectos Legales
              <br />
              • Nivel de Servicio
              <br />
              • Recuperación de Costes
              <br />
              • Operación y Mantenimiento
              <br />
              • Gestión Integrada de RRHH
              <br />
              • Rendición de Cuentas
              <br />
              • Conservación de Infraestructura
              <br />
              • Enfoque de Género
              <br />• Autogestión
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
