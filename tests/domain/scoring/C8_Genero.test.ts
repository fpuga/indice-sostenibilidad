import { describe, it, expect } from 'vitest';
import { calculateC8_Genero } from '../../../src/domain/scoring/C8_Genero';
import { createMockAssessment } from '../../factories';

describe('C8_Genero Calculation', () => {
  it('should return 1.0 when both criteria are true', () => {
    const assessment = createMockAssessment({
      gender: {
        genderAdendum: true,
        genderActionsCompliance: true,
      },
    });
    expect(calculateC8_Genero(assessment)).toBe(1.0);
  });

  it('should return 0.5 when only adendum is true', () => {
    const assessment = createMockAssessment({
      gender: {
        genderAdendum: true,
        genderActionsCompliance: false,
      },
    });
    expect(calculateC8_Genero(assessment)).toBe(0.5);
  });

  it('should return 0.0 when none are true', () => {
    const assessment = createMockAssessment();
    expect(calculateC8_Genero(assessment)).toBe(0.0);
  });
});
