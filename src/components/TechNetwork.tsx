"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { skillsData, SkillNode } from "../data/skills";

const generateConnections = (nodes: SkillNode[]) => {
  const connections: [number, number][] = [];
  if (nodes.length < 2) return connections;

  // 1. Árbol de Expansión Mínima (MST) para garantizar una única componente conexa
  const connected = new Set<number>([0]);
  
  while (connected.size < nodes.length) {
    let minD = Infinity;
    let bestFrom = -1;
    let bestTo = -1;

    // Buscar la arista más corta entre un nodo conectado y uno no conectado
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

  // 2. Añadir conexiones extra para darle aspecto de red o telaraña (no solo un árbol)
  for (let i = 0; i < nodes.length; i++) {
    let minD = Infinity;
    let nearest = -1;

    // Buscar el vecino más cercano a cada nodo
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
      // Añadir la arista si no estaba ya en el MST
      if (!connections.some((c) => c[0] === a && c[1] === b)) {
        connections.push([a, b]);
      }
    }
  }

  return connections;
};

export default function TechNetwork() {
  const { scrollY } = useScroll();

  // Flechas TechNetwork
  const arrow1Opacity = useTransform(scrollY, [400, 600, 1000, 1200], [0, 1, 1, 0]);
  const arrow1PointerEvents = useTransform(scrollY, [399, 400, 1200, 1201], ["none", "auto", "auto", "none"]) as any;

  const arrow2Opacity = useTransform(scrollY, [1200, 1400, 1800, 2000], [0, 1, 1, 0]);
  const arrow2PointerEvents = useTransform(scrollY, [1199, 1200, 2000, 2001], ["none", "auto", "auto", "none"]) as any;

  const arrow3Opacity = useTransform(scrollY, [2000, 2200, 2600, 2800], [0, 1, 1, 0]);
  const arrow3PointerEvents = useTransform(scrollY, [1999, 2000, 2800, 2801], ["none", "auto", "auto", "none"]) as any;

  const arrow4Opacity = useTransform(scrollY, [2800, 3000, 3400, 3600], [0, 1, 1, 0]);
  const arrow5Opacity = useTransform(scrollY, [3600, 3800, 4200, 4400], [0, 1, 1, 0]);
  const arrow4PointerEvents = useTransform(scrollY, [2799, 2800, 3600, 3601], ["none", "auto", "auto", "none"]) as any;
  const arrow5PointerEvents = useTransform(scrollY, [3599, 3600, 4400, 4401], ["none", "auto", "auto", "none"]) as any;

  // Master Sidebar Opacity
  const sidebarOpacity = useTransform(
    scrollY,
    [400, 600, 4200, 4400],
    [0, 1, 1, 0],
  );
  const sidebarPointerEvents = useTransform(
    scrollY,
    [399, 400, 4200, 4201],
    ["none", "auto", "auto", "none"],
  ) as any;

  // Transformaciones para el Menú Lateral
  const menuOpacity1 = useTransform(
    scrollY,
    [400, 600, 1000, 1200],
    [0.3, 1, 1, 0.3],
  );
  const menuOpacity2 = useTransform(
    scrollY,
    [1200, 1400, 1800, 2000],
    [0.3, 1, 1, 0.3],
  );
  const menuOpacity3 = useTransform(
    scrollY,
    [2000, 2200, 2600, 2800],
    [0.3, 1, 1, 0.3],
  );
  const menuOpacity4 = useTransform(
    scrollY,
    [2800, 3000, 3400, 3600],
    [0.3, 1, 1, 0.3],
  );
  const menuOpacity5 = useTransform(
    scrollY,
    [3600, 3800, 4200, 4400],
    [0.3, 1, 1, 0.3],
  );

  const menuScale1 = useTransform(
    scrollY,
    [400, 600, 1000, 1200],
    [1, 1.2, 1.2, 1],
  );
  const menuScale2 = useTransform(
    scrollY,
    [1200, 1400, 1800, 2000],
    [1, 1.2, 1.2, 1],
  );
  const menuScale3 = useTransform(
    scrollY,
    [2000, 2200, 2600, 2800],
    [1, 1.2, 1.2, 1],
  );
  const menuScale4 = useTransform(
    scrollY,
    [2800, 3000, 3400, 3600],
    [1, 1.2, 1.2, 1],
  );
  const menuScale5 = useTransform(
    scrollY,
    [3600, 3800, 4200, 4400],
    [1, 1.2, 1.2, 1],
  );

  // Ecosistema 1: JS/TS (400 - 1200)
  const o1 = useTransform(scrollY, [400, 600, 1000, 1200], [0, 1, 1, 0]);
  const y1 = useTransform(scrollY, [400, 600], [40, 0]);
  const s1 = useTransform(scrollY, [400, 600], [0.85, 1]);
  const l1 = useTransform(scrollY, [400, 600, 1000, 1200], [0, 0.4, 0.4, 0]);

  const nodes1 = skillsData.filter((s) => s.ecosystem === 1);
  const conn1 = generateConnections(nodes1);

  // Ecosistema 2: Java (1200 - 2000)
  const o2 = useTransform(scrollY, [1200, 1400, 1800, 2000], [0, 1, 1, 0]);
  const y2 = useTransform(scrollY, [1200, 1400], [40, 0]);
  const s2 = useTransform(scrollY, [1200, 1400], [0.85, 1]);
  const l2 = useTransform(scrollY, [1200, 1400, 1800, 2000], [0, 0.4, 0.4, 0]);

  const nodes2 = skillsData.filter((s) => s.ecosystem === 2);
  const conn2 = generateConnections(nodes2);

  // Ecosistema 3: C++ (2000 - 2800)
  const o3 = useTransform(scrollY, [2000, 2200, 2600, 2800], [0, 1, 1, 0]);
  const y3 = useTransform(scrollY, [2000, 2200], [40, 0]);
  const s3 = useTransform(scrollY, [2000, 2200], [0.85, 1]);
  const l3 = useTransform(scrollY, [2000, 2200, 2600, 2800], [0, 0.4, 0.4, 0]);

  const nodes3 = skillsData.filter((s) => s.ecosystem === 3);
  const conn3 = generateConnections(nodes3);

  // Ecosistema 4: Python (2800 - 3600)
  const o4 = useTransform(scrollY, [2800, 3000, 3400, 3600], [0, 1, 1, 0]);
  const y4 = useTransform(scrollY, [2800, 3000], [40, 0]);
  const s4 = useTransform(scrollY, [2800, 3000], [0.85, 1]);
  const l4 = useTransform(scrollY, [2800, 3000, 3400, 3600], [0, 0.4, 0.4, 0]);

  const nodes4 = skillsData.filter((s) => s.ecosystem === 4);
  const conn4 = generateConnections(nodes4);

  // Ecosistema 5: Infraestructura (3600 - 4400)
  const o5 = useTransform(scrollY, [3600, 3800, 4200, 4400], [0, 1, 1, 0]);
  const y5 = useTransform(scrollY, [3600, 3800], [40, 0]);
  const s5 = useTransform(scrollY, [3600, 3800], [0.85, 1]);
  const l5 = useTransform(scrollY, [3600, 3800, 4200, 4400], [0, 0.4, 0.4, 0]);

  const nodes5 = skillsData.filter((s) => s.ecosystem === 5);
  const conn5 = generateConnections(nodes5);

  const ecosystems = [
    { nodes: nodes1, connections: conn1, o: o1, y: y1, s: s1, l: l1 },
    { nodes: nodes2, connections: conn2, o: o2, y: y2, s: s2, l: l2 },
    { nodes: nodes3, connections: conn3, o: o3, y: y3, s: s3, l: l3 },
    { nodes: nodes4, connections: conn4, o: o4, y: y4, s: s4, l: l4 },
    { nodes: nodes5, connections: conn5, o: o5, y: y5, s: s5, l: l5 },
  ];

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
      {/* Menú Lateral */}
      <motion.div
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
        <motion.div
          style={{
            opacity: menuOpacity1,
            scale: menuScale1,
            transformOrigin: "left",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
        >
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "var(--text-main)",
              letterSpacing: "2px",
            }}
          >
            01_ FRONTEND
          </span>
        </motion.div>
        <motion.div
          style={{
            opacity: menuOpacity2,
            scale: menuScale2,
            transformOrigin: "left",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 1600, behavior: "smooth" })}
        >
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "var(--text-main)",
              letterSpacing: "2px",
            }}
          >
            02_ NODE.JS
          </span>
        </motion.div>
        <motion.div
          style={{
            opacity: menuOpacity3,
            scale: menuScale3,
            transformOrigin: "left",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 2400, behavior: "smooth" })}
        >
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "var(--text-main)",
              letterSpacing: "2px",
            }}
          >
            03_ JAVA
          </span>
        </motion.div>
        <motion.div
          style={{
            opacity: menuOpacity4,
            scale: menuScale4,
            transformOrigin: "left",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 3200, behavior: "smooth" })}
        >
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "var(--text-main)",
              letterSpacing: "2px",
            }}
          >
            04_ PYTHON
          </span>
        </motion.div>
        <motion.div
          style={{
            opacity: menuOpacity5,
            scale: menuScale5,
            transformOrigin: "left",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 4000, behavior: "smooth" })}
        >
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "var(--text-main)",
              letterSpacing: "2px",
            }}
          >
            05_ INFRA & DATOS
          </span>
        </motion.div>
      </motion.div>

      {/* Renderizar Ecosistemas */}
      {ecosystems.map((eco, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <motion.svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: eco.l,
              y: eco.y,
              scale: eco.s,
            }}
          >
            {eco.connections.map((conn, idx) => {
              const n1 = eco.nodes[conn[0]];
              const n2 = eco.nodes[conn[1]];
              return (
                <line
                  key={idx}
                  x1={`${n1.x}%`}
                  y1={`${n1.y}%`}
                  x2={`${n2.x}%`}
                  y2={`${n2.y}%`}
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              );
            })}
          </motion.svg>

          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: eco.o,
              y: eco.y,
              scale: eco.s,
            }}
          >
            {eco.nodes.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.id}
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
      ))}

      {/* Flecha a Bienvenida */}
      <motion.div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "absolute",
          top: "12vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow1Opacity,
          pointerEvents: arrow1PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronUp size={20} color="var(--text-muted)" />
        </motion.div>
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Volver a la Bienvenida
        </span>
      </motion.div>

      {/* Flecha a Node.js */}
      <motion.div
        onClick={() => window.scrollTo({ top: 1600, behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: "8vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow1Opacity,
          pointerEvents: arrow1PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Siguiente: Node.js
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>

      {/* Flecha anterior: Frontend */}
      <motion.div
        onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
        style={{
          position: "absolute",
          top: "12vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow2Opacity,
          pointerEvents: arrow2PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronUp size={20} color="var(--text-muted)" />
        </motion.div>
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Anterior: Frontend
        </span>
      </motion.div>

      {/* Flecha a Java */}
      <motion.div
        onClick={() => window.scrollTo({ top: 2400, behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: "8vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow2Opacity,
          pointerEvents: arrow2PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Siguiente: Java
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
      {/* Flecha anterior: Node.js */}
      <motion.div
        onClick={() => window.scrollTo({ top: 1600, behavior: "smooth" })}
        style={{
          position: "absolute",
          top: "12vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow3Opacity,
          pointerEvents: arrow3PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronUp size={20} color="var(--text-muted)" />
        </motion.div>
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Anterior: Node.js
        </span>
      </motion.div>

      {/* Flecha a Python */}
      <motion.div
        onClick={() => window.scrollTo({ top: 3200, behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: "8vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow3Opacity,
          pointerEvents: arrow3PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Siguiente: Python
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>

      {/* Flecha anterior: Java */}
      <motion.div
        onClick={() => window.scrollTo({ top: 2400, behavior: "smooth" })}
        style={{
          position: "absolute",
          top: "12vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow4Opacity,
          pointerEvents: arrow4PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronUp size={20} color="var(--text-muted)" />
        </motion.div>
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Anterior: Java
        </span>
      </motion.div>

      {/* Flecha a Infraestructura */}
      <motion.div
        onClick={() => window.scrollTo({ top: 4000, behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: "8vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow4Opacity,
          pointerEvents: arrow4PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Siguiente: Infraestructura
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>

      {/* Flecha anterior: Python */}
      <motion.div
        onClick={() => window.scrollTo({ top: 3200, behavior: "smooth" })}
        style={{
          position: "absolute",
          top: "12vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow5Opacity,
          pointerEvents: arrow5PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronUp size={20} color="var(--text-muted)" />
        </motion.div>
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Anterior: Python
        </span>
      </motion.div>

      {/* Flecha a Proyectos */}
      <motion.div
        onClick={() => window.scrollTo({ top: 5050, behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: "8vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrow5Opacity,
          pointerEvents: arrow5PointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
          Proyectos
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </div>
  );
}
