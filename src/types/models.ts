export type SystemType =
  | 'MAG'
  | 'MABE'
  | 'MIXTO'
  | 'POZO_EXCAVADO'
  | 'POZO_PERFORADO'
  | 'MANANTIAL'
  | 'LLUVIA'
  | 'SUPERFICIAL';

export type Gender = 'H' | 'M';

export interface CAPS {
  id: string;
  name: string;
  department: string;
  municipality: string;
  community: string;
  gpsX?: number;
  gpsY?: number;
  systemType: SystemType;
  yearBuilt: number;
  yearLastRehabilitated?: number;
  yearConstituted: number;
  boardUpdatedInAna: boolean;
}

export interface CommunityServed {
  id: string;
  capsId: string;
  name: string;
  housesServed: number;
  populationServed: number;
  housesWithoutService: number;
  populationWithoutService: number;
}

export interface BoardMember {
  id: string;
  assessmentId: string;
  role: string;
  name: string;
  gender: Gender;
}

export interface Assembly {
  id: string;
  assessmentId: string;
  activityName: string;
  date: string;
  convokedBy: string;
  hasQuorum: boolean;
  womenAttendancePercentage: number;
  boardAttendance: {
    presidente: boolean;
    secretario: boolean;
    tesorero: boolean;
    fiscal: boolean;
    vocal1: boolean;
    vocal2: boolean;
    vocal3: boolean;
    vocal4: boolean;
    vocal5: boolean;
  };
}

export interface ManagementProblem {
  id: string;
  assessmentId: string;
  problemPresented: boolean;
  description: string;
  actionTaken: boolean;
  entityContacted: string;
  wasSolved: boolean;
}

export interface Assessment {
  id: string;
  capsId: string;
  surveyDate: string;
  surveyorName: string;

  // Section C: Nivel de Servicio
  serviceLevel: {
    sourceType: 'MEJORADA' | 'NO_MEJORADA';
    intakeLocation: 'DENTRO' | 'PATIO' | 'VECINO' | 'PUBLICO';
    fetchTime: 'MAX_30_MIN' | 'MORE_30_MIN';
    waterAvailability: 'SIEMPRE' | 'MAYOR_PARTE' | 'VECES' | 'CASI_NUNCA';
    compliesWithEndowment: boolean;
    qualityPerception: {
      odor: 'BUENO' | 'MALO';
      color: 'BUENO' | 'MALO';
      flavor: 'BUENO' | 'MALO';
    };
    bacteriologicalAnalysisDone: boolean;
    bacteriologicalAnalysisResult: 'NEGATIVO' | 'POSITIVO' | 'NO_SABE';
    otherTests: {
      arsenic: boolean;
      iron: boolean;
      turbidity: boolean;
      ph: boolean;
    };
  };

  // Criterio A: Legalización
  legalization: {
    municipalCertificate: boolean;
    inaaRegistration: boolean;
    rucNumber: boolean;
    differentiatedTariff: boolean;
    sapLegalization: boolean;
    hasAssemblyRecords: 'SI' | 'NO' | 'ALGUNAS';
  };

  // Criterio B: Recuperación de Costes
  costRecovery: {
    hasTariff: boolean;
    tariffType: 'CONSUMO' | 'PROMEDIO' | 'FIJA' | 'NO_PAGAN';
    hasBankAccount: boolean;
    bankAccountEvidence?: string;
    hasSavingsForThreeMonths: boolean;
    savingsEvidence?: string;
    morosityPercentage: 'LESS_5' | '6_15' | 'MORE_15';
  };

  // Criterio C: Operación y Mantenimiento
  operationAndMaintenance: {
    hasOmPlan: boolean;
    omPlanEvidence?: string;
    executesOmPlan: boolean;
    executesOmPlanEvidence?: string;
  };

  // Criterio D: GIRH (10 actions)
  girh: {
    hygieneCampaigns: boolean;
    cleaningDays: boolean;
    recordsMonthlyFlow: boolean;
    informsWaterAvailability: boolean;
    adjustsDistribution: boolean;
    hasMicromeasurement: boolean;
    rechargeAreaIdentified: boolean;
    rechargeAreaCharacterized: boolean;
    rechargeAreaProtectionPlan: boolean;
    protectionPlanImplemented: boolean;
  };

  // Criterio E: Rendición de Cuentas
  accountability: {
    informsEconomicStatus: boolean;
    monthlyAccountabilityToBoard: boolean;
    accountingBookUpdated: boolean;
    usersBookUpdated: boolean;
    minutesBookUpdated: boolean;
    morosityReported: boolean;
  };

  // Criterio F: Conservación (grouped by system type, though only one will be filled)
  conservation: {
    mabe?: {
      pumpingStation: {
        hasFence: boolean;
        noLatrinesNearby: boolean;
        goodConditionCaseta: boolean;
        lockedDoor: boolean;
        macroMeterRegistering: boolean;
      };
      storageTank: {
        hasFenceGoodCondition: boolean;
        noCracks: boolean;
        noLeaks: boolean;
        noOverflow: boolean;
        valvesGoodCondition: boolean;
        inspectionCoverGoodCondition: boolean;
      };
      chlorinationSystemWorking: boolean;
      noVisibleSystemLeaks: boolean;
    };
    mag?: {
      intake: {
        hasFenceGoodCondition: boolean;
        noPollutionSources: boolean;
        noCracksInIntake: boolean;
      };
      storageTank: {
        hasFenceGoodCondition: boolean;
        noCracksInTank: boolean;
        noLeaksInTank: boolean;
        noOverflow: boolean;
        valvesGoodCondition: boolean;
        inspectionCoverGoodCondition: boolean;
      };
      chlorinationSystemWorking: boolean;
      noVisibleSystemLeaks: boolean;
      publicStandposts?: {
        drainageChannelNoCracks: boolean;
        concretePipeGoodCondition: boolean;
        supportPedestalGoodCondition: boolean;
        collectionBoxGoodCondition: boolean;
        faucetsGoodCondition: boolean;
        slabNoCracks: boolean;
      };
    };
    well?: {
      well: {
        hasFence: boolean;
        noLatrinesNearby: boolean;
      };
      handPump: {
        ropeAndPistonsGoodCondition: boolean;
        metalStructureGoodCondition: boolean;
        pumpGuideGoodCondition: boolean;
        bearingsLeverAxlesGoodCondition: boolean;
        risingMainGoodCondition: boolean;
        noCracksInBase: boolean;
      };
      apron: {
        noCracksInCurbs: boolean;
        noCracksInApron: boolean;
      };
      drainageChannel: {
        noObstructions: boolean;
        noCracksInChannel: boolean;
      };
      soakPit: {
        gravelFilterGoodCondition: boolean;
        noSediments: boolean;
      };
      wellCurbing?: {
        noCracksInCurbing: boolean;
        noOxidationInCover: boolean;
      };
    };
  };

  // Criterio G: Género
  gender: {
    genderAdendum: boolean;
    genderActionsCompliance: boolean;
  };
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  finalScore: number;
  category: 'A' | 'B' | 'C';
  criteriaScores: {
    c1_organizacion: number;
    c2_nivel_servicio: number;
    c3_recuperacion_costes: number;
    c4_om: number;
    c5_girh: number;
    c6_rendicion_cuentas: number;
    c7_conservacion: number;
    c8_genero: number;
    c9_autogestion: number;
  };
}
