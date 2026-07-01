"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { skillsData, SkillNode } from "../data/skills";
import { activeEcosystems, Ecosystem } from "../data/ecosystems";
import { SCROLL } from "../utils/scrollController";

const generateConnections = (nodes: SkillNode[]) => {
  const connections: [number, number][] = [];
  if (nodes.length < 2) return connections;

  const connected = new Set<number>([0]);
  
  while (connected.size < nodes.length) {
    let minD = Infinity;
    let bestFrom = -1;
    let bestTo = -1;

    for (const from of connected) {
      for (let to = 0; to < nodes.length; to++) {
        if (!connected.has(to)) {
          const dx = (nodes[from].x || 0) - (nodes[to].x || 0);
          const dy = (nodes[from].y || 0) - (nodes[to].y || 0);
          const d = dx * dx + dy * dy;
          if (d < minD) {
            minD = d;
            bestFrom = from;
            bestTo = to;
          }
        }
      }
    }

    if (bestFrom !== -1 && bestTo !== -1) {
      connections.push([Math.min(bestFrom, bestTo), Math.max(bestFrom, bestTo)]);
      connected.add(bestTo);
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    let minD = Infinity;
    let nearest = -1;

    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = (nodes[i].x || 0) - (nodes[j].x || 0);
      const dy = (nodes[i].y || 0) - (nodes[j].y || 0);
      const d = dx * dx + dy * dy;
      if (d < minD) {
        minD = d;
        nearest = j;
      }
    }

    if (nearest !== -1) {
      const a = Math.min(i, nearest);
      const b = Math.max(i, nearest);
      if (!connections.some((c) => c[0] === a && c[1] === b)) {
        connections.push([a, b]);
      }
    }
  }

  return connections;
};

// Subcomponentes para manejar los hooks de manera dinámica

function SidebarMenuItem({ eco, index, scrollY }: { eco: Ecosystem; index: number; scrollY: MotionValue<number> }) {
  const start = SCROLL.getEcosystemStart(index);
  const end = SCROLL.getEcosystemEnd(index);
  const center = SCROLL.getEcosystemCenter(index);
  
  const opacity = useTransform(scrollY, [start, start + 200, end - 200, end], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollY, [start, start + 200, end - 200, end], [1, 1.2, 1.2, 1]);

  return (
    <motion.div
      className="ecosystem-menu-wrapper"
      style={{
        opacity,
        scale,
        transformOrigin: "left",
        cursor: "pointer",
      }}
      onClick={() => window.scrollTo({ top: center, behavior: "smooth" })}
    >
      <span
        className="ecosystem-menu-item"
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "var(--text-main)",
          letterSpacing: "2px",
        }}
      >
        {`0${index + 1}_ ${eco.name}`}
      </span>
    </motion.div>
  );
}

