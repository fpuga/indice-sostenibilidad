import { describe, it, expect } from 'vitest';
import { calculateC2_NivelServicio } from '../../../src/domain/scoring/C2_NivelServicio';
import { createMockAssessment } from '../../factories';

describe('C2_NivelServicio Calculation', () => {
  it('should return 1.0 for SEGURA', () => {
    const assessment = createMockAssessment({
      serviceLevel: {
        sourceType: 'MEJORADA',
        intakeLocation: 'DENTRO',
        fetchTime: 'MAX_30_MIN',
        waterAvailability: 'SIEMPRE',
        compliesWithEndowment: true,
        qualityPerception: { odor: 'BUENO', color: 'BUENO', flavor: 'BUENO' },
        bacteriologicalAnalysisDone: true,
        bacteriologicalAnalysisResult: 'NEGATIVO',
        otherTests: { arsenic: false, iron: false, turbidity: false, ph: false },
      },
    });
    expect(calculateC2_NivelServicio(assessment)).toBe(1.0);
  });

  it('should return 0.5 for BÁSICO', () => {
    const assessment = createMockAssessment({
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
    });
    expect(calculateC2_NivelServicio(assessment)).toBe(0.5);
  });

  it('should return 0.0 for LIMITADO', () => {
    const assessment = createMockAssessment({
      serviceLevel: {
        sourceType: 'MEJORADA',
        intakeLocation: 'PATIO',
        fetchTime: 'MORE_30_MIN',
        waterAvailability: 'MAYOR_PARTE',
        compliesWithEndowment: true,
        qualityPerception: { odor: 'BUENO', color: 'BUENO', flavor: 'BUENO' },
        bacteriologicalAnalysisDone: true,
        bacteriologicalAnalysisResult: 'POSITIVO',
        otherTests: { arsenic: false, iron: false, turbidity: false, ph: false },
      },
    });
    expect(calculateC2_NivelServicio(assessment)).toBe(0.0);
  });

  it('should return 0.0 for NO MEJORADA', () => {
    const assessment = createMockAssessment({
      serviceLevel: {
        sourceType: 'NO_MEJORADA',
        intakeLocation: 'PATIO',
        fetchTime: 'MAX_30_MIN',
        waterAvailability: 'MAYOR_PARTE',
        compliesWithEndowment: true,
        qualityPerception: { odor: 'BUENO', color: 'BUENO', flavor: 'BUENO' },
        bacteriologicalAnalysisDone: true,
        bacteriologicalAnalysisResult: 'POSITIVO',
        otherTests: { arsenic: false, iron: false, turbidity: false, ph: false },
      },
    });
    expect(calculateC2_NivelServicio(assessment)).toBe(0.0);
  });
});
