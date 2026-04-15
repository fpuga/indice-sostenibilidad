import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import type { Assessment } from '../../../../domain/types/models';

interface WellConservationProps {
  formData: Assessment;
  setFormData: React.Dispatch<React.SetStateAction<Assessment>>;
}

const WellConservation: React.FC<WellConservationProps> = ({ formData, setFormData }) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Pozo
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.well?.well.hasFence || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      well: {
                        ...prev.conservation.well!,
                        well: {
                          ...prev.conservation.well!.well,
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
                checked={formData.conservation.well?.well.noLatrinesNearby || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      well: {
                        ...prev.conservation.well!,
                        well: {
                          ...prev.conservation.well!.well,
                          noLatrinesNearby: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Sin letrinas cerca"
          />
        </FormGroup>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Bomba de Mano
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.well?.handPump.ropeAndPistonsGoodCondition || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      well: {
                        ...prev.conservation.well!,
                        handPump: {
                          ...prev.conservation.well!.handPump,
                          ropeAndPistonsGoodCondition: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Cuerda y pistones en buen estado"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.well?.handPump.noCracksInBase || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      well: {
                        ...prev.conservation.well!,
                        handPump: {
                          ...prev.conservation.well!.handPump,
                          noCracksInBase: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Base sin grietas"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.well?.handPump.metalStructureGoodCondition || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      well: {
                        ...prev.conservation.well!,
                        handPump: {
                          ...prev.conservation.well!.handPump,
                          metalStructureGoodCondition: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Estructura metálica ok"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.well?.handPump.pumpGuideGoodCondition || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      well: {
                        ...prev.conservation.well!,
                        handPump: {
                          ...prev.conservation.well!.handPump,
                          pumpGuideGoodCondition: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Guía de bomba ok"
          />
        </FormGroup>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Andén y Drenaje
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.well?.apron.noCracksInApron || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      well: {
                        ...prev.conservation.well!,
                        apron: {
                          ...prev.conservation.well!.apron,
                          noCracksInApron: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Andén sin grietas"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.well?.drainageChannel.noCracksInChannel || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      well: {
                        ...prev.conservation.well!,
                        drainageChannel: {
                          ...prev.conservation.well!.drainageChannel,
                          noCracksInChannel: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Drenaje sin grietas"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.conservation.well?.soakPit.noSediments || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conservation: {
                      ...prev.conservation,
                      well: {
                        ...prev.conservation.well!,
                        soakPit: {
                          ...prev.conservation.well!.soakPit,
                          noSediments: e.target.checked,
                        },
                      },
                    },
                  }))
                }
              />
            }
            label="Pozo de absorción ok"
          />
        </FormGroup>
      </Grid>
    </>
  );
};

export default WellConservation;
