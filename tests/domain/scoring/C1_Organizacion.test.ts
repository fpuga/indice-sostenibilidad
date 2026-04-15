import { describe, it, expect } from 'vitest';
import { calculateC1_Organizacion } from '../../../src/domain/scoring/C1_Organizacion';
import { BoardMember, Assembly, SystemType } from '../../../src/domain/types/models';
import { createMockAssessment, createMockBoardMember, createMockAssembly } from '../../factories';

describe('C1_Organizacion Calculation', () => {
  const mockBoardMembers = (count: number, femaleCount: number = 0): BoardMember[] => {
    const members: BoardMember[] = [];
    for (let i = 0; i < count; i++) {
      members.push(
        createMockBoardMember({
          id: `b${i}`,
          gender: i < femaleCount ? 'M' : 'H',
        })
      );
    }
    return members;
  };

  const mockAssemblies = (
    count: number,
    hasQuorum: boolean = true,
    attendancePerAssembly: number = 0
  ): Assembly[] =>
    Array.from({ length: count }, (_, i) =>
      createMockAssembly({
        id: `as${i}`,
        hasQuorum,
        boardAttendance: {
          presidente: attendancePerAssembly > 0,
          secretario: attendancePerAssembly > 1,
          tesorero: attendancePerAssembly > 2,
          fiscal: attendancePerAssembly > 3,
          vocal1: attendancePerAssembly > 4,
          vocal2: attendancePerAssembly > 5,
          vocal3: attendancePerAssembly > 6,
          vocal4: attendancePerAssembly > 7,
          vocal5: attendancePerAssembly > 8,
        },
      })
    );

  it('should return 1 when all criteria are met (MAG)', () => {
    const assessment = createMockAssessment({
      legalization: {
        municipalCertificate: true,
        inaaRegistration: true,
        rucNumber: false,
        differentiatedTariff: false,
        sapLegalization: true, // 3 docs total
        hasAssemblyRecords: 'SI',
      },
    });
    const boardMembers = mockBoardMembers(4, 2); // 4 members, 50% female
    const assemblies = mockAssemblies(2, true, 3); // 2 assemblies with quorum, 3/4 attendance = 75%
    const systemType: SystemType = 'MAG';

    const result = calculateC1_Organizacion(assessment, boardMembers, assemblies, systemType);
    expect(result).toBe(1);
  });

  it('should return 0 when no criteria are met', () => {
    const assessment = createMockAssessment();
    const boardMembers = mockBoardMembers(3, 0); // < 4 members
    const assemblies = mockAssemblies(1, false, 0); // 0 attendance, no quorum
    const systemType: SystemType = 'MABE';

    const result = calculateC1_Organizacion(assessment, boardMembers, assemblies, systemType);
    expect(result).toBe(0);
  });

  describe('I: Active Members', () => {
    it('should be positive with 4 members and 60%+ attendance', () => {
      const assessment = createMockAssessment();
      const boardMembers = mockBoardMembers(4, 0);
      const assemblies = mockAssemblies(1, true, 3); // 3/4 = 75%
      const result = calculateC1_Organizacion(assessment, boardMembers, assemblies, 'MAG');
      // result = 0.25 (I) + 0 (J) + 0 (L) + 0.25 (N) = 0.5
      expect(result).toBeGreaterThanOrEqual(0.25);
    });

    it('should be negative with < 4 members', () => {
      const assessment = createMockAssessment();
      const boardMembers = mockBoardMembers(3, 0);
      const assemblies = mockAssemblies(1, true, 3);
      const result = calculateC1_Organizacion(assessment, boardMembers, assemblies, 'MAG');
      // I is 0, N is 0.25
      expect(result).toBe(0.25);
    });

    it('should be negative with < 60% attendance', () => {
      const assessment = createMockAssessment();
      const boardMembers = mockBoardMembers(5, 0);
      const assemblies = mockAssemblies(1, true, 2); // 2/5 = 40%
      const result = calculateC1_Organizacion(assessment, boardMembers, assemblies, 'MAG');
      expect(result).toBe(0.25); // only N is positive
    });
  });

  describe('J: Legalization', () => {
    it('should be positive for MAG with 2 documents', () => {
      const assessment = createMockAssessment({
        legalization: {
          municipalCertificate: true,
          inaaRegistration: true,
          rucNumber: false,
          differentiatedTariff: false,
          sapLegalization: false,
          hasAssemblyRecords: 'NO',
        },
      });
      const result = calculateC1_Organizacion(assessment, [], [], 'MAG');
      expect(result).toBe(0.25);
    });

    it('should be negative for MABE with 2 documents', () => {
      const assessment = createMockAssessment({
        legalization: {
          municipalCertificate: true,
          inaaRegistration: true,
          rucNumber: false,
          differentiatedTariff: false,
          sapLegalization: false,
          hasAssemblyRecords: 'NO',
        },
      });
      const result = calculateC1_Organizacion(assessment, [], [], 'MABE');
      expect(result).toBe(0);
    });

    it('should be positive for MABE with 3 documents', () => {
      const assessment = createMockAssessment({
        legalization: {
          municipalCertificate: true,
          inaaRegistration: true,
          rucNumber: true,
          differentiatedTariff: false,
          sapLegalization: false,
          hasAssemblyRecords: 'NO',
        },
      });
      const result = calculateC1_Organizacion(assessment, [], [], 'MABE');
      expect(result).toBe(0.25);
    });
  });

  describe('L: Gender JD', () => {
    it('should be positive with >= 50% women', () => {
      const boardMembers = mockBoardMembers(4, 2);
      const result = calculateC1_Organizacion(createMockAssessment(), boardMembers, [], 'MAG');
      expect(result).toBe(0.25);
    });

    it('should be negative with < 50% women', () => {
      const boardMembers = mockBoardMembers(4, 1);
      const result = calculateC1_Organizacion(createMockAssessment(), boardMembers, [], 'MAG');
      expect(result).toBe(0);
    });
  });

  describe('N: Meetings', () => {
    it('should be positive if >= 50% of CAPS assemblies have quorum', () => {
      const assemblies = [...mockAssemblies(1, true), ...mockAssemblies(1, false)]; // 1/2 = 50%
      const result = calculateC1_Organizacion(createMockAssessment(), [], assemblies, 'MAG');
      expect(result).toBe(0.25);
    });
  });
});
