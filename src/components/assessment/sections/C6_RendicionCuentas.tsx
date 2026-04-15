import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import type { Assessment } from '../../../domain/types/models';

interface C6Props {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const C6_RendicionCuentas: React.FC<C6Props> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          C6: Rendición de Cuentas
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.accountability.informsEconomicStatus}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accountability: {
                      ...prev.accountability,
                      informsEconomicStatus: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Informa estado económico a la asamblea"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.accountability.monthlyAccountabilityToBoard}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accountability: {
                      ...prev.accountability,
                      monthlyAccountabilityToBoard: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Rendición de cuentas mensual a la JD"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.accountability.accountingBookUpdated}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accountability: {
                      ...prev.accountability,
                      accountingBookUpdated: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Libro de contabilidad al día"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.accountability.usersBookUpdated}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accountability: { ...prev.accountability, usersBookUpdated: e.target.checked },
                  }))
                }
              />
            }
            label="Libro de usuarios al día"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.accountability.minutesBookUpdated}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accountability: {
                      ...prev.accountability,
                      minutesBookUpdated: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Libro de actas al día"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.accountability.morosityReported}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    accountability: { ...prev.accountability, morosityReported: e.target.checked },
                  }))
                }
              />
            }
            label="Informa morosidad a la asamblea"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default C6_RendicionCuentas;
