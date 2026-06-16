import {
  FaGithub,
  FaCode,
  FaJava,
  FaLeaf,
  FaChevronDown,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiAndroid,
  SiHtml5,
  SiExpress,
  SiPython,
  SiDjango,
  SiFlask,
  SiTensorflow,
} from "react-icons/si";
import { motion, useScroll, useTransform } from "framer-motion";

const techIcons: Record<string, any> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  HTML: SiHtml5,
  Java: FaJava,
  Android: SiAndroid,
  Spring: FaLeaf,
  "C++": SiCplusplus,
  Qt: SiCplusplus,
  Unreal: SiCplusplus,
  Python: SiPython,
  Django: SiDjango,
  Flask: SiFlask,
  TensorFlow: SiTensorflow,
};

const projectsData = [
  {
    name: "flAIghts",
    description:
      "Aplicación web que calcula la ruta aérea óptima desde un origen a un destino.",
    tech: ["TypeScript", "Next.js", "React"],
    url: "https://github.com/RubizZ/flAIghts",
  },
  {
    name: "CollabUp",
    description:
      "Aplicación de Android para organizar eventos y tareas compartidas con amigos o familia.",
    tech: ["Android", "Java"],
    url: "https://github.com/RubizZ/CollabUp",
  },
  {
    name: "VHUB",
    description:
      "Plataforma enfocada en gestión y organización, demostrando habilidades de integración de sistemas.",
    tech: ["TypeScript", "Node.js"],
    url: "https://github.com/RubizZ/VHUB",
  },
  {
    name: "Trendy",
    description:
      "Aplicación de escritorio sobre una tienda de ropa aplicando ingeniería del software.",
    tech: ["Java"],
    url: "https://github.com/RubizZ/Trendy",
  },
  {
    name: "typed-express-pipeline",
    description:
      "Librería Node.js para facilitar el tipado y encadenamiento de middleware en Express.",
    tech: ["TypeScript", "Node.js", "Express"],
    url: "https://github.com/RubizZ/typed-express-pipeline",
  },
  {
    name: "ArenaOfMusic",
    description:
      "Aplicación web multijugador sobre adivinar canciones escuchando un tiempo limitado.",
    tech: ["HTML", "JavaScript"],
    url: "https://github.com/RubizZ/ArenaOfMusic",
  },
];

const projectLayouts: any[] = [
  {
    text: { top: "35%", left: "10%" },
    img: { bottom: "10%", right: "10%" },
    textInitial: { x: -300, y: 0, scale: 1 },
    imgInitial: { x: 300, y: 0, scale: 1 },
    techSpots: [
      { bottom: "15%", left: "15%" },
      { top: "40%", right: "15%" },
      { bottom: "20%", left: "45%" },
      { top: "35%", left: "55%" },
      { top: "60%", right: "10%" },
      { bottom: "30%", left: "10%" },
    ],
  },
  {
    text: { bottom: "15%", right: "10%", textAlign: "right" },
    img: { top: "35%", left: "10%" },
    textInitial: { x: 300, y: 0, scale: 1 },
    imgInitial: { x: -300, y: 0, scale: 1 },
    techSpots: [
      { bottom: "15%", left: "15%" },
      { top: "35%", right: "15%" },
      { bottom: "15%", right: "50%" },
      { top: "35%", left: "55%" },
      { top: "55%", right: "10%" },
      { top: "65%", left: "10%" },
    ],
  },
  {
    text: { top: "45%", right: "10%", textAlign: "right" },
    img: { bottom: "15%", left: "10%" },
    textInitial: { x: 0, y: -300, scale: 1 },
    imgInitial: { x: 0, y: 300, scale: 1 },
    techSpots: [
      { top: "35%", left: "15%" },
      { bottom: "15%", right: "15%" },
      { top: "45%", left: "10%" },
      { bottom: "15%", left: "55%" },
      { top: "35%", right: "50%" },
      { bottom: "35%", left: "5%" },
    ],
  },
  {
    text: { bottom: "20%", left: "15%" },
    img: { top: "35%", right: "15%" },
    textInitial: { x: 0, y: 0, scale: 0.5 },
    imgInitial: { x: 0, y: 0, scale: 1.5 },
    techSpots: [
      { top: "35%", left: "15%" },
      { bottom: "15%", right: "15%" },
      { top: "35%", left: "45%" },
      { bottom: "20%", right: "45%" },
      { top: "55%", left: "10%" },
      { top: "65%", right: "10%" },
    ],
  },
  {
    text: { top: "50%", left: "8%", transform: "translateY(-50%)" },
    img: { top: "50%", right: "8%", transform: "translateY(-50%)" },
    textInitial: { x: -300, y: 0, scale: 1 },
    imgInitial: { x: 300, y: 0, scale: 1 },
    techSpots: [
      { top: "35%", left: "45%" },
      { bottom: "15%", left: "45%" },
      { bottom: "10%", left: "15%" },
      { bottom: "10%", right: "15%" },
      { top: "35%", left: "15%" },
      { top: "35%", right: "15%" },
    ],
  },
  {
    text: {
      top: "35%",
      left: "50%",
      transform: "translateX(-50%)",
      textAlign: "center",
    },
    img: { bottom: "10%", left: "50%", transform: "translateX(-50%)" },
    textInitial: { x: 0, y: -200, scale: 1 },
    imgInitial: { x: 0, y: 200, scale: 1 },
    techSpots: [
      { top: "50%", left: "15%" },
      { top: "50%", right: "15%" },
      { bottom: "15%", left: "15%" },
      { bottom: "15%", right: "15%" },
      { top: "35%", left: "15%" },
      { top: "35%", right: "15%" },
    ],
  },
];

