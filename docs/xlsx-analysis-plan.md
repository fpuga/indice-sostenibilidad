# Plan: Excel Calculation Engine Reverse Engineering

## Objective

The `docs/assets/BBDD Herram IS CAPS 27.06.2023.xlsx` file serves as the ground truth for the computational logic of the Sustainability Index. While the physical questionnaire (`cuestionario_pages`) provides the questions, the Excel file contains the exact formulas, weighting, and data transformations required to generate the final A/B/C sustainability score.

This plan outlines the systematic approach to extract this logic and translate it into a structured format that can be easily implemented in TypeScript.

## 1. Mapping Discrepancies (Paper vs. Excel)

Initial inspection reveals structural differences between the paper survey and the Excel database:

- **Criteria Labels:** The lettering differs. For example, "Recuperación de Costes" is Criterio B on paper but Sheet "D" in Excel. "O&M" is Criterio C on paper but Sheet "E" in Excel.
- **Data Entry Format:** The Excel file uses a tabular structure where each row is a different CAPS (identified by a letter/name), whereas the paper is a single instance.
- **Action:** We will create a mapping table to link our `cuestionario-data-dictionary-draft.md` identifiers to the specific Excel sheets and columns.

## 2. Extracting Sub-Criteria Formulas (Sheet by Sheet)

For every functional sheet (`Conformación JD` through `J.AutoGestionCAPS`), we need to extract the specific calculation rules:

- **Identify the Output Cell/Column:** Where does the sheet calculate the final score for that specific criteria? (Usually a "Valor Total" or "%" column at the end).
- **Extract the Math:** Use a Python script with `openpyxl` to extract the exact Excel formula string from the first valid data row (e.g., row 4 for CAPS "Los Encuentros").
- **Identify Edge Cases:** Look for `IF()` conditions, `VLOOKUP`s, or hardcoded threshold rules (e.g., "if more than 4 members, then 1, else 0").

## 3. Extracting Global Aggregation Logic

The `RESULTADO FINAL SOSTENIBILIDAD` sheet is the master calculator.

- **Identify Weighting Logic:** Extract the formulas that multiply the sub-criteria scores by their respective weights.
- **Verify Conditional Weights:** Ensure the formulas correctly apply different weights based on the variables `Tipo de Sistema` (MABE vs. MAG/Pozos) and `Tiempo de Conformación` (Age: 0-5, 5-10, >10 years), as summarized in `docs/is-jmp-manual-logic.md`.
- **Determine the Final Categorization:** Extract the exact logic that converts the 0-100 numerical score into the A (80-100), B (50-79), C (0-49) categories. _(Note: The manual says 60-79 is B, but the Excel snippet showed "CATEGORÍA DE 50-79". We must resolve this discrepancy using the Excel file as the source of truth)._

## 4. Expected Artifacts

Execution of this plan will result in:

1. **`docs/scoring-engine-spec.md`**: A comprehensive, mathematically precise specification document. It will detail the exact TS/JS logic needed for every step of the calculation, ensuring zero ambiguity during implementation.
2. **Updates to `docs/cuestionario-data-dictionary-draft.md`**: Adjustments to data types or missing helper fields required by the calculations.

## 5. Execution Method

We will execute Python scripts utilizing the `openpyxl` library to programmatically read the formulas (`data_only=False`) from specific target cells within the workbook, avoiding manual visual parsing of a complex spreadsheet.