function EcosystemLayer({ eco, index, scrollY }: { eco: Ecosystem; index: number; scrollY: MotionValue<number> }) {
  const start = SCROLL.getEcosystemStart(index);
  const end = SCROLL.getEcosystemEnd(index);

  const opacity = useTransform(scrollY, [start, start + 200, end - 200, end], [0, 1, 1, 0]);
  const y = useTransform(scrollY, [start, start + 200], [40, 0]);
  const scale = useTransform(scrollY, [start, start + 200], [0.85, 1]);
  const lineOpacity = useTransform(scrollY, [start, start + 200, end - 200, end], [0, 0.4, 0.4, 0]);

  const nodes = skillsData.filter((s) => s.ecosystem === eco.id && !s.hidden);
  const connections = generateConnections(nodes);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
      <motion.svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: lineOpacity, y, scale }}>
        {connections.map((conn, idx) => {
          const n1 = nodes[conn[0]];
          const n2 = nodes[conn[1]];
          return (
            <line key={idx} x1={`${n1.x}%`} y1={`${n1.y}%`} x2={`${n2.x}%`} y2={`${n2.y}%`} stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 6" />
          );
        })}
      </motion.svg>

      <motion.div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity, y, scale }}>
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              className="tech-node"
              style={{
                position: "absolute",
                top: `${node.y}%`,
                left: `${node.x}%`,
                transform: "translate(-50%, -50%)",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 30px ${node.color}44`,
                color: node.color,
              }}
            >
              <Icon size={36} />
              <span
                style={{
                  position: "absolute",
                  top: "calc(100% + 0.8rem)",
                  whiteSpace: "nowrap",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "2px",
                  fontWeight: 300,
                }}
              >
                {node.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function NavigationArrow({ 
  index, 
  scrollY, 
  totalEcos 
}: { 
  index: number; 
  scrollY: MotionValue<number>;
  totalEcos: number;
}) {
  // El arrow `index` se activa durante el rango del ecosistema `index`.
  const start = SCROLL.getEcosystemStart(index);
  const end = SCROLL.getEcosystemEnd(index);

  const opacity = useTransform(scrollY, [start, start + 200, end - 200, end], [0, 1, 1, 0]);
  const pointerEvents = useTransform(
    scrollY, 
    [start - 1, start, end, end + 1], 
    ["none", "auto", "auto", "none"]
  ) as any;

  const isFirst = index === 0;
  const isLast = index === totalEcos - 1;

  const prevTitle = isFirst ? "Volver a Experiencia" : `Anterior: ${activeEcosystems[index - 1].shortName}`;
  const prevTarget = isFirst ? 800 : SCROLL.getEcosystemCenter(index - 1);

  const nextTitle = isLast ? "Proyectos" : `Siguiente: ${activeEcosystems[index + 1].shortName}`;
  const nextTarget = isLast ? SCROLL.getSkillsEnd() : SCROLL.getEcosystemCenter(index + 1);

  return (
    <>
      <motion.div
        onClick={() => window.scrollTo({ top: prevTarget, behavior: "smooth" })}
        className="global-nav-up"
        style={{
          position: "absolute",
          top: "8vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity,
          pointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronUp size={20} color="var(--text-muted)" />
        </motion.div>
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          {prevTitle}
        </span>
      </motion.div>

      <motion.div
        onClick={() => window.scrollTo({ top: nextTarget, behavior: "smooth" })}
        className="global-nav-down"
        style={{
          position: "absolute",
          bottom: "8vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity,
          pointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          {nextTitle}
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </>
  );
}

export default function TechNetwork() {
  const { scrollY } = useScroll();

  const totalEcos = activeEcosystems.length;
  const networkEnd = SCROLL.getTechNetworkEnd();

  const sidebarOpacity = useTransform(
    scrollY,
    [SCROLL.EXPERIENCE_END, SCROLL.EXPERIENCE_END + 200, networkEnd - 200, networkEnd],
    [0, 1, 1, 0],
  );
  const sidebarPointerEvents = useTransform(
    scrollY,
    [SCROLL.EXPERIENCE_END - 1, SCROLL.EXPERIENCE_END, networkEnd, networkEnd + 1],
    ["none", "auto", "auto", "none"],
  ) as any;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 15,
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        className="ecosystems-sidebar"
        style={{
          position: "absolute",
          left: "5vw",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          zIndex: 30,
          pointerEvents: sidebarPointerEvents,
          opacity: sidebarOpacity,
        }}
      >
        {activeEcosystems.map((eco, i) => (
          <SidebarMenuItem key={eco.id} eco={eco} index={i} scrollY={scrollY} />
        ))}
      </motion.div>

      {activeEcosystems.map((eco, i) => (
        <EcosystemLayer key={eco.id} eco={eco} index={i} scrollY={scrollY} />
      ))}

      {activeEcosystems.map((eco, i) => (
        <NavigationArrow key={`nav-${eco.id}`} index={i} totalEcos={totalEcos} scrollY={scrollY} />
      ))}
    </div>
  );
}
