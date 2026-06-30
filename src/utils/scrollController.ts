import { activeEcosystems } from '../data/ecosystems';

export const SCROLL = {
  HERO_END: 400,
  ECOSYSTEM_STEP: 800,
  ECOSYSTEM_OVERLAP: 200,
  PROJECT_STEP: 1600,
  SKILLS_GAP: 650,

  getEcosystemStart: (index: number) => SCROLL.HERO_END + index * SCROLL.ECOSYSTEM_STEP,
  getEcosystemEnd: (index: number) => SCROLL.HERO_END + (index + 1) * SCROLL.ECOSYSTEM_STEP,
  getEcosystemCenter: (index: number) => SCROLL.HERO_END + (index + 0.5) * SCROLL.ECOSYSTEM_STEP,

  getTechNetworkEnd: () => SCROLL.HERO_END + activeEcosystems.length * SCROLL.ECOSYSTEM_STEP,

  getSkillsEnd: () => SCROLL.getTechNetworkEnd() + SCROLL.SKILLS_GAP,

  getProjectStart: (index: number) => SCROLL.getTechNetworkEnd() + index * SCROLL.PROJECT_STEP,

  getTotalHeight: (numProjects: number) => {
    const base = SCROLL.getTechNetworkEnd();
    if (numProjects === 0) return base + 900;
    return base + (numProjects - 1) * SCROLL.PROJECT_STEP + 1600;
  }
};
