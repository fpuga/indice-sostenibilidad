# Scoring Engine Specification (IS-JMP)

This document provides the exact mathematical logic for the Sustainability Index, reverse-engineered from the `BBDD Herram IS CAPS 27.06.2023.xlsx` file.

## 1. Global Aggregation Formula

The final Sustainability Index ($IS$) is a weighted sum of 9 criteria ($C_1$ to $C_9$):

$$IS = \sum_{i=1}^{9} (Score(C_i) \times Weight(C_i, \text{Type, Age})) \times 100$$

### Weighting Matrix (Weights)

| Criteria               | 0-5y (MABE) | 5-10y (MABE) | >10y (MABE) | 0-5y (MAG/P) | 5-10y (MAG/P) | >10y (MAG/P) |
| :--------------------- | :---------- | :----------- | :---------- | :----------- | :------------ | :----------- |
| **C1. Organización**   | 0.15        | 0.10         | 0.10        | 0.15         | 0.15          | 0.10         |
| **C2. Nivel Servicio** | 0.05        | 0.05         | 0.05        | 0.05         | 0.05          | 0.05         |
| **C3. Rec. Costes**    | 0.15        | 0.20         | 0.20        | 0.15         | 0.15          | 0.20         |
| **C4. O&M**            | 0.15        | 0.20         | 0.15        | 0.15         | 0.15          | 0.10         |
| **C5. GIRH**           | 0.05        | 0.05         | 0.05        | 0.05         | 0.10          | 0.05         |
| **C6. Rend. Cuentas**  | 0.10        | 0.10         | 0.10        | 0.10         | 0.10          | 0.15         |
| **C7. Conservación**   | 0.10        | 0.05         | 0.05        | 0.10         | 0.05          | 0.05         |
| **C8. Género**         | 0.10        | 0.10         | 0.10        | 0.10         | 0.10          | 0.10         |
| **C9. Autogestión**    | 0.15        | 0.15         | 0.20        | 0.15         | 0.15          | 0.20         |

---

## 2. Criteria Scoring Logic

All scores are normalized between **0.0** and **1.0**.

### C1. Organización

_Calculation:_ `(I * 0.25) + (J * 0.25) + (L * 0.25) + (N * 0.25)`

- **I (Active Members):** `1` if total members $\ge 4$ AND participation $\ge 60\%$, else `0`.
- **J (Legalization):** `1` if (MAG/Well and $\ge 2$ documents) OR (MABE and $\ge 3$ documents), else `0`.
- **L (Gender JD):** `1` if women in Board $\ge 50\%$, else `0`.
- **N (Meetings):** `1` if $\ge 50\%$ of meetings called by CAPS had quorum, else `0`.

### C2. Nivel de Servicio

_Calculation:_ Categorical mapping based on JMP indicators:

- **SEGURA (1.0):** Improved source, located inside house, available all time, E.coli negative.
- **BÁSICO (0.5):** Improved source, fetch time < 30 mins.
- **LIMITADO (0.0):** Improved source, fetch time > 30 mins.
- **NO MEJORADA (0.0):** Non-improved source.

### C3. Recuperación de Costes

_Calculation:_ `(W * 0.25) + (X * 0.25) + (Y * 0.25) + (Z * 0.25)`

- **W:** Has Tariff? (1/0).
- **X:** Has functional bank account? (1/0).
- **Y:** Savings cover 3 months O&M? (1/0).
- **Z:** Morosity < 5%? (1/0).

### C4. Operación y Mantenimiento (O&M)

_Calculation:_ `HasPlan * ExecutesPlan` (Binary AND).

- **1.0** only if both are true, else **0.0**.

### C5. GIRH

_Calculation:_ `Sum(10 Actions) / 10`

- Simple average of the 10 management actions (hygiene, flow records, recharge protection, etc.).

### C6. Rendición de Cuentas

_Calculation:_ `(AP * 0.25) + (AQ * 0.25) + (AR * 0.125) + (AS * 0.125) + (AT * 0.125) + (AU * 0.125)`

- **AP:** Reports economic status to users.
- **AQ:** Reports monthly to Board.
- **AR, AS, AT, AU:** Updated books (Accounting, Users, Minutes, Morosity).

### C7. Conservación (Infrastructure)

_Calculation:_ Specific per system type:

- **MABE:** `(AY * 0.25) + (BA * 0.25) + (BB * 0.25) + (BC * 0.25)`
  - **AY (Pumping):** `1` if $\ge 3$ checks are positive.
  - **BA (Tank):** `1` if $\ge 4$ checks are positive.
  - **BB (Chlorinator):** Functional? (1/0).
  - **BC (Leaks):** No visible leaks? (1/0).
- **MAG:** `Sum(Intake, Tank, Chlorinator, Leaks) / 4`.
- **Pozos:** `Sum(Well, Pump, Apron, Drainage, Soaking) / 5`.

### C8. Género

_Calculation:_ `(BF * 0.5) + (BG * 0.5)`

- **BF:** Regulations adendum for women promotion (1/0).
- **BG:** $\ge 50\%$ completion of gender-positive actions (1/0).

### C9. Autogestión

_Calculation:_ `1.0` if CAPS managed $\ge 50\%$ of presented problems, else `0.0`.

---

## 3. Categories

- **A (80 - 100):** Sustainable (Green).
- **B (60 - 79):** Progressive (Yellow).
- **C (0 - 59):** High Risk (Red).
