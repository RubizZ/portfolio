import {
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiAndroid,
  SiHtml5,
  SiExpress,
  SiPython,
  SiTensorflow,
  SiCss,
  SiTailwindcss,
  SiMongodb,
  SiThreedotjs,
  SiDocker,
  SiMysql,
  SiVite,
  SiReactquery,
  SiAxios,
  SiPrisma,
  SiPostgresql,
  SiSupabase,
  SiJest,
  SiI18Next,
  SiZod,
} from "react-icons/si";
import { FaCode, FaJava, FaLeaf, FaAndroid } from "react-icons/fa";

export interface SkillNode {
  id: number;
  name: string;
  icon: any;
  color?: string;
  x?: number;
  y?: number;
  ecosystem?: number; // 1: WEB, 2: JAVA, 3: C++, 4: PYTHON
}

// Fuente de verdad para todas las habilidades (Skills) y Conocimientos (TechNetwork)
export const skillsData: SkillNode[] = [
  { id: 0, name: "Todas", icon: FaCode },
  // Frontend (Ecosistema 1)
  { id: 1, name: "React", icon: SiReact, color: "#61DAFB", x: 20, y: 50, ecosystem: 1 },
  { id: 5, name: "Next.js", icon: SiNextdotjs, color: "#ffffff", x: 50, y: 20, ecosystem: 1 },
  { id: 6, name: "Vite", icon: SiVite, color: "#646CFF", x: 80, y: 30, ecosystem: 1 },
  { id: 7, name: "React Query", icon: SiReactquery, color: "#FF4154", x: 75, y: 70, ecosystem: 1 },
  { id: 13, name: "HTML", icon: SiHtml5, color: "#E34F26", x: 25, y: 25, ecosystem: 1 },
  { id: 14, name: "CSS", icon: SiCss, color: "#1572B6", x: 35, y: 75, ecosystem: 1 },
  { id: 15, name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", x: 55, y: 80, ecosystem: 1 },
  { id: 16, name: "Three.js", icon: SiThreedotjs, color: "#ffffff", x: 65, y: 45, ecosystem: 1 },
  { id: 12, name: "i18next", icon: SiI18Next, color: "#26A69A", x: 40, y: 45, ecosystem: 1 },

  // Node.js (Ecosistema 2)
  { id: 2, name: "TypeScript", icon: SiTypescript, color: "#3178C6", x: 82, y: 22, ecosystem: 2 },
  { id: 3, name: "Node.js", icon: SiNodedotjs, color: "#339933", x: 50, y: 48, ecosystem: 2 },
  { id: 4, name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", x: 25, y: 78, ecosystem: 2 },
  { id: 8, name: "Axios", icon: SiAxios, color: "#5A29E4", x: 85, y: 45, ecosystem: 2 },
  { id: 10, name: "Zod", icon: SiZod, color: "#3068b7", x: 42, y: 65, ecosystem: 2 },
  { id: 11, name: "Jest", icon: SiJest, color: "#C21325", x: 68, y: 80, ecosystem: 2 },
  { id: 23, name: "Express", icon: SiExpress, color: "#ffffff", x: 55, y: 78, ecosystem: 2 },

  // Java (Ecosistema 3)
  { id: 24, name: "Java", icon: FaJava, color: "#007396", x: 20, y: 50, ecosystem: 3 },
  { id: 25, name: "Android", icon: FaAndroid, color: "#3DDC84", x: 50, y: 25, ecosystem: 3 },
  { id: 26, name: "Spring", icon: FaLeaf, color: "#6DB33F", x: 80, y: 70, ecosystem: 3 },

  // Python (Ecosistema 4)
  { id: 30, name: "Python", icon: SiPython, color: "#3776AB", x: 30, y: 40, ecosystem: 4 },
  { id: 33, name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", x: 70, y: 60, ecosystem: 4 },

  // Infraestructura (Ecosistema 5)
  { id: 17, name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", x: 18, y: 28, ecosystem: 5 },
  { id: 18, name: "MySQL", icon: SiMysql, color: "#4479A1", x: 45, y: 75, ecosystem: 5 },
  { id: 19, name: "MongoDB", icon: SiMongodb, color: "#47A248", x: 82, y: 35, ecosystem: 5 },
  { id: 9, name: "Prisma", icon: SiPrisma, color: "#2D3748", x: 50, y: 50, ecosystem: 5 },
  { id: 20, name: "Supabase", icon: SiSupabase, color: "#3ECF8E", x: 25, y: 65, ecosystem: 5 },
  { id: 22, name: "Docker", icon: SiDocker, color: "#2496ED", x: 60, y: 25, ecosystem: 5 },
];
