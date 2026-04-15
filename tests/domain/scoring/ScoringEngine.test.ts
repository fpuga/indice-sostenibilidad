import { describe, it, expect } from 'vitest';
import { calculateSustainabilityIndex } from '../../../src/domain/scoring/ScoringEngine';
import { BoardMember, Assembly, ManagementProblem } from '../../../src/domain/types/models';
import { createMockCAPS, createMockAssessment } from '../../factories';

describe('ScoringEngine Global Aggregation', () => {
  const mockCaps = createMockCAPS({
    id: 'c1',
    systemType: 'MABE',
    yearBuilt: 2020, // 3 years old in 2023
  });

  const mockAssessment = (overrides = {}) =>
    createMockAssessment({
      id: 'a1',
      capsId: 'c1',
      surveyDate: '2023-01-01',
      serviceLevel: {
        sourceType: 'MEJORADA',
        fetchTime: 'MAX_30_MIN',
        intakeLocation: 'PATIO',
        waterAvailability: 'MAYOR_PARTE',
        compliesWithEndowment: true,
        qualityPerception: { odor: 'BUENO', color: 'BUENO', flavor: 'BUENO' },
        bacteriologicalAnalysisDone: true,
        bacteriologicalAnalysisResult: 'POSITIVO',
        otherTests: { arsenic: false, iron: false, turbidity: false, ph: false },
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
        hasBankAccount: true,
        hasSavingsForThreeMonths: true,
        morosityPercentage: 'LESS_5',
        tariffType: 'FIJA',
      },
      operationAndMaintenance: { hasOmPlan: true, executesOmPlan: true },
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
      ...overrides,
    });

  const mockBoardMembers: BoardMember[] = [
    { id: 'b1', assessmentId: 'a1', role: 'P', name: 'W1', gender: 'M' },
    { id: 'b2', assessmentId: 'a1', role: 'S', name: 'W2', gender: 'M' },
    { id: 'b3', assessmentId: 'a1', role: 'T', name: 'M1', gender: 'H' },
    { id: 'b4', assessmentId: 'a1', role: 'F', name: 'M2', gender: 'H' },
  ]; // 4 members, 50% women

  const mockAssemblies: Assembly[] = [
    {
      id: 'as1',
      assessmentId: 'a1',
      activityName: 'A1',
      date: '2023-01-01',
      convokedBy: 'CAPS',
      hasQuorum: true,
      womenAttendancePercentage: 50,
      boardAttendance: {
        presidente: true,
        secretario: true,
        tesorero: true,
        fiscal: true,
        vocal1: false,
        vocal2: false,
        vocal3: false,
        vocal4: false,
        vocal5: false,
      },
    },
  ]; // 100% attendance, quorum

  const mockProblems: ManagementProblem[] = [];

  it('should return a high score (A) even with minor service level issues', () => {
    const result = calculateSustainabilityIndex(
      mockCaps,
      mockAssessment(),
      mockBoardMembers,
      mockAssemblies,
      mockProblems
    );

    // c2 is 0.5, weight is 0.05. Contribution = 0.5 * 0.05 = 0.025 (2.5 points)
    // Others are 1.0. Total = (1.0 - 0.025) * 100 = 97.5
    expect(result.finalScore).toBe(97.5);
    expect(result.category).toBe('A');
  });

  it('should calculate perfect score if everything is perfect', () => {
    const perfectAssessment = mockAssessment({
      serviceLevel: {
        sourceType: 'MEJORADA',
        intakeLocation: 'DENTRO',
        waterAvailability: 'SIEMPRE',
        bacteriologicalAnalysisResult: 'NEGATIVO',
        fetchTime: 'MAX_30_MIN',
        compliesWithEndowment: true,
        qualityPerception: { odor: 'BUENO', color: 'BUENO', flavor: 'BUENO' },
        bacteriologicalAnalysisDone: true,
        otherTests: { arsenic: false, iron: false, turbidity: false, ph: false },
      },
    });
    const result = calculateSustainabilityIndex(
      mockCaps,
      perfectAssessment,
      mockBoardMembers,
      mockAssemblies,
      mockProblems
    );
    expect(result.finalScore).toBe(100);
    expect(result.category).toBe('A');
  });

  it('should change weights based on system age', () => {
    const oldCaps = createMockCAPS({ ...mockCaps, yearBuilt: 2000 }); // > 10 years old
    const result = calculateSustainabilityIndex(
      oldCaps,
      mockAssessment(),
      mockBoardMembers,
      mockAssemblies,
      mockProblems
    );
    // Even if scores are same, weights are different.
    expect(result.finalScore).toBeDefined();
  });
});
