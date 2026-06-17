"use client";
import { useRef, useState, useEffect } from "react";
import {
  FaGithub,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { projectsData, Project } from "../data/projects";
import { skillsData, SkillName } from "../data/skills";

const projectLayouts: any[] = [
  {
    text: { top: "35%", left: "10%" },
    img: { bottom: "10%", right: "10%" },
    textInitial: { x: -300, y: 0, scale: 1 },
    imgInitial: { x: 300, y: 0, scale: 1 },
  },
  {
    text: { bottom: "15%", right: "10%", textAlign: "right" },
    img: { top: "35%", left: "10%" },
    textInitial: { x: 300, y: 0, scale: 1 },
    imgInitial: { x: -300, y: 0, scale: 1 },
  },
  {
    text: { top: "45%", right: "10%", textAlign: "right" },
    img: { bottom: "15%", left: "10%" },
    textInitial: { x: 0, y: -300, scale: 1 },
    imgInitial: { x: 0, y: 300, scale: 1 },
  },
  {
    text: { bottom: "20%", left: "15%" },
    img: { top: "35%", right: "15%" },
    textInitial: { x: 0, y: 0, scale: 0.5 },
    imgInitial: { x: 0, y: 0, scale: 1.5 },
  },
  {
    text: { top: "50%", left: "8%", transform: "translateY(-50%)" },
    img: { top: "50%", right: "8%", transform: "translateY(-50%)" },
    textInitial: { x: -300, y: 0, scale: 1 },
    imgInitial: { x: 300, y: 0, scale: 1 },
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
  },
];

// Generador pseudoaleatorio determinista para las posiciones de las tecnologías
function getPseudoRandom(seedStr: string) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (Math.imul(31, hash) + seedStr.charCodeAt(i)) | 0;
  }
  return () => {
    hash = Math.imul(hash ^ (hash >>> 15), 2246822519);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489917);
    hash = hash ^ (hash >>> 16);
    return (hash >>> 0) / 4294967296;
  };
}

