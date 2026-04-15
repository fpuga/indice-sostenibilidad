import { Assessment } from '../types/models';

/**
 * C5. GIRH (Gestión Integrada de Recursos Hídricos)
 * Calculation: Sum(10 Actions) / 10
 */
export function calculateC5_GIRH(assessment: Assessment): number {
  const { girh } = assessment;

  const actions = [
    girh.hygieneCampaigns,
    girh.cleaningDays,
    girh.recordsMonthlyFlow,
    girh.informsWaterAvailability,
    girh.adjustsDistribution,
    girh.hasMicromeasurement,
    girh.rechargeAreaIdentified,
    girh.rechargeAreaCharacterized,
    girh.rechargeAreaProtectionPlan,
    girh.protectionPlanImplemented,
  ];

  const positiveCount = actions.filter(Boolean).length;

  return positiveCount / 10;
}
