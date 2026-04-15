import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, FormGroup, Divider } from '@mui/material';
import type { Assessment } from '../../../../domain/types/models';

interface MabeConservationProps {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const MabeConservation: React.FC<MabeConservationProps> = ({ formData, setFormData }) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Estación de Bombeo
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mabe?.pumpingStation.hasFence || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        pumpingStation: {
                          ...prev.conservation.mabe!.pumpingStation,
                          hasFence: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Tiene cerca perimetral"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mabe?.pumpingStation.noLatrinesNearby || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        pumpingStation: {
                          ...prev.conservation.mabe!.pumpingStation,
                          noLatrinesNearby: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Sin letrinas cerca (<30m)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mabe?.pumpingStation.goodConditionCaseta || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        pumpingStation: {
                          ...prev.conservation.mabe!.pumpingStation,
                          goodConditionCaseta: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Caseta en buen estado"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mabe?.pumpingStation.lockedDoor || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        pumpingStation: {
                          ...prev.conservation.mabe!.pumpingStation,
                          lockedDoor: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Puerta con llave"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mabe?.pumpingStation.macroMeterRegistering || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        pumpingStation: {
                          ...prev.conservation.mabe!.pumpingStation,
                          macroMeterRegistering: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Macromedidor funcionando"
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
                checked={formData.conservation.mabe?.storageTank.hasFenceGoodCondition || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        storageTank: {
                          ...prev.conservation.mabe!.storageTank,
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
                checked={formData.conservation.mabe?.storageTank.noCracks || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        storageTank: {
                          ...prev.conservation.mabe!.storageTank,
                          noCracks: e.target.checked,
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
                checked={formData.conservation.mabe?.storageTank.noLeaks || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        storageTank: {
                          ...prev.conservation.mabe!.storageTank,
                          noLeaks: e.target.checked,
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
                checked={formData.conservation.mabe?.storageTank.noOverflow || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        storageTank: {
                          ...prev.conservation.mabe!.storageTank,
                          noOverflow: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Sin rebose (desperdicio)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mabe?.storageTank.valvesGoodCondition || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
                        storageTank: {
                          ...prev.conservation.mabe!.storageTank,
                          valvesGoodCondition: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Válvulas en buen estado"
          />
        </FormGroup>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 1 }} />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.mabe?.chlorinationSystemWorking || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
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
                checked={formData.conservation.mabe?.noVisibleSystemLeaks || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      mabe: {
                        ...prev.conservation.mabe!,
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

export default MabeConservation;
