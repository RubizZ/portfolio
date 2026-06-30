export interface Ecosystem {
  id: number;
  name: string;
  shortName: string;
  hidden?: boolean;
}

export const ecosystemsData: Ecosystem[] = [
  { id: 1, name: "01_ FRONTEND", shortName: "Frontend" },
  { id: 2, name: "02_ NODE.JS", shortName: "Node.js" },
  { id: 3, name: "03_ JAVA", shortName: "Java" },
  { id: 4, name: "04_ PYTHON", shortName: "Python", hidden: true },
  { id: 5, name: "05_ INFRA & DATOS", shortName: "Infraestructura" },
];

export const activeEcosystems = ecosystemsData.filter(eco => !eco.hidden);
