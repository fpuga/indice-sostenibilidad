import type { CAPS } from '../../domain/types/models';

const STORAGE_KEY = 'is_jmp_caps';

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

const getStoredCaps = (): CAPS[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_CAPS));
    return MOCK_CAPS;
  }
  return JSON.parse(stored);
};

export const CapsService = {
  getAll: async (): Promise<CAPS[]> => {
    return getStoredCaps();
  },

  getById: async (id: string): Promise<CAPS | undefined> => {
    return getStoredCaps().find((c) => c.id === id);
  },

  save: async (caps: Partial<CAPS>): Promise<CAPS> => {
    const capsList = getStoredCaps();
    let updatedCaps: CAPS;

    if (caps.id) {
      const index = capsList.findIndex((c) => c.id === caps.id);
      if (index !== -1) {
        updatedCaps = { ...capsList[index], ...caps } as CAPS;
        capsList[index] = updatedCaps;
      } else {
        updatedCaps = caps as CAPS;
        capsList.push(updatedCaps);
      }
    } else {
      updatedCaps = {
        ...caps,
        id: Math.random().toString(36).substr(2, 9),
      } as CAPS;
      capsList.push(updatedCaps);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(capsList));
    return updatedCaps;
  },

  delete: async (id: string): Promise<void> => {
    const capsList = getStoredCaps().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(capsList));
  },
};
