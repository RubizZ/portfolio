import { SkillName } from "./skills";

export interface Project {
  name: string;
  tech: SkillName[];
  url: string;
  liveUrl?: string;
}

export const projectsData: Project[] = [
  {
    name: "flAIghts",
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
    name: "VHUB",
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
    name: "ArenaOfMusic",
    tech: ["HTML", "JavaScript", "Java", "Spring", "Thymeleaf", "CSS"],
    url: "https://github.com/RubizZ/ArenaOfMusic",
  },
  {
    name: "CollabUp",
    tech: ["Android", "Java"],
    url: "https://github.com/RubizZ/CollabUp",
  },
  {
    name: "typed-express-pipeline",
    tech: ["TypeScript", "Node.js", "Express", "JavaScript", "Jest"],
    url: "https://github.com/RubizZ/typed-express-pipeline",
  },
  {
    name: "Trendy",
    tech: ["Java", "MySQL"],
    url: "https://github.com/RubizZ/Trendy",
  },
];
