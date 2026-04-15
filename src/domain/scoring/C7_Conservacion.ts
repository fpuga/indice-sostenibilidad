import { Assessment, SystemType } from '../types/models';

/**
 * C7. Conservación (Infrastructure)
 *
 * - MABE: (AY * 0.25) + (BA * 0.25) + (BB * 0.25) + (BC * 0.25)
 *   - AY (Pumping): 1 if >= 3 checks are positive.
 *   - BA (Tank): 1 if >= 4 checks are positive.
 *   - BB (Chlorinator): Functional? (1/0).
 *   - BC (Leaks): No visible leaks? (1/0).
 *
 * - MAG: Sum(Intake, Tank, Chlorinator, Leaks) / 4
 *   - Intake: 1 if >= 2/3 positive.
 *   - Tank: 1 if >= 4/6 positive.
 *
 * - POZOS: Sum(Well, Pump, Apron, Drainage, Soaking) / 5
 *   - Well: 1 if 2/2 positive.
 *   - Pump: 1 if >= 4/6 positive.
 *   - Apron: 1 if 2/2 positive.
 *   - Drainage: 1 if >= 1/2 positive.
 *   - Soaking: 1 if >= 1/2 positive.
 */
export function calculateC7_Conservacion(assessment: Assessment, systemType: SystemType): number {
  const { conservation } = assessment;

  const isMabeLike = systemType === 'MABE' || systemType === 'MIXTO';
  if (isMabeLike && conservation.mabe) {
    const c = conservation.mabe;
    const ay = Object.values(c.pumpingStation).filter(Boolean).length >= 3 ? 1 : 0;
    const ba = Object.values(c.storageTank).filter(Boolean).length >= 4 ? 1 : 0;
    const bb = c.chlorinationSystemWorking ? 1 : 0;
    const bc = c.noVisibleSystemLeaks ? 1 : 0;
    return ay * 0.25 + ba * 0.25 + bb * 0.25 + bc * 0.25;
  }

  const isMag = systemType === 'MAG' || systemType === 'MANANTIAL' || systemType === 'SUPERFICIAL';
  if (isMag && conservation.mag) {
    const c = conservation.mag;
    const intake = Object.values(c.intake).filter(Boolean).length >= 2 ? 1 : 0;
    const tank = Object.values(c.storageTank).filter(Boolean).length >= 4 ? 1 : 0;
    const chlorinator = c.chlorinationSystemWorking ? 1 : 0;
    const leaks = c.noVisibleSystemLeaks ? 1 : 0;
    return (intake + tank + chlorinator + leaks) / 4;
  }

  if (conservation.well) {
    const c = conservation.well;
    const well = Object.values(c.well).filter(Boolean).length >= 2 ? 1 : 0;
    const pump = Object.values(c.handPump).filter(Boolean).length >= 4 ? 1 : 0;
    const apron = Object.values(c.apron).filter(Boolean).length >= 2 ? 1 : 0;
    const drainage = Object.values(c.drainageChannel).filter(Boolean).length >= 1 ? 1 : 0;
    const soaking = Object.values(c.soakPit).filter(Boolean).length >= 1 ? 1 : 0;
    return (well + pump + apron + drainage + soaking) / 5;
  }

  return 0;
}
