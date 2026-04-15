import { describe, it, expect } from 'vitest';
import { calculateC7_Conservacion } from '../../../src/domain/scoring/C7_Conservacion';
import { createMockAssessment } from '../../factories';

describe('C7_Conservacion Calculation', () => {
  describe('MABE', () => {
    it('should return 1.0 when all components meet thresholds', () => {
      const assessment = createMockAssessment({
        conservation: {
          mabe: {
            pumpingStation: {
              hasFence: true,
              noLatrinesNearby: true,
              goodConditionCaseta: true,
              lockedDoor: false,
              macroMeterRegistering: false,
            }, // 3/5
            storageTank: {
              hasFenceGoodCondition: true,
              noCracks: true,
              noLeaks: true,
              noOverflow: true,
              valvesGoodCondition: false,
              inspectionCoverGoodCondition: false,
            }, // 4/6
            chlorinationSystemWorking: true,
            noVisibleSystemLeaks: true,
          },
        },
      });
      expect(calculateC7_Conservacion(assessment, 'MABE')).toBe(1.0);
    });

    it('should return 0.5 when only chlorinator and leaks are good', () => {
      const assessment = createMockAssessment({
        conservation: {
          mabe: {
            pumpingStation: {
              hasFence: true,
              noLatrinesNearby: false,
              goodConditionCaseta: false,
              lockedDoor: false,
              macroMeterRegistering: false,
            }, // 1/5
            storageTank: {
              hasFenceGoodCondition: true,
              noCracks: false,
              noLeaks: false,
              noOverflow: false,
              valvesGoodCondition: false,
              inspectionCoverGoodCondition: false,
            }, // 1/6
            chlorinationSystemWorking: true,
            noVisibleSystemLeaks: true,
          },
        },
      });
      expect(calculateC7_Conservacion(assessment, 'MABE')).toBe(0.5);
    });
  });

  describe('MAG', () => {
    it('should return 1.0 when all components meet thresholds', () => {
      const assessment = createMockAssessment({
        conservation: {
          mag: {
            intake: {
              hasFenceGoodCondition: true,
              noPollutionSources: true,
              noCracksInIntake: false,
            }, // 2/3
            storageTank: {
              hasFenceGoodCondition: true,
              noCracksInTank: true,
              noLeaksInTank: true,
              noOverflow: true,
              valvesGoodCondition: false,
              inspectionCoverGoodCondition: false,
            }, // 4/6
            chlorinationSystemWorking: true,
            noVisibleSystemLeaks: true,
          },
        },
      });
      expect(calculateC7_Conservacion(assessment, 'MAG')).toBe(1.0);
    });
  });

  describe('Wells', () => {
    it('should return 1.0 when all components meet thresholds', () => {
      const assessment = createMockAssessment({
        conservation: {
          well: {
            well: { hasFence: true, noLatrinesNearby: true }, // 2/2
            handPump: {
              ropeAndPistonsGoodCondition: true,
              metalStructureGoodCondition: true,
              pumpGuideGoodCondition: true,
              bearingsLeverAxlesGoodCondition: true,
              risingMainGoodCondition: false,
              noCracksInBase: false,
            }, // 4/6
            apron: { noCracksInCurbs: true, noCracksInApron: true }, // 2/2
            drainageChannel: { noObstructions: true, noCracksInChannel: false }, // 1/2
            soakPit: { gravelFilterGoodCondition: true, noSediments: false }, // 1/2
          },
        },
      });
      expect(calculateC7_Conservacion(assessment, 'POZO_EXCAVADO')).toBe(1.0);
    });
  });
});
