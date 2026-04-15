import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Stack,
} from '@mui/material';
import type { Assessment } from '../../../domain/types/models';

interface C2Props {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const C2_NivelServicio: React.FC<C2Props> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          C2: Nivel de Servicio (JMP)
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          select
          fullWidth
          label="Tipo de Fuente"
          value={formData.serviceLevel.sourceType}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              serviceLevel: {
                ...prev.serviceLevel,
                sourceType: e.target.value as 'MEJORADA' | 'NO_MEJORADA',
              },
            }))
          }
        >
          <MenuItem value="MEJORADA">Mejorada</MenuItem>
          <MenuItem value="NO_MEJORADA">No Mejorada</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          select
          fullWidth
          label="Ubicación de la toma"
          value={formData.serviceLevel.intakeLocation}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              serviceLevel: {
                ...prev.serviceLevel,
                intakeLocation: e.target.value as Assessment['serviceLevel']['intakeLocation'],
              },
            }))
          }
        >
          <MenuItem value="DENTRO">Dentro de la vivienda</MenuItem>
          <MenuItem value="PATIO">En el patio</MenuItem>
          <MenuItem value="VECINO">En patio del vecino</MenuItem>
          <MenuItem value="PUBLICO">Puesto Público</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          select
          fullWidth
          label="Tiempo de acarreo (ida y vuelta)"
          value={formData.serviceLevel.fetchTime}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              serviceLevel: {
                ...prev.serviceLevel,
                fetchTime: e.target.value as 'MAX_30_MIN' | 'MORE_30_MIN',
              },
            }))
          }
        >
          <MenuItem value="MAX_30_MIN">Menos de 30 min</MenuItem>
          <MenuItem value="MORE_30_MIN">Más de 30 min</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          select
          fullWidth
          label="Disponibilidad de agua"
          value={formData.serviceLevel.waterAvailability}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              serviceLevel: {
                ...prev.serviceLevel,
                waterAvailability: e.target
                  .value as Assessment['serviceLevel']['waterAvailability'],
              },
            }))
          }
        >
          <MenuItem value="SIEMPRE">Siempre</MenuItem>
          <MenuItem value="MAYOR_PARTE">La mayor parte del tiempo</MenuItem>
          <MenuItem value="VECES">A veces</MenuItem>
          <MenuItem value="CASI_NUNCA">Casi nunca</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.serviceLevel.compliesWithEndowment}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  serviceLevel: {
                    ...prev.serviceLevel,
                    compliesWithEndowment: e.target.checked,
                  },
                }))
              }
            />
          }
          label="¿Cumple con la dotación (litros/persona/día)?"
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Percepción de Calidad
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            select
            size="small"
            label="Olor"
            value={formData.serviceLevel.qualityPerception.odor}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                serviceLevel: {
                  ...prev.serviceLevel,
                  qualityPerception: {
                    ...prev.serviceLevel.qualityPerception,
                    odor: e.target.value as 'BUENO' | 'MALO',
                  },
                },
              }))
            }
          >
            <MenuItem value="BUENO">Bueno</MenuItem>
            <MenuItem value="MALO">Malo</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            label="Color"
            value={formData.serviceLevel.qualityPerception.color}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                serviceLevel: {
                  ...prev.serviceLevel,
                  qualityPerception: {
                    ...prev.serviceLevel.qualityPerception,
                    color: e.target.value as 'BUENO' | 'MALO',
                  },
                },
              }))
            }
          >
            <MenuItem value="BUENO">Bueno</MenuItem>
            <MenuItem value="MALO">Malo</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            label="Sabor"
            value={formData.serviceLevel.qualityPerception.flavor}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                serviceLevel: {
                  ...prev.serviceLevel,
                  qualityPerception: {
                    ...prev.serviceLevel.qualityPerception,
                    flavor: e.target.value as 'BUENO' | 'MALO',
                  },
                },
              }))
            }
          >
            <MenuItem value="BUENO">Bueno</MenuItem>
            <MenuItem value="MALO">Malo</MenuItem>
          </TextField>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.serviceLevel.bacteriologicalAnalysisDone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  serviceLevel: {
                    ...prev.serviceLevel,
                    bacteriologicalAnalysisDone: e.target.checked,
                  },
                }))
              }
            />
          }
          label="¿Se realizó análisis bacteriológico?"
        />
      </Grid>
      {formData.serviceLevel.bacteriologicalAnalysisDone && (
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="Resultado del análisis"
            value={formData.serviceLevel.bacteriologicalAnalysisResult}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                serviceLevel: {
                  ...prev.serviceLevel,
                  bacteriologicalAnalysisResult: e.target.value as any,
                },
              }))
            }
          >
            <MenuItem value="NEGATIVO">Negativo (Apto)</MenuItem>
            <MenuItem value="POSITIVO">Positivo (No apto)</MenuItem>
            <MenuItem value="NO_SABE">No sabe</MenuItem>
          </TextField>
        </Grid>
      )}

      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Otras Pruebas Realizadas
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.serviceLevel.otherTests.arsenic}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceLevel: {
                      ...prev.serviceLevel,
                      otherTests: { ...prev.serviceLevel.otherTests, arsenic: e.target.checked },
                    },
                  }))
                }
              />
            }
            label="Arsénico"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.serviceLevel.otherTests.iron}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceLevel: {
                      ...prev.serviceLevel,
                      otherTests: { ...prev.serviceLevel.otherTests, iron: e.target.checked },
                    },
                  }))
                }
              />
            }
            label="Hierro"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.serviceLevel.otherTests.turbidity}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceLevel: {
                      ...prev.serviceLevel,
                      otherTests: {
                        ...prev.serviceLevel.otherTests,
                        turbidity: e.target.checked,
                      },
                    },
                  }))
                }
              />
            }
            label="Turbidez"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.serviceLevel.otherTests.ph}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceLevel: {
                      ...prev.serviceLevel,
                      otherTests: { ...prev.serviceLevel.otherTests, ph: e.target.checked },
                    },
                  }))
                }
              />
            }
            label="pH"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default C2_NivelServicio;
