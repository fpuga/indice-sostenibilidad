import { describe, it, expect } from 'vitest';
import { calculateC5_GIRH } from '../../../src/domain/scoring/C5_GIRH';
import { createMockAssessment } from '../../factories';

describe('C5_GIRH Calculation', () => {
  it('should return 1.0 when all 10 actions are true', () => {
    const assessment = createMockAssessment({
      girh: {
        hygieneCampaigns: true,
        cleaningDays: true,
        recordsMonthlyFlow: true,
        informsWaterAvailability: true,
        adjustsDistribution: true,
        hasMicromeasurement: true,
        rechargeAreaIdentified: true,
        rechargeAreaCharacterized: true,
        rechargeAreaProtectionPlan: true,
        protectionPlanImplemented: true,
      },
    });
    expect(calculateC5_GIRH(assessment)).toBe(1.0);
  });

  it('should return 0.5 when 5 actions are true', () => {
    const assessment = createMockAssessment({
      girh: {
        hygieneCampaigns: true,
        cleaningDays: true,
        recordsMonthlyFlow: true,
        informsWaterAvailability: true,
        adjustsDistribution: true,
        hasMicromeasurement: false,
        rechargeAreaIdentified: false,
        rechargeAreaCharacterized: false,
        rechargeAreaProtectionPlan: false,
        protectionPlanImplemented: false,
      },
    });
    expect(calculateC5_GIRH(assessment)).toBe(0.5);
  });

  it('should return 0.0 when no actions are true', () => {
    const assessment = createMockAssessment();
    expect(calculateC5_GIRH(assessment)).toBe(0.0);
  });
});
