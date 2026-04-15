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
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Stack direction="row" spacing={2}>
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          {onSave && (
            <Button variant="contained" onClick={onSave} disabled={!isValid}>
              Guardar Cambios
            </Button>
          )}
        </Stack>
      </Stack>

      <Grid container spacing={3} sx={{ height: 'calc(100vh - 200px)' }}>
        <Grid size={{ xs: 12, md: 3, lg: 2 }}>
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

        <Grid size={{ xs: 12, md: 9, lg: 10 }}>
          <Paper sx={{ p: 4, height: '100%', overflow: 'auto', backgroundColor: '#fff' }}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormSectionLayout;
