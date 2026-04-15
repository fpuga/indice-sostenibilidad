import {
  Assessment,
  AssessmentResult,
  BoardMember,
  Assembly,
  ManagementProblem,
  CAPS,
} from '../types/models';
import { calculateC1_Organizacion } from './C1_Organizacion';
import { calculateC2_NivelServicio } from './C2_NivelServicio';
import { calculateC3_RecuperacionCostes } from './C3_RecuperacionCostes';
import { calculateC4_OM } from './C4_OM';
import { calculateC5_GIRH } from './C5_GIRH';
import { calculateC6_RendicionCuentas } from './C6_RendicionCuentas';
import { calculateC7_Conservacion } from './C7_Conservacion';
import { calculateC8_Genero } from './C8_Genero';
import { calculateC9_Autogestion } from './C9_Autogestion';

export interface WeightSet {
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
  c6: number;
  c7: number;
  c8: number;
  c9: number;
}

const WEIGHT_MATRIX: Record<string, Record<string, WeightSet>> = {
  MABE: {
    '0-5': {
      c1: 0.15,
      c2: 0.05,
      c3: 0.15,
      c4: 0.15,
      c5: 0.05,
      c6: 0.1,
      c7: 0.1,
      c8: 0.1,
      c9: 0.15,
    },
    '5-10': { c1: 0.1, c2: 0.05, c3: 0.2, c4: 0.2, c5: 0.05, c6: 0.1, c7: 0.05, c8: 0.1, c9: 0.15 },
    '>10': { c1: 0.1, c2: 0.05, c3: 0.2, c4: 0.15, c5: 0.05, c6: 0.1, c7: 0.05, c8: 0.1, c9: 0.2 },
  },
  MAG_POZOS: {
    '0-5': {
      c1: 0.15,
      c2: 0.05,
      c3: 0.15,
      c4: 0.15,
      c5: 0.05,
      c6: 0.1,
      c7: 0.1,
      c8: 0.1,
      c9: 0.15,
    },
    '5-10': {
      c1: 0.15,
      c2: 0.05,
      c3: 0.15,
      c4: 0.15,
      c5: 0.1,
      c6: 0.1,
      c7: 0.05,
      c8: 0.1,
      c9: 0.15,
    },
    '>10': { c1: 0.1, c2: 0.05, c3: 0.2, c4: 0.1, c5: 0.05, c6: 0.15, c7: 0.05, c8: 0.1, c9: 0.2 },
  },
};

export function calculateSustainabilityIndex(
  caps: CAPS,
  assessment: Assessment,
  boardMembers: BoardMember[],
  assemblies: Assembly[],
  problems: ManagementProblem[]
): AssessmentResult {
  const c1 = calculateC1_Organizacion(assessment, boardMembers, assemblies, caps.systemType);
  const c2 = calculateC2_NivelServicio(assessment);
  const c3 = calculateC3_RecuperacionCostes(assessment);
  const c4 = calculateC4_OM(assessment);
  const c5 = calculateC5_GIRH(assessment);
  const c6 = calculateC6_RendicionCuentas(assessment);
  const c7 = calculateC7_Conservacion(assessment, caps.systemType);
  const c8 = calculateC8_Genero(assessment);
  const c9 = calculateC9_Autogestion(problems);

  // Age calculation
  const currentYear = new Date(assessment.surveyDate).getFullYear();
  const age = currentYear - caps.yearBuilt;

  let ageKey = '0-5';
  if (age > 10) ageKey = '>10';
  else if (age > 5) ageKey = '5-10';

  const isMabeLike = caps.systemType === 'MABE' || caps.systemType === 'MIXTO';
  const typeKey = isMabeLike ? 'MABE' : 'MAG_POZOS';

  const weights = WEIGHT_MATRIX[typeKey][ageKey];

  const finalScore =
    (c1 * weights.c1 +
      c2 * weights.c2 +
      c3 * weights.c3 +
      c4 * weights.c4 +
      c5 * weights.c5 +
      c6 * weights.c6 +
      c7 * weights.c7 +
      c8 * weights.c8 +
      c9 * weights.c9) *
    100;

  let category: 'A' | 'B' | 'C' = 'C';
  if (finalScore >= 80) category = 'A';
  else if (finalScore >= 60) category = 'B';

  return {
    id: `result-${assessment.id}`,
    assessmentId: assessment.id,
    finalScore,
    category,
    criteriaScores: {
      c1_organizacion: c1,
      c2_nivel_servicio: c2,
      c3_recuperacion_costes: c3,
      c4_om: c4,
      c5_girh: c5,
      c6_rendicion_cuentas: c6,
      c7_conservacion: c7,
      c8_genero: c8,
      c9_autogestion: c9,
    },
  };
}
