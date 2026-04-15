import React from 'react';
import { Typography, Paper, Box, Grid, Card, CardContent } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Panel de Control (Dashboard)
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total CAPS
              </Typography>
              <Typography variant="h5">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Encuestas Realizadas
              </Typography>
              <Typography variant="h5">128</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Índice Promedio
              </Typography>
              <Typography variant="h5" color="warning.main">
                72% (B)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1">Visualizaciones y gráficos de resumen aquí.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
