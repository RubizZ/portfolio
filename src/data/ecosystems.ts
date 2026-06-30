export interface Ecosystem {
  id: number;
  name: string;
  shortName: string;
  hidden?: boolean;
}

export const ecosystemsData: Ecosystem[] = [
  { id: 1, name: "FRONTEND", shortName: "Frontend" },
  { id: 2, name: "NODE.JS", shortName: "Node.js" },
  { id: 3, name: "JAVA", shortName: "Java" },
  { id: 4, name: "PYTHON", shortName: "Python", hidden: true },
  { id: 5, name: "INFRA & DATOS", shortName: "Infraestructura" },
];

export const activeEcosystems = ecosystemsData.filter(eco => !eco.hidden);
