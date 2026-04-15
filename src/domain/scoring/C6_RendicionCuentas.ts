import type { Assessment } from '../types/models';

/**
 * C6. Rendición de Cuentas
 * Calculation: (AP * 0.25) + (AQ * 0.25) + (AR * 0.125) + (AS * 0.125) + (AT * 0.125) + (AU * 0.125)
 *
 * AP: Reports economic status to users.
 * AQ: Reports monthly to Board.
 * AR: Accounting book updated.
 * AS: Users book updated.
 * AT: Minutes book updated.
 * AU: Morosity reported.
 */
export function calculateC6_RendicionCuentas(assessment: Assessment): number {
  const { accountability } = assessment;

  const ap = accountability.informsEconomicStatus ? 1 : 0;
  const aq = accountability.monthlyAccountabilityToBoard ? 1 : 0;
  const ar = accountability.accountingBookUpdated ? 1 : 0;
  const as = accountability.usersBookUpdated ? 1 : 0;
  const at = accountability.minutesBookUpdated ? 1 : 0;
  const au = accountability.morosityReported ? 1 : 0;

  return ap * 0.25 + aq * 0.25 + ar * 0.125 + as * 0.125 + at * 0.125 + au * 0.125;
}