function ProjectItem({
  project,
  index,
  layout,
  isLast,
  nextProjectName,
  prevProjectName,
}: {
  project: Project;
  index: number;
  layout: any;
  isLast: boolean;
  nextProjectName?: string;
  prevProjectName?: string;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [techPositions, setTechPositions] = useState<
    { left: string; top: string }[]
  >([]);

  useEffect(() => {
    const calculatePositions = () => {
      if (!textRef.current || !imgRef.current || !containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Use offset to ignore framer-motion transforms
      const tR = {
        left: textRef.current.offsetLeft,
        right: textRef.current.offsetLeft + textRef.current.offsetWidth,
        top: textRef.current.offsetTop,
        bottom: textRef.current.offsetTop + textRef.current.offsetHeight,
      };

      const iR = {
        left: imgRef.current.offsetLeft,
        right: imgRef.current.offsetLeft + imgRef.current.offsetWidth,
        top: imgRef.current.offsetTop,
        bottom: imgRef.current.offsetTop + imgRef.current.offsetHeight,
      };

      const safePositions: { left: string; top: string }[] = [];
      const MAX_ATTEMPTS = 500;
      const prng = getPseudoRandom(project.name);

      for (let i = 0; i < project.tech.length; i++) {
        let safe = false;
        let attempts = 0;
        let x = 0;
        let y = 0;

        while (!safe && attempts < MAX_ATTEMPTS) {
          const px = 5 + prng() * 90; // 5% to 95%
          const py = 5 + prng() * 90;

          x = (px / 100) * width;
          y = (py / 100) * height;

          // Extra conservative tech item bounding box
          const tw = 200;
          const th = 70;
          const techRect = {
            left: x - tw / 2,
            right: x + tw / 2,
            top: y - th / 2,
            bottom: y + th / 2,
          };

          // Padding to give text and images breathing room
          const pad = 40;
          const textR = {
            left: tR.left - pad,
            right: tR.right + pad,
            top: tR.top - pad,
            bottom: tR.bottom + pad,
          };
          const imgR = {
            left: iR.left - pad,
            right: iR.right + pad,
            top: iR.top - pad,
            bottom: iR.bottom + pad,
          };

          // Global UI elements to avoid
          const dockR = { left: 0, right: width, top: 0, bottom: 130 }; // Dock + padding
          const arrowR = {
            left: width / 2 - 120,
            right: width / 2 + 120,
            top: height - 120,
            bottom: height,
          }; // Next Arrow
          const prevArrowR = {
            left: width / 2 - 120,
            right: width / 2 + 120,
            top: height * 0.15,
            bottom: height * 0.25,
          }; // Prev Arrow

          const intersectsText = !(
            techRect.right < textR.left ||
            techRect.left > textR.right ||
            techRect.bottom < textR.top ||
            techRect.top > textR.bottom
          );
          const intersectsImg = !(
            techRect.right < imgR.left ||
            techRect.left > imgR.right ||
            techRect.bottom < imgR.top ||
            techRect.top > imgR.bottom
          );
          const intersectsDock = !(
            techRect.right < dockR.left ||
            techRect.left > dockR.right ||
            techRect.bottom < dockR.top ||
            techRect.top > dockR.bottom
          );
          const intersectsArrow =
            nextProjectName &&
            !(
              techRect.right < arrowR.left ||
              techRect.left > arrowR.right ||
              techRect.bottom < arrowR.top ||
              techRect.top > arrowR.bottom
            );
          const intersectsPrevArrow =
            prevProjectName &&
            !(
              techRect.right < prevArrowR.left ||
              techRect.left > prevArrowR.right ||
              techRect.bottom < prevArrowR.top ||
              techRect.top > prevArrowR.bottom
            );

          let intersectsOther = false;
          for (const pos of safePositions) {
            const ox = (parseFloat(pos.left) / 100) * width;
            const oy = (parseFloat(pos.top) / 100) * height;
            const otherRect = {
              left: ox - tw / 2,
              right: ox + tw / 2,
              top: oy - th / 2,
              bottom: oy + th / 2,
            };
            if (
              !(
                techRect.right < otherRect.left ||
                techRect.left > otherRect.right ||
                techRect.bottom < otherRect.top ||
                techRect.top > otherRect.bottom
              )
            ) {
              intersectsOther = true;
              break;
            }
          }

          if (
            !intersectsText &&
            !intersectsImg &&
            !intersectsDock &&
            !intersectsArrow &&
            !intersectsPrevArrow &&
            !intersectsOther
          )
            safe = true;
          attempts++;
        }

        safePositions.push({
          left: `${(x / width) * 100}%`,
          top: `${(y / height) * 100}%`,
        });
      }

      setTechPositions(safePositions);
    };

    // Calculate after a brief delay to ensure DOM is fully painted (images, fonts, layout complete)
    const timeout = setTimeout(calculatePositions, 100);
    window.addEventListener("resize", calculatePositions);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", calculatePositions);
    };
  }, [
    project.tech.length,
    project.name,
    isLast,
    nextProjectName,
    prevProjectName,
  ]);
  const { scrollY } = useScroll();

  // Define scroll ranges for scrubbing
  const startEnter = 4400 + index * 1600;
  const endEnter = startEnter + 650; // Syncs perfectly with 4400->5050 dockY animation for the first item
  const startExit = endEnter + 600;
  const endExit = startExit + 500;

  const transformInput = isLast
    ? [startEnter, endEnter]
    : [startEnter, endEnter, startExit, endExit];

  const pointerEventsInput = isLast
    ? [startEnter - 1, startEnter]
    : [startEnter - 1, startEnter, endExit, endExit + 1];

  // Overall opacity and pointer events
  const opacity = useTransform(
    scrollY,
    transformInput,
    isLast ? [0, 1] : [0, 1, 1, 0],
  );
  const pointerEvents = useTransform(
    scrollY,
    pointerEventsInput,
    isLast ? ["none", "auto"] : ["none", "auto", "auto", "none"],
  ) as any;

  // Text transitions mapped to scroll
  const textX = useTransform(
    scrollY,
    transformInput,
    isLast
      ? [layout.textInitial.x, 0]
      : [layout.textInitial.x, 0, 0, layout.textInitial.x * -1],
  );
  const textY = useTransform(
    scrollY,
    transformInput,
    isLast
      ? [layout.textInitial.y, 0]
      : [layout.textInitial.y, 0, 0, layout.textInitial.y * -1],
  );
  const textScale = useTransform(
    scrollY,
    transformInput,
    isLast
      ? [layout.textInitial.scale, 1]
      : [layout.textInitial.scale, 1, 1, layout.textInitial.scale],
  );

  // Image transitions mapped to scroll
  const imgX = useTransform(
    scrollY,
    transformInput,
    isLast
      ? [layout.imgInitial.x, 0]
      : [layout.imgInitial.x, 0, 0, layout.imgInitial.x * -1],
  );
  const imgY = useTransform(
    scrollY,
    transformInput,
    isLast
      ? [layout.imgInitial.y, 0]
      : [layout.imgInitial.y, 0, 0, layout.imgInitial.y * -1],
  );
  const imgScale = useTransform(
    scrollY,
    transformInput,
    isLast
      ? [layout.imgInitial.scale, 1]
      : [layout.imgInitial.scale, 1, 1, layout.imgInitial.scale],
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        opacity,
        pointerEvents: "none",
        zIndex: 30 + index,
        overflow: "hidden",
      }}
    >
      {/* Flying Technologies */}
      {techPositions.length > 0 &&
        project.tech.map((techName: string, i: number) => {
          const pos = techPositions[i];
          if (!pos) return null;
          const skill = skillsData.find((s) => s.name === techName);
          const Icon = skill?.icon;

          return (
            <motion.span
              key={techName}
              className="flying-tech"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
                color: "rgba(255,255,255,0.14)",
                pointerEvents: "none",
                zIndex: 0,
                animationDelay: `-${i * 0.8}s`,
              }}
            >
              {Icon && <Icon size={24} style={{ opacity: 0.5 }} />}
              {techName}
            </motion.span>
          );
        })}

      {/* Texts */}
      <motion.div
        ref={textRef}
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
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {project.liveUrl && (
                <div className="github-btn-wrapper">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                    aria-label="Visitar sitio web"
                  >
                    <FaExternalLinkAlt size={36} />
                  </a>
                  <div className="github-tag top">
                    <svg
                      width="40"
                      height="30"
                      viewBox="0 0 40 30"
                      style={{
                        overflow: "visible",
                        flexShrink: 0,
                        transform: "rotate(-90deg)",
                      }}
                    >
                      <defs>
                        <mask id={`mask-${index}-svg`}>
                          <rect
                            x="-20"
                            y="-30"
                            width="80"
                            height="80"
                            fill="white"
                          />
                          <circle cx="0" cy="0" r="14" fill="black" />
                        </mask>
                      </defs>
                      <path
                        d="M 0,-10 C 20,-20 30,20 20,25 C 10,30 10,10 20,10 C 30,10 30,20 40,20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        mask={`url(#mask-${index}-svg)`}
                      />
                    </svg>
                    <span className="github-tag-text">VER WEB</span>
                  </div>
                </div>
              )}
              <div className="github-btn-wrapper">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                  aria-label="Ver en GitHub"
                >
                  <FaGithub size={42} />
                </a>
                <div className="github-tag left">
                  <svg
                    width="40"
                    height="30"
                    viewBox="0 0 40 30"
                    style={{
                      overflow: "visible",
                      flexShrink: 0,
                      transform: "scaleX(-1)",
                    }}
                  >
                    <defs>
                      <mask id={`mask-${index}-svg`}>
                        <rect
                          x="-20"
                          y="-30"
                          width="80"
                          height="80"
                          fill="white"
                        />
                        <circle cx="0" cy="0" r="14" fill="black" />
                      </mask>
                    </defs>
                    <path
                      d="M 0,-10 C 20,-20 30,20 20,25 C 10,30 10,10 20,10 C 30,10 30,20 40,20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      mask={`url(#mask-${index}-svg)`}
                    />
                  </svg>
                  <span className="github-tag-text">VER EN GITHUB</span>
                </div>
              </div>
            </div>
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
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <div className="github-btn-wrapper">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                  aria-label="Ver en GitHub"
                >
                  <FaGithub size={42} />
                </a>
                <div className="github-tag right">
                  <svg
                    width="40"
                    height="30"
                    viewBox="0 0 40 30"
                    style={{ overflow: "visible", flexShrink: 0 }}
                  >
                    <defs>
                      <mask id={`mask-${index}-svg`}>
                        <rect
                          x="-20"
                          y="-30"
                          width="80"
                          height="80"
                          fill="white"
                        />
                        <circle cx="0" cy="0" r="14" fill="black" />
                      </mask>
                    </defs>
                    <path
                      d="M 0,-10 C 20,-20 30,20 20,25 C 10,30 10,10 20,10 C 30,10 30,20 40,20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      mask={`url(#mask-${index}-svg)`}
                    />
                  </svg>
                  <span className="github-tag-text">VER EN GITHUB</span>
                </div>
              </div>
              {project.liveUrl && (
                <div className="github-btn-wrapper">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                    aria-label="Visitar sitio web"
                  >
                    <FaExternalLinkAlt size={36} />
                  </a>
                  <div className="github-tag top">
                    <svg
                      width="40"
                      height="30"
                      viewBox="0 0 40 30"
                      style={{
                        overflow: "visible",
                        flexShrink: 0,
                        transform: "rotate(-90deg)",
                      }}
                    >
                      <defs>
                        <mask id={`mask-${index}-svg`}>
                          <rect
                            x="-20"
                            y="-30"
                            width="80"
                            height="80"
                            fill="white"
                          />
                          <circle cx="0" cy="0" r="14" fill="black" />
                        </mask>
                      </defs>
                      <path
                        d="M 0,-10 C 20,-20 30,20 20,25 C 10,30 10,10 20,10 C 30,10 30,20 40,20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        mask={`url(#mask-${index}-svg)`}
                      />
                    </svg>
                    <span className="github-tag-text">VER WEB</span>
                  </div>
                </div>
              )}
            </div>
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
        ref={imgRef}
        className="screenshot-placeholder"
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

      {/* Arrow to Previous Project */}
      {prevProjectName && (
        <motion.div
          onClick={() =>
            window.scrollTo({ top: endEnter - 1600, behavior: "smooth" })
          }
          style={{
            position: "absolute",
            top: "17vh",
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
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaChevronUp size={20} color="var(--text-muted)" />
          </motion.div>
          <span
            style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Anterior: {prevProjectName}
          </span>
        </motion.div>
      )}

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
  selectedTech: SkillName;
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
            prevProjectName={
              index > 0 ? filteredProjects[index - 1].name : undefined
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
          color: rgba(255,255,255,0.4); 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          position: relative;
          z-index: 2;
        }
        .github-btn-wrapper:hover .github-link {
          color: #fff; 
          transform: scale(1.15) rotate(5deg);
        }
        .github-btn-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .github-tag {
          position: absolute;
          top: 70%;
          display: flex;
          align-items: flex-start;
          pointer-events: none;
          color: rgba(255,255,255,0.3);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          opacity: 0;
        }
        .github-btn-wrapper:hover .github-tag {
          color: rgba(255,255,255,0.9);
          transform: translateY(4px);
          opacity: 1;
        }
        .github-btn-wrapper:hover .github-tag.top {
          transform: translateX(-50%) translateY(-4px);
        }
        .github-tag.top {
          top: auto;
          bottom: 70%;
          left: 50%;
          flex-direction: column-reverse;
          align-items: center;
          margin-top: 0;
          margin-bottom: 10px;
          transform: translateX(-50%);
        }
        .github-tag.top .github-tag-text {
          margin-top: 0;
          margin-bottom: 10px;
          transform: rotate(-4deg);
        }
        .github-tag.left {
          right: 70%;
          flex-direction: row-reverse;
          margin-top: 10px;
        }
        .github-tag.right {
          left: 70%;
          flex-direction: row;
          margin-top: 10px;
        }
        .github-tag-text {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          white-space: nowrap;
          border: 1px dashed currentColor;
          padding: 0.3rem 0.5rem;
          border-radius: 4px;
          transform: rotate(-4deg);
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          margin-top: 10px;
        }
        .github-tag.left .github-tag-text {
          transform: rotate(4deg);
        }
        .screenshot-placeholder:hover {
          border-color: rgba(255,255,255,0.3);
        }
        .flying-tech {
          animation: floatAnimation 8s ease-in-out infinite;
        }
        @keyframes floatAnimation {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-8px) rotate(2deg) scale(1.03); }
          66% { transform: translateY(6px) rotate(-2deg) scale(0.97); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
      `}</style>
    </section>
  );
}
