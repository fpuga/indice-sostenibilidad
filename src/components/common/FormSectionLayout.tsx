import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

interface Section {
  id: string;
  label: string;
}

interface FormSectionLayoutProps {
  title: string;
  sections: Section[];
  activeSection: string;
  onSectionChange: (id: string) => void;
  children: React.ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  isValid?: boolean;
}

const FormSectionLayout: React.FC<FormSectionLayoutProps> = ({
  title,
  sections,
  activeSection,
  onSectionChange,
  children,
  onSave,
  onCancel,
  isValid = true,
}) => {
  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2.125rem' } }}
        >
          {title}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: 'flex-end' }}
        >
          {onCancel && (
            <Button variant="outlined" onClick={onCancel} size="small">
              Cancelar
            </Button>
          )}
          {onSave && (
            <Button variant="contained" onClick={onSave} disabled={!isValid} size="small">
              Guardar Cambios
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Mobile Navigation Dropdown */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="section-select-label">Sección</InputLabel>
          <Select
            labelId="section-select-label"
            value={activeSection}
            label="Sección"
            onChange={(e) => onSectionChange(e.target.value as string)}
          >
            {sections.map((section) => (
              <MenuItem key={section.id} value={section.id}>
                {section.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} sx={{ height: { xs: 'auto', md: 'calc(100vh - 200px)' } }}>
        {/* Desktop Sidebar List */}
        <Grid size={{ md: 3, lg: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Paper sx={{ height: '100%', overflow: 'auto' }}>
            <List component="nav">
              {sections.map((section) => (
                <ListItem key={section.id} disablePadding>
                  <ListItemButton
                    selected={activeSection === section.id}
                    onClick={() => onSectionChange(section.id)}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': { backgroundColor: 'primary.dark' },
                        '& .MuiListItemText-primary': { fontWeight: 600 },
                      },
                    }}
                  >
                    <ListItemText primary={section.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Content Area */}
        <Grid size={{ xs: 12, md: 9, lg: 10 }}>
          <Paper
            sx={{
              p: { xs: 2, md: 4 },
              height: '100%',
              overflow: { xs: 'visible', md: 'auto' },
              backgroundColor: '#fff',
            }}
          >
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormSectionLayout;
