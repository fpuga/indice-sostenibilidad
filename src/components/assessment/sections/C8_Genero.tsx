import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import type { Assessment } from '../../../domain/types/models';

interface C8Props {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const C8_Genero: React.FC<C8Props> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          C8: Género
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.gender.genderAdendum}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: { ...prev.gender, genderAdendum: e.target.checked },
                  }))
                }
              />
            }
            label="¿Cuenta con adéndum de género?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.gender.genderActionsCompliance}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: { ...prev.gender, genderActionsCompliance: e.target.checked },
                  }))
                }
              />
            }
            label="¿Cumple con acciones de género programadas?"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default C8_Genero;
