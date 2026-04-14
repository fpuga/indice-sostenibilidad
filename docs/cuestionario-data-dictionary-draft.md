# Cuestionario Índice de Sostenibilidad CAPS - Data Dictionary Draft

This document captures the data fields extracted from the survey images (`docs/assets/cuestionario_pages/**`). It serves as the foundation for the application's Data Schema.

## Header Information

- `capsName` (string): "NOMBRE DEL CAPS"
- `gpsCoordinateX` (number): "Coordenadas GPS; X"
- `gpsCoordinateY` (number): "Coordenadas GPS; Y"

## A. INFORMACIÓN DE LA ENCUESTA

- `surveyDate` (string/date): "A1. Fecha de la encuesta"
- `surveyorName` (string): "A2. Nombre de la persona encuestadora"
- `capsNameA3` (string): "A3. Nombre del CAPS"
- `communityName` (string): "A4. COMUNIDAD"
- `municipality` (string): "A5. MUNICIPIO"
- `department` (string): "A6. DEPARTAMENTO"

## B. POBLACIÓN SERVIDA

- `servicedCommunities` (Array of Entities): "B1"
  - `communityName` (string): "NOMBRE DE LA/S COMUNIDAD/ES"
  - `housesServed` (number): "VIVIENDAS ATENDIDAS"
  - `populationServed` (number): "POBLACION ATENDIDA"
  - `housesWithoutService` (number): "VIVIENDAS SIN SERVICIO"
  - `populationWithoutService` (number): "POBLACION SIN SERVICIO"
- `systemType` (string, single choice): "B2. TIPO DE SISTEMA"
  - Choices: MAG, MABE, MIXTO (MABE / MAG), POZO EXCAVADO, POZO PERFORADO, CAPTACIÓN DE MANANTIAL, COSECHA AGUA DE LLUVIA, AGUA SUPERFICIAL
- `yearBuilt` (number): "B3. AÑO DE CONSTRUCCIÓN DEL SAP"
- `yearLastRehabilitated` (number): "B4. AÑO DE ULTIMA REHABILITACIÓN DEL SAP"
- `yearCapsConstituted` (number): "B5. AÑO DE CONSTITUCIÓN DEL CAPS"
- `boardUpdatedInAna` (boolean, SI/NO): "B6. LA JUNTA DIRECTIVA ESTA ACTUALIZADA EN ANA"

## C. NIVEL DE SERVICIO DE AGUA

- `sourceType` (string, single choice): "C.1 TIPO DE FUENTE DE AGUA PARA CONSUMO HUMANO (LA PRINCIPAL)"
  - Choices: MEJORADA, NO MEJORADA
- `intakeLocation` (string, single choice): "C.2 UBICACIÓN DE LA TOMA DE AGUA (LA PRINCIPAL)"
  - Choices: DENTRO DE LA VIVIENDA, EN EL PATIO DE LA VIVIENDA, TUBERÍA DE UN VECINO, PUESTO PUBLICO
- `fetchTime` (string, single choice): "C.3 TIEMPO DE ACARREO DEL AGUA"
  - Choices: MAXIMO MEDIA HORA, MAS DE MEDIA HORA
- `waterAvailability` (string, single choice): "C.4 DISPONIBILIDAD DE AGUA"
  - Choices: TODO EL TIEMPO TENEMOS AGUA, TENEMOS AGUA LA MAYOR PARTE DEL TIEMPO, SOLO A VECES TENEMOS AGUA, CASI NUNCA TENEMOS AGUA
- `compliesWithEndowment` (boolean, SI/NO): "C.5 CUMPLE CON LA DOTACION DE ACUERDO A LAS CATEGORIAS DEL DHA Y LA NORMATIVA NACIONAL."
- `waterQualityPerception` (Object): "C.6 PERCEPCIÓN DE LA CALIDAD DEL AGUA."
  - `odor` (string, Bueno/Malo): "OLOR"
  - `color` (string, Bueno/Malo): "COLOR"
  - `flavor` (string, Bueno/Malo): "SABOR"
- `bacteriologicalAnalysisDone` (boolean, SI/NO): "C.7 EN LOS ULTIMOS TRES MESES SE HAN REALIZADO ANALISIS BACTERIOLOGICO AL AGUA DE CONSUMO"
- `bacteriologicalAnalysisResult` (string, single choice): "C.8 CUAL FUE EL RESULTADO DEL ANALISIS BACTERIOLOGICO DEL AGUA DE CONSUMO."
  - Choices: NEGATIVO DE ESCHERICHIA COLI, POSITIVO DE ESCHERICHIA COLI, NO SABE
