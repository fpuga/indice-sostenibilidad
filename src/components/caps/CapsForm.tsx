import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FormSectionLayout from '../common/FormSectionLayout';
import { CapsService } from '../../services/storage/CapsService';
import type { CAPS, SystemType } from '../../domain/types/models';

const SECTIONS = [
  { id: 'general', label: 'Datos Generales' },
  { id: 'location', label: 'Ubicación y GPS' },
  { id: 'system', label: 'Infraestructura' },
  { id: 'legal', label: 'Estado Legal' },
];

const SYSTEM_TYPES: { value: SystemType; label: string }[] = [
  { value: 'MAG', label: 'MAG (Gravedad)' },
  { value: 'MABE', label: 'MABE (Bombeo Eléctrico)' },
  { value: 'POZO_EXCAVADO', label: 'Pozo Excavado' },
  { value: 'POZO_PERFORADO', label: 'Pozo Perforado' },
  { value: 'MANANTIAL', label: 'Manantial' },
  { value: 'LLUVIA', label: 'Lluvia' },
  { value: 'SUPERFICIAL', label: 'Superficial' },
];

const CapsForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('general');
  const [formData, setFormData] = useState<Partial<CAPS>>({
    name: '',
    department: '',
    municipality: '',
    community: '',
    systemType: 'MAG',
    yearBuilt: new Date().getFullYear(),
    yearConstituted: new Date().getFullYear(),
    boardUpdatedInAna: false,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      const fetchCaps = async () => {
        const data = await CapsService.getById(id);
        if (data) setFormData(data);
      };
      fetchCaps();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    await CapsService.save(formData);
    navigate('/caps');
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Identificación del CAPS
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Nombre del CAPS"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Comunidad"
                name="community"
                value={formData.community}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Año de Constitución"
                name="yearConstituted"
                value={formData.yearConstituted}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 'location':
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ubicación Geográfica
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Departamento"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Municipio"
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="GPS Latitud (X)"
                name="gpsX"
                value={formData.gpsX || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="GPS Longitud (Y)"
                name="gpsY"
                value={formData.gpsY || ''}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 'system':
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Detalles del Sistema
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Tipo de Sistema"
                name="systemType"
                value={formData.systemType}
                onChange={handleChange}
                required
              >
                {SYSTEM_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Año de Construcción"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Año de Última Rehabilitación"
                name="yearLastRehabilitated"
                value={formData.yearLastRehabilitated || ''}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 'legal':
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Estado Legal y Administrativo
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">¿Junta Directiva actualizada en la ANA?</FormLabel>
                <RadioGroup
                  name="boardUpdatedInAna"
                  value={formData.boardUpdatedInAna ? 'true' : 'false'}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      boardUpdatedInAna: e.target.value === 'true',
                    }))
                  }
                  row
                >
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <FormSectionLayout
      title={id === 'new' ? 'Nuevo CAPS' : `Editar CAPS: ${formData.name}`}
      sections={SECTIONS}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSave={handleSave}
      onCancel={() => navigate('/caps')}
    >
      {renderSectionContent()}
    </FormSectionLayout>
  );
};

export default CapsForm;
