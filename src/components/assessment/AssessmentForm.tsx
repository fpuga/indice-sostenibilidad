import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FormSectionLayout from '../common/FormSectionLayout';
import { CapsService } from '../../services/storage/CapsService';
import type { Assessment, CAPS } from '../../domain/types/models';

const SECTIONS = [
  { id: 'general', label: 'Datos de la Encuesta' },
  { id: 'c1', label: 'C1: Organización' },
  { id: 'c2', label: 'C2: Nivel de Servicio' },
  { id: 'c3', label: 'C3: Recup. Costes' },
  { id: 'c4', label: 'C4: Op. y Mant.' },
  { id: 'c5', label: 'C5: GIRH' },
  { id: 'c6', label: 'C6: Rend. Cuentas' },
  { id: 'c7', label: 'C7: Conservación' },
  { id: 'c8', label: 'C8: Género' },
  { id: 'c9', label: 'C9: Autogestión' },
];

const AssessmentForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const capsIdFromQuery = queryParams.get('capsId');

  const [activeSection, setActiveSection] = useState('general');
  const [caps, setCaps] = useState<CAPS | null>(null);
  const [formData, setFormData] = useState<Partial<Assessment>>({
    capsId: capsIdFromQuery || '',
    surveyDate: new Date().toISOString().split('T')[0],
    surveyorName: '',
    legalization: {
      municipalCertificate: false,
      inaaRegistration: false,
      rucNumber: false,
      differentiatedTariff: false,
      sapLegalization: false,
      hasAssemblyRecords: 'NO',
    },
    serviceLevel: {
      sourceType: 'MEJORADA',
      intakeLocation: 'PATIO',
      fetchTime: 'MAX_30_MIN',
      waterAvailability: 'MAYOR_PARTE',
      compliesWithEndowment: true,
      qualityPerception: { odor: 'BUENO', color: 'BUENO', flavor: 'BUENO' },
      bacteriologicalAnalysisDone: false,
      bacteriologicalAnalysisResult: 'NO_SABE',
      otherTests: { arsenic: false, iron: false, turbidity: false, ph: false },
    },
  });

  useEffect(() => {
    const fetchCaps = async () => {
      const cid = formData.capsId;
      if (cid) {
        const data = await CapsService.getById(cid);
        if (data) setCaps(data);
      }
    };
    fetchCaps();
  }, [formData.capsId]);

  const handleSave = () => {
    console.log('Guardando Encuesta:', formData);
    navigate('/assessments');
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
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
                label="CAPS Seleccionado"
                value={caps?.name || 'Seleccione un CAPS'}
                disabled
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
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Nombre del Encuestador"
                value={formData.surveyorName}
                onChange={(e) => setFormData((prev) => ({ ...prev, surveyorName: e.target.value }))}
              />
            </Grid>
          </Grid>
        );
      case 'c1':
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Aspectos de Legalización y Organización
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.legalization?.municipalCertificate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          legalization: {
                            ...prev.legalization!,
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
                      checked={formData.legalization?.inaaRegistration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          legalization: {
                            ...prev.legalization!,
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
                      checked={formData.legalization?.rucNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          legalization: { ...prev.legalization!, rucNumber: e.target.checked },
                        }))
                      }
                    />
                  }
                  label="Número RUC"
                />
              </FormGroup>
            </Grid>
          </Grid>
        );
      case 'c2':
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Nivel de Servicio (JMP)
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Tipo de Fuente"
                value={formData.serviceLevel?.sourceType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceLevel: {
                      ...prev.serviceLevel!,
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
                value={formData.serviceLevel?.intakeLocation}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    serviceLevel: {
                      ...prev.serviceLevel!,
                      intakeLocation: e.target.value as 'DENTRO' | 'PATIO' | 'VECINO' | 'PUBLICO',
                    },
                  }))
                }
              >
                <MenuItem value="DENTRO">Dentro de la vivienda</MenuItem>
                <MenuItem value="PATIO">En el patio</MenuItem>
                <MenuItem value="PUBLICO">Puesto Público</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        );
      default:
        return (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="textSecondary">
              Contenido de la sección "{SECTIONS.find((s) => s.id === activeSection)?.label}" en
              desarrollo.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <FormSectionLayout
      title="Nueva Encuesta de Sostenibilidad"
      sections={SECTIONS}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSave={handleSave}
      onCancel={() => navigate('/assessments')}
    >
      {renderSectionContent()}
    </FormSectionLayout>
  );
};

export default AssessmentForm;
