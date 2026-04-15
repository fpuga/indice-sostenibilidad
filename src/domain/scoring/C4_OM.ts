import { Assessment } from '../types/models';

/**
 * C4. Operación y Mantenimiento (O&M)
 * Calculation: HasPlan * ExecutesPlan (Binary AND)
 * 1.0 only if both are true, else 0.0.
 */
export function calculateC4_OM(assessment: Assessment): number {
  const { operationAndMaintenance } = assessment;

  return operationAndMaintenance.hasOmPlan && operationAndMaintenance.executesOmPlan ? 1.0 : 0.0;
}
