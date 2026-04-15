import { describe, it, expect } from 'vitest';
import { calculateC4_OM } from '../../../src/domain/scoring/C4_OM';
import { createMockAssessment } from '../../factories';

describe('C4_OM Calculation', () => {
  it('should return 1.0 if both plan exists and is executed', () => {
    const assessment = createMockAssessment({
      operationAndMaintenance: {
        hasOmPlan: true,
        executesOmPlan: true,
      },
    });
    expect(calculateC4_OM(assessment)).toBe(1.0);
  });

  it('should return 0.0 if only plan exists', () => {
    const assessment = createMockAssessment({
      operationAndMaintenance: {
        hasOmPlan: true,
        executesOmPlan: false,
      },
    });
    expect(calculateC4_OM(assessment)).toBe(0.0);
  });

  it('should return 0.0 if only execution exists', () => {
    const assessment = createMockAssessment({
      operationAndMaintenance: {
        hasOmPlan: false,
        executesOmPlan: true,
      },
    });
    expect(calculateC4_OM(assessment)).toBe(0.0);
  });
});
