import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import type { Assessment } from '../../../domain/types/models';

interface C5Props {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const C5_GIRH: React.FC<C5Props> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          C5: Gestión Integrada del Recurso Hídrico (GIRH)
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.hygieneCampaigns}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, hygieneCampaigns: e.target.checked },
                  }))
                }
              />
            }
            label="Campañas de higiene y lavado de manos"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.cleaningDays}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, cleaningDays: e.target.checked },
                  }))
                }
              />
            }
            label="Jornadas de limpieza de la fuente/sistema"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.recordsMonthlyFlow}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, recordsMonthlyFlow: e.target.checked },
                  }))
                }
              />
            }
            label="Registra caudales mensualmente"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.informsWaterAvailability}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, informsWaterAvailability: e.target.checked },
                  }))
                }
              />
            }
            label="Informa sobre disponibilidad de agua"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.adjustsDistribution}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, adjustsDistribution: e.target.checked },
                  }))
                }
              />
            }
            label="Ajusta distribución en época crítica"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.hasMicromeasurement}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, hasMicromeasurement: e.target.checked },
                  }))
                }
              />
            }
            label="Cuenta con micromedición"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.rechargeAreaIdentified}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, rechargeAreaIdentified: e.target.checked },
                  }))
                }
              />
            }
            label="Área de recarga identificada"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.rechargeAreaCharacterized}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, rechargeAreaCharacterized: e.target.checked },
                  }))
                }
              />
            }
            label="Área de recarga caracterizada (uso de suelo)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.rechargeAreaProtectionPlan}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, rechargeAreaProtectionPlan: e.target.checked },
                  }))
                }
              />
            }
            label="Plan de protección del área de recarga"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.girh.protectionPlanImplemented}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    girh: { ...prev.girh, protectionPlanImplemented: e.target.checked },
                  }))
                }
              />
            }
            label="Plan de protección implementado"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default C5_GIRH;