function ProjectItem({
  project,
  index,
  layout,
  isLast,
  nextProjectName,
}: {
  project: any;
  index: number;
  layout: any;
  isLast: boolean;
  nextProjectName?: string;
}) {
  const { scrollY } = useScroll();

  // Define scroll ranges for scrubbing
  const startEnter = 3600 + index * 1600;
  const endEnter = startEnter + 650; // Syncs perfectly with 3600->4250 dockY animation for the first item
  const startExit = endEnter + 600;
  const endExit = startExit + 500;

  // Overall opacity and pointer events
  const opacity = isLast
    ? useTransform(scrollY, [startEnter, endEnter], [0, 1])
    : useTransform(
        scrollY,
        [startEnter, endEnter, startExit, endExit],
        [0, 1, 1, 0],
      );
  const pointerEvents = isLast
    ? (useTransform(scrollY, [startEnter - 1, startEnter], ["none", "auto"]) as any)
    : (useTransform(
        scrollY,
        [startEnter - 1, startEnter, endExit, endExit + 1],
        ["none", "auto", "auto", "none"]
      ) as any);

  // Text transitions mapped to scroll
  const textX = isLast
    ? useTransform(scrollY, [startEnter, endEnter], [layout.textInitial.x, 0])
    : useTransform(
        scrollY,
        [startEnter, endEnter, startExit, endExit],
        [layout.textInitial.x, 0, 0, layout.textInitial.x * -1],
      );
  const textY = isLast
    ? useTransform(scrollY, [startEnter, endEnter], [layout.textInitial.y, 0])
    : useTransform(
        scrollY,
        [startEnter, endEnter, startExit, endExit],
        [layout.textInitial.y, 0, 0, layout.textInitial.y * -1],
      );
  const textScale = isLast
    ? useTransform(
        scrollY,
        [startEnter, endEnter],
        [layout.textInitial.scale, 1],
      )
    : useTransform(
        scrollY,
        [startEnter, endEnter, startExit, endExit],
        [layout.textInitial.scale, 1, 1, layout.textInitial.scale],
      );

  // Image transitions mapped to scroll
  const imgX = isLast
    ? useTransform(scrollY, [startEnter, endEnter], [layout.imgInitial.x, 0])
    : useTransform(
        scrollY,
        [startEnter, endEnter, startExit, endExit],
        [layout.imgInitial.x, 0, 0, layout.imgInitial.x * -1],
      );
  const imgY = isLast
    ? useTransform(scrollY, [startEnter, endEnter], [layout.imgInitial.y, 0])
    : useTransform(
        scrollY,
        [startEnter, endEnter, startExit, endExit],
        [layout.imgInitial.y, 0, 0, layout.imgInitial.y * -1],
      );
  const imgScale = isLast
    ? useTransform(
        scrollY,
        [startEnter, endEnter],
        [layout.imgInitial.scale, 1],
      )
    : useTransform(
        scrollY,
        [startEnter, endEnter, startExit, endExit],
        [layout.imgInitial.scale, 1, 1, layout.imgInitial.scale],
      );

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        opacity,
        pointerEvents: "none", // NEVER block the whole screen
        zIndex: 30 + index,
        overflow: "hidden",
      }}
    >
      {/* Flying Technologies */}
      {project.tech.map((t: string, i: number) => {
        // Use safe spots assigned to this specific layout to avoid text/image overlap
        const pos = layout.techSpots[i % layout.techSpots.length];
        const Icon = techIcons[t];
        return (
          <span
            key={t}
            className="flying-tech"
            style={{
              ...pos,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "1.1rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.2)",
              animationDelay: `${(i + index) * 0.8}s`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            {Icon && <Icon size={24} style={{ opacity: 0.7 }} />}
            {t}
          </span>
        );
      })}

      {/* Texts */}
      <motion.div
        style={{
          position: "absolute",
          ...layout.text,
          x: textX,
          y: textY,
          scale: textScale,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "90%",
          maxWidth: "600px",
          zIndex: 20,
          pointerEvents, // Only this container receives clicks when active
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            justifyContent:
              layout.text.textAlign === "right"
                ? "flex-end"
                : layout.text.textAlign === "center"
                  ? "flex-start"
                  : "flex-start",
          }}
        >
          {layout.text.textAlign === "right" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <FaGithub size={42} />
            </a>
          )}
          <h3
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 200,
              letterSpacing: "-2px",
              color: "#fff",
              margin: 0,
              lineHeight: 1,
              wordBreak: "break-word",
            }}
          >
            {project.name}
          </h3>
          {layout.text.textAlign !== "right" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <FaGithub size={42} />
            </a>
          )}
        </div>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.5rem",
            lineHeight: "1.6",
            fontWeight: 300,
            margin: 0,
          }}
        >
          {project.description}
        </p>
      </motion.div>

      {/* Screenshot Placeholder */}
      <motion.div
        style={{
          position: "absolute",
          ...layout.img,
          x: imgX,
          y: imgY,
          scale: imgScale,
          width: layout.img.width || "45vw",
          minWidth: "300px",
          maxWidth: "800px",
          aspectRatio: "16/9",
          backgroundColor: "rgba(255,255,255,0.02)",
          border: "2px dashed rgba(255,255,255,0.1)",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          transition: "border-color 0.5s ease",
          zIndex: 10,
          pointerEvents, // Only this container receives clicks when active
        }}
        className="screenshot-placeholder"
      >
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "1.2rem",
            fontWeight: 300,
            letterSpacing: "1px",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          [ Captura de {project.name} ]
        </span>
      </motion.div>

      {/* Arrow to Next Project */}
      {nextProjectName && (
        <motion.div
          onClick={() =>
            window.scrollTo({ top: endEnter + 1600, behavior: "smooth" })
          }
          style={{
            position: "absolute",
            bottom: "8vh",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            zIndex: 50,
            pointerEvents,
          }}
        >
          <span
            style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Siguiente: {nextProjectName}
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaChevronDown size={20} color="var(--text-muted)" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface ProjectsProps {
  selectedTech: string;
}

export default function Projects({ selectedTech }: ProjectsProps) {
  let filteredProjects = projectsData;

  if (selectedTech !== "Todas") {
    filteredProjects = filteredProjects.filter((p) =>
      p.tech.includes(selectedTech),
    );
  }

  return (
    <section
      id="projects"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      {filteredProjects.map((project, index) => {
        const layout = projectLayouts[index % projectLayouts.length];
        return (
          <ProjectItem
            key={project.name}
            project={project}
            index={index}
            layout={layout}
            isLast={index === filteredProjects.length - 1}
            nextProjectName={
              index < filteredProjects.length - 1
                ? filteredProjects[index + 1].name
                : undefined
            }
          />
        );
      })}

      {filteredProjects.length === 0 && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "1.5rem",
              zIndex: 40,
            }}
          >
            Aún no hay proyectos públicos con esta tecnología.
          </p>
        </div>
      )}

      <style>{`
        .github-link {
          color: rgba(255,255,255,0.3); 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .github-link:hover {
          color: #fff; 
          transform: scale(1.15) rotate(5deg);
        }
        .screenshot-placeholder:hover {
          border-color: rgba(255,255,255,0.3);
        }
        .flying-tech {
          animation: floatAnimation 8s ease-in-out infinite;
        }
        @keyframes floatAnimation {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-20px) rotate(5deg) scale(1.1); }
          66% { transform: translateY(15px) rotate(-5deg) scale(0.9); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
      `}</style>
    </section>
  );
}
