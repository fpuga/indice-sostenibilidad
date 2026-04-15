import type { Assessment } from '../types/models';

/**
 * C8. Género
 * Calculation: (BF * 0.5) + (BG * 0.5)
 *
 * BF: Regulations adendum for women promotion (1/0).
 * BG: >= 50% completion of gender-positive actions (1/0).
 */
export function calculateC8_Genero(assessment: Assessment): number {
  const { gender } = assessment;

  const bf = gender.genderAdendum ? 1 : 0;
  const bg = gender.genderActionsCompliance ? 1 : 0;

  return bf * 0.5 + bg * 0.5;
}
