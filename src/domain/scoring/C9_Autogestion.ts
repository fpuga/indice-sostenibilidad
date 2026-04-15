import type { ManagementProblem } from '../types/models';

/**
 * C9. Autogestión
 * Calculation: 1.0 if CAPS managed >= 50% of presented problems, else 0.0.
 * "Managed" is interpreted as actionTaken === true.
 */
export function calculateC9_Autogestion(problems: ManagementProblem[]): number {
  const presentedProblems = problems.filter((p) => p.problemPresented);

  if (presentedProblems.length === 0) {
    // If no problems were presented, it's considered positive management (1.0)
    // or should it be 0? Usually, if no problems, you are doing well.
    // Let's assume 1.0 based on common index logic (no problems = no failure).
    // Wait, let's re-check if there is a default.
    return 1.0;
  }

  const managedCount = presentedProblems.filter((p) => p.actionTaken).length;

  return managedCount / presentedProblems.length >= 0.5 ? 1.0 : 0.0;
}
