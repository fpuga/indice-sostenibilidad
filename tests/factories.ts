import {
  CAPS,
  Assessment,
  BoardMember,
  Assembly,
  ManagementProblem,
} from '../src/domain/types/models';

export const createMockCAPS = (overrides: Partial<CAPS> = {}): CAPS => ({
  id: 'caps-1',
  name: 'Test CAPS',
  department: 'Test Dept',
  municipality: 'Test Mun',
  community: 'Test Com',
  systemType: 'MAG',
  yearBuilt: 2020,
  yearConstituted: 2020,
  boardUpdatedInAna: true,
  ...overrides,
});

export const createMockAssessment = (overrides: Partial<Assessment> = {}): Assessment => ({
  id: 'assessment-1',
  capsId: 'caps-1',
  surveyDate: '2023-01-01',
  surveyorName: 'Tester',
  serviceLevel: {
    sourceType: 'MEJORADA',
    intakeLocation: 'PATIO',
    fetchTime: 'MAX_30_MIN',
    waterAvailability: 'MAYOR_PARTE',
    compliesWithEndowment: true,
    qualityPerception: { odor: 'BUENO', color: 'BUENO', flavor: 'BUENO' },
    bacteriologicalAnalysisDone: true,
    bacteriologicalAnalysisResult: 'POSITIVO',
    otherTests: { arsenic: false, iron: false, turbidity: false, ph: false },
  },
  legalization: {
    municipalCertificate: false,
    inaaRegistration: false,
    rucNumber: false,
    differentiatedTariff: false,
    sapLegalization: false,
    hasAssemblyRecords: 'NO',
  },
  costRecovery: {
    hasTariff: false,
    tariffType: 'FIJA',
    hasBankAccount: false,
    hasSavingsForThreeMonths: false,
    morosityPercentage: 'MORE_15',
  },
  operationAndMaintenance: {
    hasOmPlan: false,
    executesOmPlan: false,
  },
  girh: {
    hygieneCampaigns: false,
    cleaningDays: false,
    recordsMonthlyFlow: false,
    informsWaterAvailability: false,
    adjustsDistribution: false,
    hasMicromeasurement: false,
    rechargeAreaIdentified: false,
    rechargeAreaCharacterized: false,
    rechargeAreaProtectionPlan: false,
    protectionPlanImplemented: false,
  },
  accountability: {
    informsEconomicStatus: false,
    monthlyAccountabilityToBoard: false,
    accountingBookUpdated: false,
    usersBookUpdated: false,
    minutesBookUpdated: false,
    morosityReported: false,
  },
  conservation: {
    mabe: {
      pumpingStation: {
        hasFence: false,
        noLatrinesNearby: false,
        goodConditionCaseta: false,
        lockedDoor: false,
        macroMeterRegistering: false,
      },
      storageTank: {
        hasFenceGoodCondition: false,
        noCracks: false,
        noLeaks: false,
        noOverflow: false,
        valvesGoodCondition: false,
        inspectionCoverGoodCondition: false,
      },
      chlorinationSystemWorking: false,
      noVisibleSystemLeaks: false,
    },
  },
  gender: {
    genderAdendum: false,
    genderActionsCompliance: false,
  },
  ...overrides,
});

export const createMockBoardMember = (overrides: Partial<BoardMember> = {}): BoardMember => ({
  id: 'bm-1',
  assessmentId: 'assessment-1',
  role: 'Member',
  name: 'Test Member',
  gender: 'H',
  ...overrides,
});

export const createMockAssembly = (overrides: Partial<Assembly> = {}): Assembly => ({
  id: 'assembly-1',
  assessmentId: 'assessment-1',
  activityName: 'Test Assembly',
  date: '2023-01-01',
  convokedBy: 'CAPS',
  hasQuorum: true,
  womenAttendancePercentage: 0,
  boardAttendance: {
    presidente: false,
    secretario: false,
    tesorero: false,
    fiscal: false,
    vocal1: false,
    vocal2: false,
    vocal3: false,
    vocal4: false,
    vocal5: false,
  },
  ...overrides,
});

export const createMockManagementProblem = (
  overrides: Partial<ManagementProblem> = {}
): ManagementProblem => ({
  id: 'prob-1',
  assessmentId: 'assessment-1',
  problemPresented: false,
  description: 'Test Problem',
  actionTaken: false,
  entityContacted: 'None',
  wasSolved: false,
  ...overrides,
});
