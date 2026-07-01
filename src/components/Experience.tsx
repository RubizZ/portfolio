"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SCROLL } from "../utils/scrollController";

export default function Experience() {
  const { scrollY } = useScroll();

  const start = SCROLL.HERO_END; // 400
  const end = SCROLL.EXPERIENCE_END; // 1200
  const center = (start + end) / 2; // 800

  // Opacities for the container
  const opacity = useTransform(scrollY, [start, start + 200, end - 200, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollY, [start, start + 200, end - 200, end], [0.85, 1, 1, 0.85]);
  const pointerEvents = useTransform(
    scrollY,
    [start - 1, start, end, end + 1],
    ["none", "auto", "auto", "none"]
  ) as any;

  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity,
          scale,
          pointerEvents,
          zIndex: 20,
        }}
      >
        <div style={{ maxWidth: "800px", width: "100%", padding: "2rem" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "3rem", textAlign: "center", color: "#fff", fontWeight: 200, letterSpacing: "2px" }}>
              Experiencia Laboral
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div className="experience-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", marginBottom: "0.5rem", gap: "1rem" }}>
                      <h3 className="experience-title">NTT Data <span style={{ color: "var(--text-muted)", fontSize: "1.2rem", fontWeight: 400 }}>→ cliente BBVA</span></h3>
                      <span style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "1px", fontSize: "1rem", textTransform: "uppercase" }}>Abr 2026 – Actualidad</span>
                  </div>
                  <h4 style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginTop: 0, marginBottom: "2rem", fontWeight: 400 }}>Software Engineer Intern</h4>
                  <ul className="experience-list">
                      <li>Desarrollo de componentes y páginas web con la arquitectura <strong>BBVA Cells</strong> sobre <strong>Lit</strong> (Web Components nativos) en un contexto fintech real.</li>
                      <li>Análisis e inmersión en código de soluciones BBVA en producción, comprendiendo el stack tecnológico y arquitecturas propietarias a gran escala.</li>
                      <li>Aprendizaje del ciclo de vida completo de soluciones funcionales en entorno bancario empresarial con metodologías ágiles.</li>
                  </ul>
              </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Arrows for Experience */}
      <motion.div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="global-nav-up"
        style={{
          position: "absolute",
          top: "12vh",
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
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "2px", textTransform: "uppercase", textAlign: "center" }}>
          Volver a la Bienvenida
        </span>
      </motion.div>

      <motion.div
        onClick={() => window.scrollTo({ top: SCROLL.getEcosystemCenter(0), behavior: "smooth" })}
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
          Conocimientos
        </span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </>
  );
}
