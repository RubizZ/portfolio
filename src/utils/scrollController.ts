import { activeEcosystems } from '../data/ecosystems';

export const SCROLL = {
  HERO_END: 400,
  EXPERIENCE_END: 1200,
  ECOSYSTEM_STEP: 800,
  ECOSYSTEM_OVERLAP: 200,
  PROJECT_STEP: 1600,
  SKILLS_GAP: 650,

  getEcosystemStart: (index: number) => SCROLL.EXPERIENCE_END + index * SCROLL.ECOSYSTEM_STEP,
  getEcosystemEnd: (index: number) => SCROLL.EXPERIENCE_END + (index + 1) * SCROLL.ECOSYSTEM_STEP,
  getEcosystemCenter: (index: number) => SCROLL.EXPERIENCE_END + (index + 0.5) * SCROLL.ECOSYSTEM_STEP,

  getTechNetworkEnd: () => SCROLL.EXPERIENCE_END + activeEcosystems.length * SCROLL.ECOSYSTEM_STEP,

  getSkillsEnd: () => SCROLL.getTechNetworkEnd() + SCROLL.SKILLS_GAP,

  getProjectStart: (index: number) => SCROLL.getTechNetworkEnd() + index * SCROLL.PROJECT_STEP,

  getTotalHeight: (numProjects: number) => {
    const base = SCROLL.getTechNetworkEnd();
    if (numProjects === 0) return base + 900;
    return base + (numProjects - 1) * SCROLL.PROJECT_STEP + 950;
  },

  getAllCheckpoints: (numProjects: number) => {
    const points: number[] = [0]; // Hero
    points.push(800); // Experience focus
    for (let i = 0; i < activeEcosystems.length; i++) {
      points.push(SCROLL.getEcosystemCenter(i)); // Ecosystem focus
    }
    // points.push(SCROLL.getSkillsEnd()); // Skills focus - Eliminado porque el proyecto 0 ya se anima junto con el dock
    for (let i = 0; i < numProjects; i++) {
      // El proyecto termina de entrar en startEnter + SKILLS_GAP (650). 
      // Se mantiene fijo hasta +1250. 
      // Así que el punto medio perfecto donde está totalmente visible es +950.
      points.push(SCROLL.getProjectStart(i) + 950); 
    }
    // points.push(SCROLL.getTotalHeight(numProjects)); // Bottom is now handled by native scroll
    return points;
  }
};
