import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import type { ManagementProblem } from '../../../domain/types/models';

interface C9Props {
  problems: ManagementProblem[];
}

const C9_Autogestion: React.FC<C9Props> = ({ problems }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          C9: Autogestión (Problemas)
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Problemas de Gestión Presentados ({problems.length})
        </Typography>
        <Box sx={{ p: 2, border: '1px dashed #ccc', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Listado de problemas y acciones tomadas (Próximamente editable)
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default C9_Autogestion;
