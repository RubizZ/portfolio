import { SkillName } from "./skills";

export interface Project {
  name: string;
  description: string;
  tech: SkillName[];
  url: string;
  liveUrl?: string;
}

export const projectsData: Project[] = [
  {
    name: "flAIghts",
    description:
      "Aplicación web (Trabajo de Fin de Grado) que calcula la ruta aérea óptima desde un origen a un destino usando algoritmos e IA.",
    tech: [
      "TypeScript",
      "Vite",
      "React",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "MongoDB",
      "Three.js",
      "React Query",
      "Axios",
      "i18next",
      "S3",
      "Express",
      "Mongoose",
      "OpenAI SDK",
      "Zod",
      "Ollama",
      "Docker",
    ],
    url: "https://github.com/RubizZ/flAIghts",
    liveUrl: "https://flaights.es",
  },
  {
    name: "CollabUp",
    description:
      "Aplicación de Android desarrollada en Java para la organización simultánea y colaborativa de eventos y tareas compartidas.",
    tech: ["Android", "Java"],
    url: "https://github.com/RubizZ/CollabUp",
  },
  {
    name: "VHUB",
    description:
      "Plataforma para organizar equipos competitivos con funciones de disponibilidad, estadísticas, leaderboards, chat en tiempo real y editor de estrategias.",
    tech: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "Docker",
      "CSS",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Zod",
      "S3",
      "Redis",
      "Axios",
      "HTML",
    ],
    url: "https://github.com/RubizZ/VHUB",
    liveUrl: "https://vhub-psi.vercel.app/",
  },
  {
    name: "Trendy",
    description:
      "Aplicación de escritorio sobre una tienda de ropa aplicando principios de Ingeniería del Software.",
    tech: ["Java", "MySQL"],
    url: "https://github.com/RubizZ/Trendy",
  },
  {
    name: "typed-express-pipeline",
    description:
      "Librería Node.js sin dependencias para facilitar el tipado estricto y el encadenamiento seguro de middlewares en Express.",
    tech: ["TypeScript", "Node.js", "Express", "JavaScript", "Jest"],
    url: "https://github.com/RubizZ/typed-express-pipeline",
  },
  {
    name: "ArenaOfMusic",
    description:
      "Juego web multijugador competitivo basado en la música, donde los jugadores adivinan canciones en tiempo limitado.",
    tech: ["HTML", "JavaScript", "Java", "Spring", "Thymeleaf", "CSS"],
    url: "https://github.com/RubizZ/ArenaOfMusic",
  },
];
