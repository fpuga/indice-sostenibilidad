# Agent Guide: Sustainability Index (IS-JMP) Project

This document serves as the master index and architectural guide for the **Sustainability Index (IS-JMP)** project. It provides a high-level overview and a directory of the project's foundational documentation for targeted retrieval.

## Project Overview

The "Sustainability Index" (IS-JMP) is a digital tool designed to help Water Committees (CAPS) in Nicaragua monitor and improve their sustainability across 9 key criteria (Social, Technical, Legal, Human Rights, etc.). It automates complex scoring logic previously managed in paper surveys and Excel spreadsheets.

## Tech Stack

- **Frontend:** React 19, Vite, Material UI (MUI), TypeScript.
- **Testing:** Vitest (Unit/Integration), Playwright (E2E).
- **Quality:** Prettier, ESLint, Husky/Lint-Staged.

## Workflow

1. Implement the changes using Red/Green TDD
2. Format the code. `npm run format`
3. Lint the code, and fix the errors if any. `npm run lint`

## Commands

- Start Dev Server. `npm run dev` . Server is localhost:5173. This blocks the terminal. Use tmux when intereactivity is need
- Run Unit Tests. `npm run test:unit`. Executes unit tests once (CI mode)
- Run E2E Tests. `npm run test:e2e`
- Run All Tests. `npm test` . Runs both Unit and E2E tests
- Test Coverage. `npm run test:coverage`. Generates a code coverage report

## Documentation Index (Lazy Loading Directory)

Read these files only when your specific task requires the information they contain.

| File                                         | Purpose                               | When to Read                                                    |
| :------------------------------------------- | :------------------------------------ | :-------------------------------------------------------------- |
| `docs/project-understanding.md`              | Core roadmap and consensus.           | When you need the high-level goals or phased roadmap.           |
| `docs/is-jmp-manual-logic.md`                | General scoring framework summary.    | For a quick overview of the 9 criteria and their weighting.     |
| `docs/cuestionario-data-dictionary-draft.md` | Survey-to-Data-Field mapping.         | When building forms or defining the JSON/TS data schema.        |
| `docs/scoring-engine-spec.md`                | **The Mathematical Source of Truth**. | When implementing or testing the Calculation Engine logic.      |
| `docs/ui-component-map.md`                   | UI/UX and Component Architecture.     | When building the frontend forms and result visualizations.     |
| `docs/xlsx-analysis-plan.md`                 | Historical context on Excel analysis. | Only if you need to understand the reverse-engineering process. |

---

## Core Mandates for Agents

1. **Source of Truth:** For all calculations and scoring logic, `docs/scoring-engine-spec.md` is the definitive reference.
2. **Data Consistency:** Use the identifiers defined in `docs/cuestionario-data-dictionary-draft.md` to ensure a consistent data model from form entry to scoring output.
3. **No Batching:** When implementing forms, handle one CAPS record at a time (rows in Excel = sessions in Web App).
4. **TDD:** Never write implementation code for the scoring engine without a corresponding test file in `tests/`.

## Architecture & Folder Structure

We use a **"Clean-Lite" (Service-based) Architecture** to isolate the scoring engine (domain) from React components and storage mechanisms.

Why this fits best:

1. Testability (Red/Green TDD): You can test the domain/scoring functions in isolation using Vitest without rendering a single React component.
2. Persistence Flexibility: The services/storage layer acts as a repository. Today it uses localStorage, but if you move to a real API tomorrow, you only change the code in one folder; the UI and the Scoring Engine remains untouched.
3. Manageable Complexity: It avoids the "prop-drilling" and "logic-bloat" in components. Your React components will only be responsible for displaying and collecting data, while the hooks/services handle the how and where.

### Folder Structure

```text
src/
├── domain/           # The "Heart": Pure TypeScript logic
│   ├── scoring/      # Scoring engine (No React, just functions)
│   ├── validation/   # Rules for valid CAPS/Assessments
│   └── types/        # (Already created) The data models
├── services/         # Infrastructure bridge
│   ├── storage/      # LocalStorage implementation (can be swapped later)
│   └── CalculationService.ts # Orchestrates data -> scoring engine
├── hooks/            # React integration
│   ├── useCaps.ts    # Custom hook for CAPS CRUD
│   └── useAssessment.ts # Custom hook for scoring logic
├── components/       # UI Layer (MUI + React)
│   ├── common/
│   ├── caps/         # CAPS forms/lists
│   └── assessment/   # Survey forms/results
└── store/            # Global state (optional, e.g., Zustand or Context)
```

### Development Priority

1. **Domain Isolation:** Keep scoring logic pure and highly testable.
2. **Persistence Flexibility:** Ensure the storage layer can be swapped for a real API in the future.
3. **Component Simplicity:** React components should focus on data display and collection.
