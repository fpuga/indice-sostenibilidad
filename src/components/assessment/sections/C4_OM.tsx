import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox } from '@mui/material';
import type { Assessment } from '../../../domain/types/models';

interface C4Props {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const C4_OM: React.FC<C4Props> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          C4: Operación y Mantenimiento
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.operationAndMaintenance.hasOmPlan}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  operationAndMaintenance: {
                    ...prev.operationAndMaintenance,
                    hasOmPlan: e.target.checked,
                  },
                }))
              }
            />
          }
          label="¿Cuenta con plan de O&M?"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.operationAndMaintenance.executesOmPlan}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  operationAndMaintenance: {
                    ...prev.operationAndMaintenance,
                    executesOmPlan: e.target.checked,
                  },
                }))
              }
            />
          }
          label="¿Ejecuta el plan de O&M?"
        />
      </Grid>
    </Grid>
  );
};

export default C4_OM;
