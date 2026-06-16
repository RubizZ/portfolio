"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiCplusplus,
  SiPython,
  SiDjango,
  SiFlask,
  SiTensorflow,
} from "react-icons/si";
import { FaJava, FaAndroid, FaLeaf, FaChevronDown } from "react-icons/fa";

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
  const arrow4PointerEvents = useTransform(scrollY, [2799, 2800, 3600, 3601], ["none", "auto", "auto", "none"]) as any;

  // Master Sidebar Opacity
  const sidebarOpacity = useTransform(
    scrollY,
    [400, 600, 3400, 3600],
    [0, 1, 1, 0],
  );
  const sidebarPointerEvents = useTransform(
    scrollY,
    [399, 400, 3600, 3601],
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

  // Ecosistema 1: JS/TS (400 - 1200)
  const o1 = useTransform(scrollY, [400, 600, 1000, 1200], [0, 1, 1, 0]);
  const y1 = useTransform(scrollY, [400, 600], [40, 0]);
  const s1 = useTransform(scrollY, [400, 600], [0.85, 1]);
  const l1 = useTransform(scrollY, [600, 800, 1000, 1200], [0, 0.4, 0.4, 0]);

  const nodes1 = [
    { id: 1, icon: SiReact, x: 20, y: 30, color: "#61DAFB", name: "React" },
    {
      id: 2,
      icon: SiTypescript,
      x: 80,
      y: 25,
      color: "#3178C6",
      name: "TypeScript",
    },
    {
      id: 3,
      icon: SiNodedotjs,
      x: 50,
      y: 50,
      color: "#339933",
      name: "Node.js",
    },
    {
      id: 4,
      icon: SiJavascript,
      x: 30,
      y: 70,
      color: "#F7DF1E",
      name: "JavaScript",
    },
    {
      id: 5,
      icon: SiNextdotjs,
      x: 70,
      y: 75,
      color: "#ffffff",
      name: "Next.js",
    },
  ];
  const conn1 = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [0, 3],
    [1, 4],
  ];

  // Ecosistema 2: Java (1200 - 2000)
  const o2 = useTransform(scrollY, [1200, 1400, 1800, 2000], [0, 1, 1, 0]);
  const y2 = useTransform(scrollY, [1200, 1400], [40, 0]);
  const s2 = useTransform(scrollY, [1200, 1400], [0.85, 1]);
  const l2 = useTransform(scrollY, [1400, 1600, 1800, 2000], [0, 0.4, 0.4, 0]);

  const nodes2 = [
    { id: 1, icon: FaJava, x: 50, y: 30, color: "#007396", name: "Java" },
    { id: 2, icon: FaAndroid, x: 25, y: 65, color: "#3DDC84", name: "Android" },
    { id: 3, icon: FaLeaf, x: 75, y: 65, color: "#6DB33F", name: "Spring" },
  ];
  const conn2 = [
    [0, 1],
    [0, 2],
    [1, 2],
  ];

  // Ecosistema 3: C++ (2000 - 2800)
  const o3 = useTransform(scrollY, [2000, 2200, 2600, 2800], [0, 1, 1, 0]);
  const y3 = useTransform(scrollY, [2000, 2200], [40, 0]);
  const s3 = useTransform(scrollY, [2000, 2200], [0.85, 1]);
  const l3 = useTransform(scrollY, [2200, 2400, 2600, 2800], [0, 0.4, 0.4, 0]);

  const nodes3 = [
    { id: 1, icon: SiCplusplus, x: 50, y: 50, color: "#00599C", name: "C++" },
    { id: 2, icon: SiCplusplus, x: 20, y: 30, color: "#00599C", name: "Qt" },
    {
      id: 3,
      icon: SiCplusplus,
      x: 80,
      y: 70,
      color: "#00599C",
      name: "Unreal",
    },
  ];
  const conn3 = [
    [0, 1],
    [0, 2],
  ];

  // Ecosistema 4: Python (2800 - 3600)
  const o4 = useTransform(scrollY, [2800, 3000, 3400, 3600], [0, 1, 1, 0]);
  const y4 = useTransform(scrollY, [2800, 3000], [40, 0]);
  const s4 = useTransform(scrollY, [2800, 3000], [0.85, 1]);
  const l4 = useTransform(scrollY, [3000, 3200, 3400, 3600], [0, 0.4, 0.4, 0]);

  const nodes4 = [
    { id: 1, icon: SiPython, x: 50, y: 50, color: "#3776AB", name: "Python" },
    { id: 2, icon: SiDjango, x: 20, y: 30, color: "#092E20", name: "Django" },
    { id: 3, icon: SiFlask, x: 80, y: 30, color: "#ffffff", name: "Flask" },
    {
      id: 4,
      icon: SiTensorflow,
      x: 50,
      y: 80,
      color: "#FF6F00",
      name: "TensorFlow",
    },
  ];
  const conn4 = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
  ];

  const ecosystems = [
    { nodes: nodes1, connections: conn1, o: o1, y: y1, s: s1, l: l1 },
    { nodes: nodes2, connections: conn2, o: o2, y: y2, s: s2, l: l2 },
    { nodes: nodes3, connections: conn3, o: o3, y: y3, s: s3, l: l3 },
    { nodes: nodes4, connections: conn4, o: o4, y: y4, s: s4, l: l4 },
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
      <motion.h2
        style={{
          position: "absolute",
          top: "10vh",
          width: "100%",
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: 300,
          letterSpacing: "4px",
          color: "var(--text-main)",
          opacity: sidebarOpacity,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        CONOCIMIENTOS
      </motion.h2>

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
            01_ WEB
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
            02_ JAVA
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
            03_ C++
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
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.8rem",
                  }}
                >
                  <div
                    style={{
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
                  </div>
                  <span
                    style={{
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

      {/* Flecha a Java */}
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
          Siguiente: Java
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>

      {/* Flecha a C++ */}
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
          Siguiente: C++
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
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

      {/* Flecha a Proyectos */}
      <motion.div
        onClick={() => window.scrollTo({ top: 4250, behavior: "smooth" })}
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
          Proyectos
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </div>
  );
}
