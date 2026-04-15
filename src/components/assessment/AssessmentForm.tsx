import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Box, Chip, Stack, Divider } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import FormSectionLayout from '../common/FormSectionLayout';
import { CapsService } from '../../services/storage/CapsService';
import { AssessmentService } from '../../services/storage/AssessmentService';
import { calculateSustainabilityIndex } from '../../domain/scoring/ScoringEngine';
import type {
  Assessment,
  CAPS,
  BoardMember,
  Assembly,
  ManagementProblem,
} from '../../domain/types/models';

// Section Components
import GeneralSection from './sections/GeneralSection';
import C1_Organizacion from './sections/C1_Organizacion';
import C2_NivelServicio from './sections/C2_NivelServicio';
import C3_RecuperacionCostes from './sections/C3_RecuperacionCostes';
import C4_OM from './sections/C4_OM';
import C5_GIRH from './sections/C5_GIRH';
import C6_RendicionCuentas from './sections/C6_RendicionCuentas';
import C7_Conservacion from './sections/C7_Conservacion';
import C8_Genero from './sections/C8_Genero';
import C9_Autogestion from './sections/C9_Autogestion';

const SECTIONS = [
  { id: 'general', label: 'Datos de la Encuesta' },
  { id: 'c1', label: 'C1: Organización' },
  { id: 'c2', label: 'C2: Nivel de Servicio' },
  { id: 'c3', label: 'C3: Recup. Costes' },
  { id: 'c4', label: 'C4: Op. y Mant.' },
  { id: 'c5', label: 'C5: GIRH' },
  { id: 'c6', label: 'C6: Rend. Cuentas' },
  { id: 'c7', label: 'C7: Conservación' },
  { id: 'c8', label: 'C8: Género' },
  { id: 'c9', label: 'C9: Autogestión' },
];

const AssessmentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const capsIdFromQuery = queryParams.get('capsId');

  const [activeSection, setActiveSection] = useState('general');
  const [caps, setCaps] = useState<CAPS | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState<Assessment>({
    id: id || '',
    capsId: capsIdFromQuery || '',
    surveyDate: new Date().toISOString().split('T')[0],
    surveyorName: '',
    legalization: {
      municipalCertificate: false,
      inaaRegistration: false,
      rucNumber: false,
      differentiatedTariff: false,
      sapLegalization: false,
      hasAssemblyRecords: 'NO',
    },
    serviceLevel: {
      sourceType: 'MEJORADA',
      intakeLocation: 'PATIO',
      fetchTime: 'MAX_30_MIN',
      waterAvailability: 'MAYOR_PARTE',
      compliesWithEndowment: true,
      qualityPerception: { odor: 'BUENO', color: 'BUENO', flavor: 'BUENO' },
      bacteriologicalAnalysisDone: false,
      bacteriologicalAnalysisResult: 'NO_SABE',
      otherTests: { arsenic: false, iron: false, turbidity: false, ph: false },
    },
    costRecovery: {
      hasTariff: false,
      tariffType: 'NO_PAGAN',
      hasBankAccount: false,
      hasSavingsForThreeMonths: false,
      morosityPercentage: 'MORE_15',
    },
    operationAndMaintenance: {
      hasOmPlan: false,
      executesOmPlan: false,
    },
    girh: {
      hygieneCampaigns: false,
      cleaningDays: false,
      recordsMonthlyFlow: false,
      informsWaterAvailability: false,
      adjustsDistribution: false,
      hasMicromeasurement: false,
      rechargeAreaIdentified: false,
      rechargeAreaCharacterized: false,
      rechargeAreaProtectionPlan: false,
      protectionPlanImplemented: false,
    },
    accountability: {
      informsEconomicStatus: false,
      monthlyAccountabilityToBoard: false,
      accountingBookUpdated: false,
      usersBookUpdated: false,
      minutesBookUpdated: false,
      morosityReported: false,
    },
    conservation: {
      mabe: {
        pumpingStation: {
          hasFence: false,
          noLatrinesNearby: false,
          goodConditionCaseta: false,
          lockedDoor: false,
          macroMeterRegistering: false,
        },
        storageTank: {
          hasFenceGoodCondition: false,
          noCracks: false,
          noLeaks: false,
          noOverflow: false,
          valvesGoodCondition: false,
          inspectionCoverGoodCondition: false,
        },
        chlorinationSystemWorking: false,
        noVisibleSystemLeaks: false,
      },
      mag: {
        intake: {
          hasFenceGoodCondition: false,
          noPollutionSources: false,
          noCracksInIntake: false,
        },
        storageTank: {
          hasFenceGoodCondition: false,
          noCracksInTank: false,
          noLeaksInTank: false,
          noOverflow: false,
          valvesGoodCondition: false,
          inspectionCoverGoodCondition: false,
        },
        chlorinationSystemWorking: false,
        noVisibleSystemLeaks: false,
      },
      well: {
        well: {
          hasFence: false,
          noLatrinesNearby: false,
        },
        handPump: {
          ropeAndPistonsGoodCondition: false,
          metalStructureGoodCondition: false,
          pumpGuideGoodCondition: false,
          bearingsLeverAxlesGoodCondition: false,
          risingMainGoodCondition: false,
          noCracksInBase: false,
        },
        apron: {
          noCracksInCurbs: false,
          noCracksInApron: false,
        },
        drainageChannel: {
          noObstructions: false,
          noCracksInChannel: false,
        },
        soakPit: {
          gravelFilterGoodCondition: false,
          noSediments: false,
        },
      },
    },
    gender: {
      genderAdendum: false,
      genderActionsCompliance: false,
    },
  });

  // Related collections (Mocked for now as we don't have nested forms yet)
  const [boardMembers] = useState<BoardMember[]>([]);
  const [assemblies] = useState<Assembly[]>([]);
  const [problems] = useState<ManagementProblem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id && id !== 'new') {
        const data = await AssessmentService.getById(id);
        if (data) {
          setFormData(data);
          const c = await CapsService.getById(data.capsId);
          if (c) setCaps(c);
        }
      } else if (capsIdFromQuery) {
        const c = await CapsService.getById(capsIdFromQuery);
        if (c) {
          setCaps(c);
          setFormData((prev) => ({ ...prev, capsId: capsIdFromQuery }));
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [id, capsIdFromQuery]);

  // Live Score Calculation
  const liveResult = useMemo(() => {
    if (!caps) return null;
    try {
      return calculateSustainabilityIndex(caps, formData, boardMembers, assemblies, problems);
    } catch (e) {
      console.error('Error calculating score:', e);
      return null;
    }
  }, [caps, formData, boardMembers, assemblies, problems]);

  const handleSave = async () => {
    await AssessmentService.save({
      ...formData,
      result: liveResult || undefined,
    });
    navigate('/assessments');
  };

  const getScoreColor = (category?: string) => {
    switch (category) {
      case 'A':
        return 'success';
      case 'B':
        return 'warning';
      case 'C':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;

  return (
    <FormSectionLayout
      title="Encuesta de Sostenibilidad"
      sections={SECTIONS}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSave={handleSave}
      onCancel={() => navigate('/assessments')}
    >
      {/* Live Result Summary */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          backgroundColor: 'rgba(0, 76, 140, 0.03)',
          borderRadius: 2,
          border: '1px solid rgba(0, 76, 140, 0.1)',
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ alignItems: 'center' }}
        >
          <Box>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
              ESTADO ACTUAL:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5, alignItems: 'center' }}>
              <Chip
                label={liveResult ? `${Math.round(liveResult.finalScore)}%` : '---'}
                color={getScoreColor(liveResult?.category)}
                sx={{ fontWeight: 800, fontSize: '1.1rem' }}
              />
              <Typography variant="h6" color={getScoreColor(liveResult?.category)}>
                Categoría {liveResult?.category || '-'}
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
              CAPS:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {caps?.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Sistema: {caps?.systemType}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Form Content */}
      {activeSection === 'general' && (
        <GeneralSection formData={formData} setFormData={setFormData} />
      )}

      {activeSection === 'c1' && (
        <C1_Organizacion
          formData={formData}
          setFormData={setFormData}
          boardMembers={boardMembers}
          assemblies={assemblies}
        />
      )}

      {activeSection === 'c2' && <C2_NivelServicio formData={formData} setFormData={setFormData} />}

      {activeSection === 'c3' && (
        <C3_RecuperacionCostes formData={formData} setFormData={setFormData} />
      )}

      {activeSection === 'c4' && <C4_OM formData={formData} setFormData={setFormData} />}

      {activeSection === 'c5' && <C5_GIRH formData={formData} setFormData={setFormData} />}

      {activeSection === 'c6' && (
        <C6_RendicionCuentas formData={formData} setFormData={setFormData} />
      )}

      {activeSection === 'c7' && (
        <C7_Conservacion formData={formData} setFormData={setFormData} caps={caps} />
      )}

      {activeSection === 'c8' && <C8_Genero formData={formData} setFormData={setFormData} />}

      {activeSection === 'c9' && <C9_Autogestion problems={problems} />}
    </FormSectionLayout>
  );
};

export default AssessmentForm;