- `otherTests` (Object): "C.9 OTRAS PRUEBAS"
  - `arsenic` (boolean, CUMPLE/NO CUMPLE): "ARSENICO"
  - `totalIron` (boolean, CUMPLE/NO CUMPLE): "HIERRO TOTAL"
  - `turbidity` (boolean, CUMPLE/NO CUMPLE): "TURBIDEZ"
  - `ph` (boolean, CUMPLE/NO CUMPLE): "Ph"

## Sección 0. CONFORMACIÓN DE LA JD

- `boardMembers` (Array of Objects): Table of JD Members
  - `role` (string): "Cargo" (e.g., Presidente/a, Secretario/a, Tesorero/a, Fiscal, Vocal 1, Vocal 2, Vocal 3, Vocal 4, Vocal 5)
  - `name` (string): "Nombre JD"
  - `gender` (string, 'H' or 'M'): "H" or "M"

## Criterio A. LEGALIZACIÓN

- `documents` (Object): "A1. Tiene los siguientes documentos (trámite finalizado) (rellene con un SÍ es SÍ)"
  - `municipalCertificate` (boolean): "Certificado Municipal"
  - `inaaRegistration` (boolean): "Certificado Registro INAA"
  - `rucNumber` (boolean): "Número RUC"
  - `differentiatedTariff` (boolean): "Tarifa diferenciada (si es MABE)"
  - `sapLegalization` (boolean): "Legalización del SAP (infraestructuras, terrenos..)"
- `assemblyRecords` (string, single choice): "A2. ¿Tienen memorias de las reuniones/asambleas?"
  - Choices: Sí, No (Salte al Criterio B), Algunas

## Criterio A. ORGANIZACIÓN DEL CAPS (Assemblies Table)

- `assemblies` (Array of Objects): Up to 10 rows.
  - `activityName` (string): "Nombre de la actividad"
  - `date` (string/date): "Fecha"
  - `convokedBy` (string, single choice): "Quien Convoca?"
    - Choices (implied by instructions): CAPS, CAPS+OTRA ORGANIZACIÓN, OTROS...
  - `hasQuorum` (boolean, 1/empty): "Quorum"
  - `womenAttendancePercentage` (number): "% de asistencia de mujeres en las asambleas (se mete en %)"
  - `boardAttendance` (Object): "Cargos JD"
    - `presidente` (string, 'H', 'M', or empty): Tracks if President attended and their gender.
    - `secretario` (string, 'H', 'M', or empty)
    - `tesorero` (string, 'H', 'M', or empty)
    - `fiscal` (string, 'H', 'M', or empty)
    - `vocal1` (string, 'H', 'M', or empty)
    - `vocal2` (string, 'H', 'M', or empty)
    - `vocal3` (string, 'H', 'M', or empty)
    - `vocal4` (string, 'H', 'M', or empty)
    - `vocal5` (string, 'H', 'M', or empty)

## Criterio B. RECUPERACIÓN DE COSTES

- `hasTariff` (boolean, Sí/No): "B1. Disponen de tarifa para el cobro del servicio de agua"
- `tariffType` (string, single choice): "B2. Que tipo de tarifa tienen."
  - Choices: Por consumo, Costo promedio, Tarifa fija, No pagan
- `hasBankAccount` (Object): "B3. Disponen de Cuenta Bancaria (funcional)"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `hasSavingsForThreeMonths` (Object): "B4. La cantidad de dinero que tienen ahorrada en su cuenta le permite pagar los costes de O&M de los próximos tres meses?"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `morosityPercentage` (string, single choice): "B5. Cual es el % de morosidad de los usuarios en el ultimo mes cobrado."
  - Choices: Menos del 5%, Entre 6% y 15%, Mas de 15%

## Criterio C. OPERACIÓN Y MANTENIMIENTO

- `hasOmPlan` (Object): "C1. El CAPS cuenta con un plan de operación y mantenimiento de su SAP."
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `executesOmPlan` (Object): "C2. Realizan la mayoría de las acciones sustanciales definidas in los planes de O y M."
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"

## Criterio D. GESTION INTEGRADA DE RECURSOS HIDRICOS.

