import { describe, it, expect } from 'vitest';
import { calculateC6_RendicionCuentas } from '../../../src/domain/scoring/C6_RendicionCuentas';
import { createMockAssessment } from '../../factories';

describe('C6_RendicionCuentas Calculation', () => {
  it('should return 1.0 when all 6 criteria are true', () => {
    const assessment = createMockAssessment({
      accountability: {
        informsEconomicStatus: true,
        monthlyAccountabilityToBoard: true,
        accountingBookUpdated: true,
        usersBookUpdated: true,
        minutesBookUpdated: true,
        morosityReported: true,
      },
    });
    expect(calculateC6_RendicionCuentas(assessment)).toBe(1.0);
  });

  it('should return 0.5 when only AP and AQ are true', () => {
    const assessment = createMockAssessment({
      accountability: {
        informsEconomicStatus: true,
        monthlyAccountabilityToBoard: true,
        accountingBookUpdated: false,
        usersBookUpdated: false,
        minutesBookUpdated: false,
        morosityReported: false,
      },
    });
    expect(calculateC6_RendicionCuentas(assessment)).toBe(0.5);
  });

  it('should return 0.0 when no criteria are true', () => {
    const assessment = createMockAssessment();
    expect(calculateC6_RendicionCuentas(assessment)).toBe(0.0);
  });
});
