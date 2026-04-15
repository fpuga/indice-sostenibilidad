import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import type { Assessment } from '../../../domain/types/models';

interface GeneralSectionProps {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const GeneralSection: React.FC<GeneralSectionProps> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Información Básica
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Nombre del Encuestador"
          value={formData.surveyorName}
          onChange={(e) => setFormData((prev) => ({ ...prev, surveyorName: e.target.value }))}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          type="date"
          label="Fecha de la Encuesta"
          value={formData.surveyDate}
          onChange={(e) => setFormData((prev) => ({ ...prev, surveyDate: e.target.value }))}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>
    </Grid>
  );
};

export default GeneralSection;
