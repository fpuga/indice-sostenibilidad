import { describe, it, expect } from 'vitest';
import { calculateC3_RecuperacionCostes } from '../../../src/domain/scoring/C3_RecuperacionCostes';
import { createMockAssessment } from '../../factories';

describe('C3_RecuperacionCostes Calculation', () => {
  it('should return 1.0 when all criteria are met', () => {
    const assessment = createMockAssessment({
      costRecovery: {
        hasTariff: true,
        tariffType: 'FIJA',
        hasBankAccount: true,
        hasSavingsForThreeMonths: true,
        morosityPercentage: 'LESS_5',
      },
    });
    expect(calculateC3_RecuperacionCostes(assessment)).toBe(1.0);
  });

  it('should return 0.0 when no criteria are met', () => {
    const assessment = createMockAssessment();
    expect(calculateC3_RecuperacionCostes(assessment)).toBe(0.0);
  });

  it('should return 0.25 when only tariff is present', () => {
    const assessment = createMockAssessment({
      costRecovery: {
        hasTariff: true,
        tariffType: 'FIJA',
        hasBankAccount: false,
        hasSavingsForThreeMonths: false,
        morosityPercentage: 'MORE_15',
      },
    });
    expect(calculateC3_RecuperacionCostes(assessment)).toBe(0.25);
  });
});
