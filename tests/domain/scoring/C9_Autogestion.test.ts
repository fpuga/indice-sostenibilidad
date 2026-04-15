import { describe, it, expect } from 'vitest';
import { calculateC9_Autogestion } from '../../../src/domain/scoring/C9_Autogestion';
import { createMockManagementProblem } from '../../factories';

describe('C9_Autogestion Calculation', () => {
  const mockProblems = (count: number, actionTakenCount: number = 0) => {
    return Array.from({ length: count }, (_, i) =>
      createMockManagementProblem({
        id: `p${i}`,
        problemPresented: true,
        actionTaken: i < actionTakenCount,
        wasSolved: i < actionTakenCount,
      })
    );
  };

  it('should return 1.0 when >= 50% problems are managed', () => {
    const problems = mockProblems(2, 1); // 1/2 = 50%
    expect(calculateC9_Autogestion(problems)).toBe(1.0);
  });

  it('should return 0.0 when < 50% problems are managed', () => {
    const problems = mockProblems(3, 1); // 1/3 = 33%
    expect(calculateC9_Autogestion(problems)).toBe(0.0);
  });

  it('should return 1.0 if no problems were presented', () => {
    expect(calculateC9_Autogestion([])).toBe(1.0);
  });
});
