import { Assessment } from '../types/models';

/**
 * C3. Recuperación de Costes
 * Calculation: (W * 0.25) + (X * 0.25) + (Y * 0.25) + (Z * 0.25)
 *
 * W: Has Tariff? (1/0).
 * X: Has functional bank account? (1/0).
 * Y: Savings cover 3 months O&M? (1/0).
 * Z: Morosity < 5%? (1/0).
 */
export function calculateC3_RecuperacionCostes(assessment: Assessment): number {
  const { costRecovery } = assessment;

  const w = costRecovery.hasTariff ? 1 : 0;
  const x = costRecovery.hasBankAccount ? 1 : 0;
  const y = costRecovery.hasSavingsForThreeMonths ? 1 : 0;
  const z = costRecovery.morosityPercentage === 'LESS_5' ? 1 : 0;

  return w * 0.25 + x * 0.25 + y * 0.25 + z * 0.25;
}
