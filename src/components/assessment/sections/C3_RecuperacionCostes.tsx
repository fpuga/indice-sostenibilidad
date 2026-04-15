import React from 'react';
import { Grid, Typography, TextField, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import type { Assessment } from '../../../domain/types/models';

interface C3Props {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const C3_RecuperacionCostes: React.FC<C3Props> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          C3: Recuperación de Costes
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.costRecovery.hasTariff}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  costRecovery: { ...prev.costRecovery, hasTariff: e.target.checked },
                }))
              }
            />
          }
          label="¿Existe una tarifa establecida?"
        />
      </Grid>
      {formData.costRecovery.hasTariff && (
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="Tipo de Tarifa"
            value={formData.costRecovery.tariffType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                costRecovery: {
                  ...prev.costRecovery,
                  tariffType: e.target.value as any,
                },
              }))
            }
          >
            <MenuItem value="CONSUMO">Por Consumo (Micromedición)</MenuItem>
            <MenuItem value="PROMEDIO">Promedio</MenuItem>
            <MenuItem value="FIJA">Fija</MenuItem>
            <MenuItem value="NO_PAGAN">No pagan</MenuItem>
          </TextField>
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.costRecovery.hasBankAccount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  costRecovery: { ...prev.costRecovery, hasBankAccount: e.target.checked },
                }))
              }
            />
          }
          label="¿Cuenta con cuenta bancaria?"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.costRecovery.hasSavingsForThreeMonths}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  costRecovery: {
                    ...prev.costRecovery,
                    hasSavingsForThreeMonths: e.target.checked,
                  },
                }))
              }
            />
          }
          label="¿Cuenta con ahorros para 3 meses de O&M?"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          select
          fullWidth
          label="Porcentaje de Morosidad"
          value={formData.costRecovery.morosityPercentage}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              costRecovery: {
                ...prev.costRecovery,
                morosityPercentage: e.target.value as any,
              },
            }))
          }
        >
          <MenuItem value="LESS_5">Menos del 5%</MenuItem>
          <MenuItem value="6_15">Entre 6% y 15%</MenuItem>
          <MenuItem value="MORE_15">Más del 15%</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default C3_RecuperacionCostes;
