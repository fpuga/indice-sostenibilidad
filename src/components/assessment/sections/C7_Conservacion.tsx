import React from 'react';
import { Grid, Typography } from '@mui/material';
import type { Assessment, CAPS } from '../../../domain/types/models';
import MabeConservation from './conservation/MabeConservation';
import MagConservation from './conservation/MagConservation';
import WellConservation from './conservation/WellConservation';

interface C7Props {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
  caps: CAPS | null;
}

const C7_Conservacion: React.FC<C7Props> = ({ formData, setFormData, caps }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          C7: Conservación (Infraestructura)
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Evaluación del estado físico del sistema ({caps?.systemType})
        </Typography>
      </Grid>

      {(caps?.systemType === 'MABE' || caps?.systemType === 'MIXTO') && (
        <MabeConservation formData={formData} setFormData={setFormData} />
      )}

      {caps?.systemType === 'MAG' && (
        <MagConservation formData={formData} setFormData={setFormData} />
      )}

      {(caps?.systemType === 'POZO_EXCAVADO' || caps?.systemType === 'POZO_PERFORADO') && (
        <WellConservation formData={formData} setFormData={setFormData} />
      )}
    </Grid>
  );
};

export default C7_Conservacion;
