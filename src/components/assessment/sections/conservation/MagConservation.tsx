import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, FormGroup, Divider } from '@mui/material';
import type { Assessment } from '../../../../domain/types/models';

interface MagConservationProps {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const MagConservation: React.FC<MagConservationProps> = ({ formData, setFormData }) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Obra de Toma
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mag?.intake.hasFenceGoodCondition || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mag: {
                        ...prev.conservation.mag!,
                        intake: {
                          ...prev.conservation.mag!.intake,
                          hasFenceGoodCondition: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Cerca en buen estado"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mag?.intake.noPollutionSources || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mag: {
                        ...prev.conservation.mag!,
                        intake: {
                          ...prev.conservation.mag!.intake,
                          noPollutionSources: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Sin fuentes de contaminación"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mag?.intake.noCracksInIntake || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mag: {
                        ...prev.conservation.mag!,
                        intake: {
                          ...prev.conservation.mag!.intake,
                          noCracksInIntake: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Obra de toma sin grietas"
          />
        </FormGroup>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Tanque de Almacenamiento
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mag?.storageTank.noCracksInTank || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mag: {
                        ...prev.conservation.mag!,
                        storageTank: {
                          ...prev.conservation.mag!.storageTank,
                          noCracksInTank: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Sin grietas visibles"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mag?.storageTank.noLeaksInTank || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mag: {
                        ...prev.conservation.mag!,
                        storageTank: {
                          ...prev.conservation.mag!.storageTank,
                          noLeaksInTank: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Sin fugas"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mag?.storageTank.noOverflow || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mag: {
                        ...prev.conservation.mag!,
                        storageTank: {
                          ...prev.conservation.mag!.storageTank,
                          noOverflow: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Sin rebose"
          />
        </FormGroup>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 1 }} />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mag?.chlorinationSystemWorking || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mag: {
                        ...prev.conservation.mag!,
                        chlorinationSystemWorking: e.target.checked,
                      },
                    },
                  }))
                }
              />
            }
            label="Sistema de cloración funcionando"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mag?.noVisibleSystemLeaks || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mag: {
                        ...prev.conservation.mag!,
                        noVisibleSystemLeaks: e.target.checked,
                      },
                    },
                  }))
                }
              />
            }
            label="Sin fugas visibles en la red"
          />
        </FormGroup>
      </Grid>
    </>
  );
};

export default MagConservation;
