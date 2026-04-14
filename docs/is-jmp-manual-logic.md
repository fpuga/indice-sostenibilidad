# IS-JMP: Sustainability Index Logical Framework (Summary)

This document summarizes the logic, weights, and scoring rules from the "Instructivo Indice Sostenibilidad CAPS (Ajustado 2023)" to guide the digital implementation.

## 1. Core Definitions & Variables

### Sustainability Definition

The capacity of the CAPS to maintain a balance in its organization and management of maintenance tasks as autonomously and efficiently as possible, guaranteeing service for the population over time.

### System Types (SAP)

- **MAG:** Miniacueducto por Gravedad (Gravity-fed).
- **MABE:** Miniacueducto por Bombeo Eléctrico (Electric Pumping).
- **Pozos:** Wells (Hand-pump or similar).

### Critical Variables

1. **SAP Age:** 0-5 years, 5-10 years, >10 years.
2. **System Type:** MABE vs. MAG/Pozos.
   _Note: Weights change based on these variables._

---

## 2. Global Weighting Matrix (Table 2)

The 9 criteria are weighted differently to produce the 0-100 score:

### MABE (Electric Pumping)

| Age       | Org | Service | Costs | O&M | GIRH | Accounts | Conserv | Gender | Autogest |
| :-------- | :-- | :------ | :---- | :-- | :--- | :------- | :------ | :----- | :------- |
| **0-5y**  | 15% | 5%      | 15%   | 15% | 5%   | 10%      | 10%     | 10%    | 15%      |
| **5-10y** | 10% | 5%      | 20%   | 20% | 5%   | 10%      | 5%      | 10%    | 15%      |
| **>10y**  | 10% | 5%      | 20%   | 15% | 5%   | 10%      | 5%      | 10%    | 20%      |

### MAG / POZOS

| Age       | Org | Service | Costs | O&M | GIRH | Accounts | Conserv | Gender | Autogest |
| :-------- | :-- | :------ | :---- | :-- | :--- | :------- | :------ | :----- | :------- |
| **0-5y**  | 15% | 5%      | 15%   | 15% | 5%   | 10%      | 10%     | 10%    | 15%      |
| **5-10y** | 15% | 5%      | 15%   | 15% | 10%  | 10%      | 5%      | 10%    | 15%      |
| **>10y**  | 10% | 5%      | 20%   | 10% | 5%   | 15%      | 5%      | 10%    | 20%      |

---

## 3. Detailed Criteria Logic

### 5.1 Organización (Organization)

- **Calculation:** 4 sub-criteria, 25% each.
- **Sub-criteria:**
  1. Active Board Members (min 4 for positive).
  2. Legalization (MAG/Well: 2 permits; MABE: 3 permits). Land legal status is mandatory.
  3. Women participation in Board (min 50% for positive).
  4. Convening capacity (min 50% of assemblies called by CAPS with quorum).

### 5.2 Nivel de Servicio (Service Level)

- Based on JMP/SDG 6.1 scales: **SEGURA** (Safe), **BÁSICO** (Basic), **LIMITADO** (Limited).
- Measured via: Improved source, location (at home), time (<30 mins), availability, quality (perception + lab tests).

### 5.3 Recuperación de Costos (Cost Recovery)

- **Calculation:** 4 sub-criteria, 25% each.
- **Sub-criteria:**
  1. Defined tariff (consumption, average cost, or fixed).
  2. Functional bank account.
  3. Savings covering 3 months of O&M.
  4. Morosity (Delinquency) < 5%.

### 5.4 Operación y Mantenimiento (O&M)

- **Calculation:** Binary (Positive if both are met).
- **Sub-criteria:**
  1. Existence of an O&M Plan.
  2. Execution of >60% of substantial actions in the plan.

### 5.5 GIRH (Integrated Water Resource Management)

- **Calculation:** Additive (0.1 points per action, max 1.0).
- **Actions:** Hygiene campaigns, cleaning days, flow measurements, reporting availability to users, distribution adjustment based on water balance, micrometry, protection of recharge areas (>70% implementation).

### 5.6 Rendición de Cuentas (Accountability)

- **Calculation:**
  - First 2 sub-criteria: 25% each.
  - Next 4 sub-criteria: 12.5% each.
- **Sub-criteria:** Economic reports to users, reports to the Board (monthly), updated books (accounting, users, assemblies), reporting morosity levels.

### 5.7 Estado de Conservación (Infrastructure Status)

- Specific checklists for MABE, MAG, and POZOS.
- **Weighting:** 25% per component (e.g., Pumping station, Tank, Chlorinator, etc.).
- **Specific requirements:**
  - **MABE:** 3/5 in Pumping Station; 4/6 in Tank.
  - **MAG:** 2/3 in Intake (Captación); 4/6 in Tank.
  - **Pozos:** 4/5 in manual pump; 1/2 in drainage.

### 5.8 Enfoque de Género (Gender Focus)

- **Calculation:** 2 processes, 50% each.
- **Process 1:** Positive actions by Board (50% women in Board, President/Treasurer are women, 40% women in assemblies).
- **Process 2:** Actions to promote participation (Adendum to regulations, >50% completion of proposed gender actions).

### 5.9 Autogestión (Self-Management)

- **Calculation:** Positive if >50% of external problems (technical/legal/admin) have been managed by CAPS.

---

## 4. Data Entry & Results

### Input Method

- Digital version should emulate the Excel: **1 for "YES" (True), Empty for "NO" (False).**

### Interpretation Ranges

- **80 - 100 (A) Green:** Sustainable management.
- **60 - 79 (B) Yellow:** Action towards sustainability.
- **0 - 59 (C) Red:** High risk, many weaknesses.
