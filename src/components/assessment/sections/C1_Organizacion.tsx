import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Divider,
  Box,
} from '@mui/material';
import type { Assessment, BoardMember, Assembly } from '../../../domain/types/models';

interface C1Props {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
  boardMembers: BoardMember[];
  assemblies: Assembly[];
}

const C1_Organizacion: React.FC<C1Props> = ({
  formData,
  setFormData,
  boardMembers,
  assemblies,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          C1: Organización y Legalización
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Documentación y Legalización
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.legalization.municipalCertificate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    legalization: {
                      ...prev.legalization,
                      municipalCertificate: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Constancia municipal actualizada"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.legalization.inaaRegistration}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    legalization: {
                      ...prev.legalization,
                      inaaRegistration: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Registro ante el INAA"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.legalization.rucNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    legalization: {
                      ...prev.legalization,
                      rucNumber: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Número RUC"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.legalization.differentiatedTariff}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    legalization: {
                      ...prev.legalization,
                      differentiatedTariff: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Tarifa diferenciada (Energía)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.legalization.sapLegalization}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    legalization: {
                      ...prev.legalization,
                      sapLegalization: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Legalización del SAP (Escrituras)"
          />
        </FormGroup>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          select
          fullWidth
          label="¿Cuenta con libros de actas?"
          value={formData.legalization.hasAssemblyRecords}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              legalization: {
                ...prev.legalization,
                hasAssemblyRecords: e.target.value as 'SI' | 'NO' | 'ALGUNAS',
              },
            }))
          }
        >
          <MenuItem value="SI">Sí, al día</MenuItem>
          <MenuItem value="ALGUNAS">Algunas actas</MenuItem>
          <MenuItem value="NO">No cuenta</MenuItem>
        </TextField>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Junta Directiva ({boardMembers.length} miembros)
        </Typography>
        <Box sx={{ p: 2, border: '1px dashed #ccc', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Listado de miembros de la junta directiva (Próximamente editable)
          </Typography>
        </Box>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Asambleas y Reuniones ({assemblies.length})
        </Typography>
        <Box sx={{ p: 2, border: '1px dashed #ccc', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Historial de asambleas y quórum (Próximamente editable)
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default C1_Organizacion;
