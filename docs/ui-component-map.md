# UI Component & Domain Mapping

This document maps the Excel "sheets" and "cells" to the proposed Web UI components and Data Domains for the React prototype.

## 1. Global Navigation & Layout

- **Component:** `Sidebar` or `Steppers`.
- **Logic:** Should mirror the "Tabla de Contenidos" (`page1.png`).
- **Persistence:** All data is saved to `localStorage` under a unique `capsId`.

## 2. Shared Domain: System Context

- **Inputs:**
  - `systemType` (Dropdown): MAG, MABE, Pozos, etc.
  - `systemAge` (Dropdown): 1 (0-5y), 2 (5-10y), 3 (>10y).
- **Logic:** These two variables determine the weighting matrix used in the final calculation.

## 3. Form Components Mapping

| Excel Sheet               | UI Component           | Input Type                                   | Domain Key       |
| :------------------------ | :--------------------- | :------------------------------------------- | :--------------- |
| **Conformación JD**       | `BoardMemberGrid`      | Checkboxes (H/M)                             | `boardMembers`   |
| **A.Legalización**        | `CheckboxList`         | Binary (1/0)                                 | `legalization`   |
| **A.Org_CAPS**            | `DynamicTable`         | Rows of (Text, Date, Select, Binary)         | `assemblies`     |
| **C.Nivel Servicio**      | `SelectGroup`          | Dropdowns (JMP categories)                   | `serviceLevel`   |
| **D.Recuperación Costes** | `SelectGroup`          | Dropdowns (Tariff type, Morosity %)          | `costRecovery`   |
| **E.Operación y Mant.**   | `BinarySwitch`         | Binary (1/0)                                 | `om`             |
| **F.GIRH**                | `Checklist`            | Binary (1/0)                                 | `girh`           |
| **G.Rendición Cuentas**   | `Checklist`            | Binary (1/0)                                 | `accountability` |
| **H.Conservación**        | `ConditionalChecklist` | Binary (1/0) - Changes based on `systemType` | `infrastructure` |
| **I.Género**              | `MixedForm`            | Auto-calculated (A) + Binary (B)             | `gender`         |
| **J.Autogestión**         | `ProblemTable`         | Dynamic Rows (Problem, Action, Result)       | `selfManagement` |

## 4. Value Mapping (Domains)

### System Age Mapping

- `1` -> "entre 0-5 años"
- `2` -> "5-10 años"
- `3` -> "más de 10 años"

### Service Level Mapping

- `Fuente (C1)`: Mejorada, No mejorada.
- `Ubicación (C2)`: Dentro de la vivienda, En el patio, Tuberia de un vecino, Puesto publico.
- `Acarreo (C3)`: Menos de 30 min., Más de 30 minutos.
- `Disponibilidad (C4)`: Todo el tiempo, La mayor parte, Solo a veces, Casi nunca.
- `Calidad (C8)`: Negativo en E. coli, Positivo en E. coli.

### Cost Recovery Mapping

- `Tarifa (D2)`: por consumo, costo promedio, tarifa fija, no pagan.
- `Morosidad (D5)`: <5%, 6 a 15%, >15%.

## 5. Visual Feedback (Categories)

- **Score >= 80:** "CATEGORIA A" (Green) - "Acciones internas garantizan sostenibilidad".
- **Score 60-79:** "CATEGORIA B" (Yellow) - "Apuntan a la sostenibilidad".
- **Score < 60:** "CATEGORIA C" (Red) - "Riesgo de sostenibilidad".
