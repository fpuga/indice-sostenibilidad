import type { CAPS } from '../../domain/types/models';

const MOCK_CAPS: CAPS[] = [
  {
    id: '1',
    name: 'CAPS El Porvenir',
    department: 'León',
    municipality: 'Nagarote',
    community: 'El Porvenir',
    systemType: 'MAG',
    yearBuilt: 2010,
    yearConstituted: 2011,
    boardUpdatedInAna: true,
  },
  {
    id: '2',
    name: 'CAPS Santa Rosa',
    department: 'Chinandega',
    municipality: 'Somotillo',
    community: 'Santa Rosa',
    systemType: 'MABE',
    yearBuilt: 2015,
    yearConstituted: 2016,
    boardUpdatedInAna: false,
  },
  {
    id: '3',
    name: 'CAPS Los Laureles',
    department: 'Matagalpa',
    municipality: 'Sébaco',
    community: 'Los Laureles',
    systemType: 'POZO_PERFORADO',
    yearBuilt: 2005,
    yearConstituted: 2005,
    boardUpdatedInAna: true,
  },
];

export const CapsService = {
  getAll: async (): Promise<CAPS[]> => {
    return MOCK_CAPS;
  },
  getById: async (id: string): Promise<CAPS | undefined> => {
    return MOCK_CAPS.find((c) => c.id === id);
  },
};
