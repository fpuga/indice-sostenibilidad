import type { Assessment, AssessmentResult } from '../../domain/types/models';

const STORAGE_KEY = 'is_jmp_assessments';

const MOCK_ASSESSMENT_RESULTS: AssessmentResult[] = [
  {
    id: 'res-1',
    assessmentId: 'ass-1',
    finalScore: 85,
    category: 'A',
    criteriaScores: {
      c1_organizacion: 90,
      c2_nivel_servicio: 80,
      c3_recuperacion_costes: 85,
      c4_om: 90,
      c5_girh: 80,
      c6_rendicion_cuentas: 95,
      c7_conservacion: 85,
      c8_genero: 80,
      c9_autogestion: 85,
    },
  },
  {
    id: 'res-2',
    assessmentId: 'ass-2',
    finalScore: 68,
    category: 'B',
    criteriaScores: {
      c1_organizacion: 70,
      c2_nivel_servicio: 60,
      c3_recuperacion_costes: 65,
      c4_om: 75,
      c5_girh: 60,
      c6_rendicion_cuentas: 80,
      c7_conservacion: 70,
      c8_genero: 65,
      c9_autogestion: 70,
    },
  },
  {
    id: 'res-3',
    assessmentId: 'ass-3',
    finalScore: 52,
    category: 'C',
    criteriaScores: {
      c1_organizacion: 50,
      c2_nivel_servicio: 45,
      c3_recuperacion_costes: 55,
      c4_om: 50,
      c5_girh: 40,
      c6_rendicion_cuentas: 60,
      c7_conservacion: 55,
      c8_genero: 50,
      c9_autogestion: 60,
    },
  },
];

const MOCK_ASSESSMENTS: (Assessment & { result?: AssessmentResult })[] = [
  {
    id: 'ass-1',
    capsId: '1',
    surveyDate: '2025-03-15',
    surveyorName: 'Ana García',
    serviceLevel: {
      sourceType: 'MEJORADA',
      intakeLocation: 'DENTRO',
      fetchTime: 'MAX_30_MIN',
      waterAvailability: 'SIEMPRE',
      compliesWithEndowment: true,
      qualityPerception: { odor: 'BUENO', color: 'BUENO', flavor: 'BUENO' },
      bacteriologicalAnalysisDone: true,
      bacteriologicalAnalysisResult: 'NEGATIVO',
      otherTests: { arsenic: true, iron: false, turbidity: true, ph: true },
    },
    legalization: {
      municipalCertificate: true,
      inaaRegistration: true,
      rucNumber: true,
      differentiatedTariff: true,
      sapLegalization: true,
      hasAssemblyRecords: 'SI',
    },
    costRecovery: {
      hasTariff: true,
      tariffType: 'CONSUMO',
      hasBankAccount: true,
      hasSavingsForThreeMonths: true,
      morosityPercentage: 'LESS_5',
    },
    operationAndMaintenance: {
      hasOmPlan: true,
      executesOmPlan: true,
    },
    girh: {
      hygieneCampaigns: true,
      cleaningDays: true,
      recordsMonthlyFlow: true,
      informsWaterAvailability: true,
      adjustsDistribution: true,
      hasMicromeasurement: true,
      rechargeAreaIdentified: true,
      rechargeAreaCharacterized: true,
      rechargeAreaProtectionPlan: true,
      protectionPlanImplemented: true,
    },
    accountability: {
      informsEconomicStatus: true,
      monthlyAccountabilityToBoard: true,
      accountingBookUpdated: true,
      usersBookUpdated: true,
      minutesBookUpdated: true,
      morosityReported: true,
    },
    conservation: {
      mabe: {
        pumpingStation: {
          hasFence: true,
          noLatrinesNearby: true,
          goodConditionCaseta: true,
          lockedDoor: true,
          macroMeterRegistering: true,
        },
        storageTank: {
          hasFenceGoodCondition: true,
          noCracks: true,
          noLeaks: true,
          noOverflow: true,
          valvesGoodCondition: true,
          inspectionCoverGoodCondition: true,
        },
        chlorinationSystemWorking: true,
        noVisibleSystemLeaks: true,
      },
    },
    gender: { genderAdendum: true, genderActionsCompliance: true },
    result: MOCK_ASSESSMENT_RESULTS[0],
  },
  // Other mocks ... I'll keep just one for initial data to save space
];

const getStoredAssessments = (): (Assessment & { result?: AssessmentResult })[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ASSESSMENTS));
    return MOCK_ASSESSMENTS;
  }
  return JSON.parse(stored);
};

export const AssessmentService = {
  getAll: async (): Promise<(Assessment & { result?: AssessmentResult })[]> => {
    return getStoredAssessments();
  },

  getLatestByCapsId: async (
    capsId: string
  ): Promise<(Assessment & { result?: AssessmentResult }) | undefined> => {
    return getStoredAssessments()
      .filter((a) => a.capsId === capsId)
      .sort((a, b) => new Date(b.surveyDate).getTime() - new Date(a.surveyDate).getTime())[0];
  },

  getById: async (
    id: string
  ): Promise<(Assessment & { result?: AssessmentResult }) | undefined> => {
    return getStoredAssessments().find((a) => a.id === id);
  },

  save: async (
    assessment: Assessment & { result?: AssessmentResult }
  ): Promise<Assessment & { result?: AssessmentResult }> => {
    const list = getStoredAssessments();
    let updated: Assessment & { result?: AssessmentResult };

    if (assessment.id) {
      const index = list.findIndex((a) => a.id === assessment.id);
      if (index !== -1) {
        updated = { ...list[index], ...assessment };
        list[index] = updated;
      } else {
        updated = assessment;
        list.push(updated);
      }
    } else {
      updated = {
        ...assessment,
        id: Math.random().toString(36).substr(2, 9),
      };
      if (updated.result) {
        updated.result.id = Math.random().toString(36).substr(2, 9);
        updated.result.assessmentId = updated.id;
      }
      list.push(updated);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return updated;
  },
};