- `hygieneCampaigns` (Object): "D1. Realiza campañas de promoción de la higiene con familias."
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `cleaningDays` (Object): "D2. Realiza jornadas de limpiezas comunitarias"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `recordsMonthlyFlow` (Object): "D3. Lleva registro mensual los aforos realizados a la fuente de agua"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `informsWaterAvailability` (Object): "D4. Informa en asamblea de usuarios/as sobre la disponibilidad de agua"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `adjustsDistributionToBalance` (Object): "D5. Elabora y aplica medidas para ajustar la distribución del agua de acuerdo a los resultados del balance de agua en el periodo"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `hasMicromeasurement` (Object): "D6. Dispone de micro medición funcional, o en el caso de pozos o puestos publicos dispone de mecanismo que contribuye a la distribución racional del agua."
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `rechargeAreaIdentified` (Object): "D7. Tiene identificada el área de recarga de la fuente que abastece a su sistema de agua potable."
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `rechargeAreaCharacterized` (Object): "D8. Tiene caracterizada el área de recarga de la fuente que abastece a su sistema de agua potable."
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `rechargeAreaProtectionPlan` (Object): "D9. Tiene elaborado un plan de acción para la protección y conservación del área de recarga de la fuente de agua que abastece el SAP."
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `protectionPlanImplemented` (Object): "D10. Se han implementado al menos un 70 % de las acciones previstas plan de acción para la protección y conservación del área de recarga de la fuente de agua que abastece el SAP."
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"

## Criterio E. RENDICIÓN DE CUENTAS

