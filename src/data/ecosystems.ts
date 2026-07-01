export interface Ecosystem {
  id: number;
  hidden?: boolean;
  dictKey: "frontend" | "nodejs" | "java" | "python" | "infra";
}

export const ecosystemsData: Ecosystem[] = [
  { id: 1, dictKey: "frontend" },
  { id: 2, dictKey: "nodejs" },
  { id: 3, dictKey: "java" },
  { id: 4, hidden: true, dictKey: "python" },
  { id: 5, dictKey: "infra" },
];

export const activeEcosystems = ecosystemsData.filter(eco => !eco.hidden);
