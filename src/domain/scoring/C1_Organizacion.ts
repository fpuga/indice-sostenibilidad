import type { Assessment, BoardMember, Assembly, SystemType } from '../types/models';

/**
 * C1. Organización
 * Calculation: (I * 0.25) + (J * 0.25) + (L * 0.25) + (N * 0.25)
 *
 * I (Active Members): 1 if total members >= 4 AND participation >= 60%, else 0.
 * J (Legalization): 1 if (MAG/Well and >= 2 documents) OR (MABE and >= 3 documents), else 0.
 * L (Gender JD): 1 if women in Board >= 50%, else 0.
 * N (Meetings): 1 if >= 50% of meetings called by CAPS had quorum, else 0.
 */
export function calculateC1_Organizacion(
  assessment: Assessment,
  boardMembers: BoardMember[],
  assemblies: Assembly[],
  systemType: SystemType
): number {
  const totalMembers = boardMembers.length;

  // I: Active Members
  let iScore = 0;
  if (totalMembers >= 4) {
    const capsAssemblies = assemblies.filter((a) => a.convokedBy === 'CAPS');
    if (capsAssemblies.length > 0) {
      let totalAttendanceCount = 0;
      capsAssemblies.forEach((a) => {
        // Count how many board members attended this assembly
        const attendance = Object.values(a.boardAttendance).filter((val) => val === true).length;
        totalAttendanceCount += attendance;
      });
      // Average participation of board members across all CAPS-convoked assemblies
      const averageParticipation = totalAttendanceCount / (totalMembers * capsAssemblies.length);
      if (averageParticipation >= 0.6) {
        iScore = 1;
      }
    }
  }

  // J: Legalization
  const docs = assessment.legalization;
  const docCount = [
    docs.municipalCertificate,
    docs.inaaRegistration,
    docs.rucNumber,
    docs.differentiatedTariff,
    docs.sapLegalization,
  ].filter(Boolean).length;

  let jScore = 0;
  const isMabeLike = systemType === 'MABE' || systemType === 'MIXTO';
  if (isMabeLike) {
    if (docCount >= 3) jScore = 1;
  } else {
    // MAG, Wells, etc.
    if (docCount >= 2) jScore = 1;
  }

  // L: Gender JD
  const womenCount = boardMembers.filter((m) => m.gender === 'M').length;
  const lScore = totalMembers > 0 && womenCount / totalMembers >= 0.5 ? 1 : 0;

  // N: Meetings
  const capsAssemblies = assemblies.filter((a) => a.convokedBy === 'CAPS');
  let nScore = 0;
  if (capsAssemblies.length > 0) {
    const quorumCount = capsAssemblies.filter((a) => a.hasQuorum).length;
    if (quorumCount / capsAssemblies.length >= 0.5) {
      nScore = 1;
    }
  }

  return iScore * 0.25 + jScore * 0.25 + lScore * 0.25 + nScore * 0.25;
}