- `informsEconomicStatus` (Object): "E1. ¿Informa a los usuarios de la situación económica del CAPS de acuerdo a lo establecido en su reglamento interno?"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `monthlyAccountabilityToBoard` (Object): "E2. ¿Hace una rendición de cuentas a la junta directiva del CAPS de manera mensual?"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `accountingBookUpdated` (Object): "E3. ¿Está actualizado el libro de registros contables?"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `usersBookUpdated` (Object): "E4. ¿Está actualizado el libro de usuarios?"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `minutesBookUpdated` (Object): "E5. ¿Está actualizado el libro de actas?"
  - `value` (boolean, SI/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `morosityReported` (Object): "E6. ¿En la rendición de cuentas se informa del % de morosos?"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"

## Criterio F.1 ESTADO DE CONSERVACIÓN DE LOS SITEMAS MABE

- `pumpingStation` (Object): "F1. Sobre la Estación de Bombeo"
  - `hasFence` (boolean): "Tiene cerco de protección el predio del pozo"
  - `noLatrinesNearby` (boolean): "No hay letrinas ubicadas a menos de 20 mts del pozo"
  - `goodConditionCaseta` (boolean): "Las paredes y el techo de la caseta de bombeo están en buen estado"
  - `lockedDoor` (boolean): "La caseta tiene puerta cerrada con llave"
  - `macroMeterRegistering` (boolean): "Está registrando el macromedidor"
- `storageTank` (Object): "F2. Sobre el tanque de almacenamiento"
  - `hasFenceGoodCondition` (boolean): "El tanque, tiene cerca y está en buen estado"
  - `noCracks` (boolean): "El tanque de almacenamiento no tiene grietas"
  - `noLeaks` (boolean): "El tanque no tiene fugas"
  - `noOverflow` (boolean): "El tanque de almacenamiento no rebosa"
  - `valvesGoodCondition` (boolean): "Están las válvulas del tanque en buen estado"
  - `inspectionCoverGoodCondition` (boolean): "Está la tapa de inspección en buen estado"
- `chlorinationSystemWorking` (boolean, Sí/No): "F3. Funciona correctamente el sistema de cloración"
- `noVisibleSystemLeaks` (boolean): "F4. Durante el recorrido no hay fugas visibles en el sistema"

## Criterio F.2 ESTADO DE CONSERVACIÓN DE LOS SITEMAS MAG

- `intake` (Object): "F1. Sobre la Captación"
  - `hasFenceGoodCondition` (boolean): "La cerca de la obra de captación está en buen estado"
  - `noPollutionSources` (boolean): "No se observan focos de contaminación (restos de envases de pesticidas, basura, heces...) alrededor de la fuente de agua"
  - `noCracksInIntake` (boolean): "No tiene grietas la obra de captación"
- `storageTankMag` (Object): "F2. Sobre el Tanque de almacenamiento"
  - `hasFenceGoodCondition` (boolean): "La cerca del tanque está en buen estado"
  - `noCracksInTank` (boolean): "No tiene grietas el tanque de almacenamiento"
  - `noLeaksInTank` (boolean): "No tiene fugas el tanque de almacenamiento"
  - `noOverflow` (boolean): "El tanque no rebosa"
  - `valvesGoodCondition` (boolean): "Las válvulas del tanque están en buen estado"
  - `inspectionCoverGoodCondition` (boolean): "La tapa de inspección está en buen estado"
- `chlorinationSystemWorkingMag` (boolean, Sí/No): "F3. Está funcionando el sistema de cloración"
- `noVisibleSystemLeaksMag` (boolean): "F4. Durante el recorrido, NO hay fugas visibles en el sistema"
- `publicStandposts` (Object): "F5. RELLENAR SÓLO EN EL CASO DE QUE EL SISTEMA TENGA PUESTOS PÚBLICOS"
  - `drainageChannelNoCracks` (boolean): "El canal de desagüe no tiene grietas"
  - `concretePipeGoodCondition` (boolean): "El tubo de concreto está en buen estado"
  - `supportPedestalGoodCondition` (boolean): "El pedestal de apoyo está en buen estado"
  - `collectionBoxGoodCondition` (boolean): "La caja recolectora de agua está en buen estado"
  - `faucetsGoodCondition` (boolean): "Las llaves de abastecimiento están en buen estado"
  - `slabNoCracks` (boolean): "La losa o falda no tiene grietas"

## Criterio F.3 ESTADO DE CONSERVACIÓN DE LOS SISTEMA POZOS EXCAVADOS Y PERFORADOS

- `well` (Object): "F1. Sobre el pozo"
  - `hasFence` (boolean): "Tiene cerco de protección el predio del pozo"
  - `noLatrinesNearby` (boolean): "No hay letrinas ubicadas a menos de 20 mts del pozo"
- `handPump` (Object): "F2. Bomba manual"
  - `ropeAndPistonsGoodCondition` (boolean): "El mecate y los pistones están en buen estado"
  - `metalStructureGoodCondition` (boolean): "La estructura metálica de la bomba está en buen estado"
- `handPump` (Object, Continued)
  - `pumpGuideGoodCondition` (boolean): "La guía de la bomba está en buen estado"
  - `bearingsLeverAxlesGoodCondition` (boolean): "Los cojinetes, la palanca, los ejes de la bomba están en buen estado"
  - `risingMainGoodCondition` (boolean): "Tubería de subida de la bomba están en buen estado"
  - `noCracksInBase` (boolean): "No hay grietas en la base de la bomba"
- `apron` (Object): "F3. Delantal"
  - `noCracksInCurbs` (boolean): "No hay fisuras o grietas en los bordillos del delantal"
  - `noCracksInApron` (boolean): "No hay fisuras o grietas en el delantal del pozo"
- `drainageChannel` (Object): "F4. Canal de Drenaje"
  - `noObstructions` (boolean): "No hay elementos que obstruyan el canal"
  - `noCracksInChannel` (boolean): "No hay fisuras o grietas en el canal de drenaje"
- `soakPit` (Object): "F5. Resumidero"
  - `gravelFilterGoodCondition` (boolean): "El filtro de grava está en buen estado"
  - `noSediments` (boolean): "No tienen sedimentos acumulados en el fondo del filtro"
- `wellCurbing` (Object): "F6. SOLO EN EL CASO DE POZOS EXCAVADOS: Loza del Brocal"
  - `noCracksInCurbing` (boolean): "No hay fisuras o grietas en la loza del brocal"
  - `noOxidationInCover` (boolean): "No hay oxidación en la tapa metálica de visita"

## Criterio G. GÉNERO

- `genderAdendum` (Object): "G1. Ha realizado adendum a su reglamento para la promoción de acciones positivas que promueven la participación de la mujer"
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"
- `genderActionsCompliance` (Object): "G2. Se ha cumplido al menos el 50% de las acciones positivas que promueven la participación de la mujer."
  - `value` (boolean, Sí/No)
  - `evidence` (string): "FUENTE DE VERIFICACIÓN:"

## Criterio H. AUTOGESTIÓN

- `selfManagementProblems` (Array of Objects): Table of up to 10 rows.
  - `problemPresented` (boolean): "Se ha presentado algún problema que trascienda a su capacidad de respuesta? Si (rellene con 1)"
  - `problemDescription` (string): "Describa brevemente el problema"
  - `actionTaken` (boolean): "¿Realizó gestión para solucionarlo? (escriba 1 si es que SÍ)"
  - `entityContacted` (string): "¿A quién acudió?"
  - `wasSolved` (boolean): "¿Se solucionó? (escriba 1 si es que SÍ)"
