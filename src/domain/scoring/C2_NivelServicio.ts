import { Assessment } from '../types/models';

/**
 * C2. Nivel de Servicio
 *
 * - SEGURA (1.0): Improved source, located inside house, available all time, E.coli negative.
 * - BÁSICO (0.5): Improved source, fetch time < 30 mins.
 * - LIMITADO (0.0): Improved source, fetch time > 30 mins.
 * - NO MEJORADA (0.0): Non-improved source.
 */
export function calculateC2_NivelServicio(assessment: Assessment): number {
  const { serviceLevel } = assessment;

  if (serviceLevel.sourceType === 'NO_MEJORADA') {
    return 0;
  }

  // Improved Source (MEJORADA)
  const isSafe =
    serviceLevel.intakeLocation === 'DENTRO' &&
    serviceLevel.waterAvailability === 'SIEMPRE' &&
    serviceLevel.bacteriologicalAnalysisResult === 'NEGATIVO';

  if (isSafe) {
    return 1.0;
  }

  const isBasic = serviceLevel.fetchTime === 'MAX_30_MIN';
  if (isBasic) {
    return 0.5;
  }

  // Limited or other cases of improved source
  return 0.0;
}
