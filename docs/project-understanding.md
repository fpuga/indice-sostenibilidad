# Proyecto: Índice de Sostenibilidad (IS-JMP)

## Resumen del Proyecto

El "Índice de Sostenibilidad" es una herramienta de diagnóstico y seguimiento para los Comités de Agua Potable y Saneamiento (CAPS), actualmente gestionada mediante encuestas en papel y hojas de cálculo complejas en Excel. El objetivo es medir la sostenibilidad de los sistemas de agua a través de 9 criterios clave (social, técnico, legal, derecho humano al agua, etc.) y guiar a los CAPS hacia un nivel de sostenibilidad "A" (verde).

Este repositorio contendrá un **prototipo de frontend** (React + Vite + Material UI) para digitalizar este proceso, facilitando la toma de datos, automatizando los cálculos y permitiendo el seguimiento temporal de los indicadores.

## Objetivos del Prototipo

1.  **Digitalización de la Toma de Datos:** Crear formularios intuitivos que reflejen la complejidad de la encuesta de campo, con validaciones y lógica condicional según el tipo de sistema (Gravedad, Bombeo, Pozo).
2.  **Cálculo Automático:** Implementar la lógica del índice para obtener resultados inmediatos tras la introducción de datos, eliminando errores manuales de Excel.
3.  **Seguimiento Temporal:** Permitir el registro de múltiples mediciones (Línea de base, seguimiento, final) para un mismo CAPS y visualizar su evolución.
4.  **Persistencia Local:** Simular una base de datos utilizando el almacenamiento del navegador (`localStorage`) para permitir pruebas sin necesidad de un backend complejo inicialmente.
5.  **Visualización (Fases Posteriores):** Generar tablas y gráficos comparativos para analizar el estado global y el avance de los indicadores.

## Alcance Técnico (Fase 1: Entrada de Datos)

- **Interfaz:** Diseño limpio y profesional usando Material UI, enfocado en la usabilidad para técnicos en campo.
- **Configuración:** Valores por defecto para Nicaragua (hardcoded inicialmente pero con estructura flexible para futuros países).
- **Lógica de Negocio:**
  - Soporte para 9 criterios con sus respectivos subcriterios.
  - Cálculos condicionales dinámicos.
  - Gestión de estados "A", "B", "C", "D" según puntajes.
- **Almacenamiento:** CRUD básico de CAPS y sus respectivas encuestas almacenado en `localStorage`.

## Hoja de Ruta Propuesta

1.  **Arquitectura de Datos:** Definir los esquemas de datos para CAPS, Encuestas y Criterios.
2.  **Módulo de Gestión de CAPS:** Listado y creación de Comités.
3.  **Motor de Formularios:** Implementar la encuesta principal con su lógica condicional.
4.  **Motor de Cálculo:** Integrar las fórmulas del IS-JMP.
5.  **Panel de Resultados Individual:** Mostrar el índice calculado para una encuesta específica.
6.  **Comparativa y Gráficos:** Implementar la visualización del avance temporal.

---

_Este documento refleja el consenso alcanzado sobre los requisitos iniciales y servirá de guía para el desarrollo del prototipo._
