"use client";
import { useState } from "react";
import Hero from "./Hero";
import TechNetwork from "./TechNetwork";
import Skills from "./Skills";
import Projects from "./Projects";
import { projectsData } from "../data/projects";
import { SkillName } from "../data/skills";
import InteractiveBackground from "./InteractiveBackground";
import { SCROLL } from "../utils/scrollController";

export default function PortfolioClient() {
  const [selectedTech, setSelectedTech] = useState<SkillName>("Todas");

  let filteredProjects = projectsData;
  if (selectedTech !== "Todas") {
    filteredProjects = filteredProjects.filter((p) =>
      p.tech.includes(selectedTech),
    );
  }

  // We add space at the end so the sticky container unsticks shortly after the last project fully enters
  const scrollHeight = SCROLL.getTotalHeight(filteredProjects.length);

  return (
    <>
      <InteractiveBackground />
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          <Hero />
          <TechNetwork />
          <Skills
            selectedTech={selectedTech}
            setSelectedTech={setSelectedTech}
          />
          <Projects selectedTech={selectedTech} />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 30,
            height: `${scrollHeight}px`,
          }}
        >
          {/* Scroll track for the motion animations */}
        </div>
      </div>

      {/* Experiencia Laboral */}
      <div style={{
          position: "relative",
          zIndex: 50,
          backgroundColor: "rgba(10, 10, 15, 0.4)",
          backdropFilter: "blur(10px)",
          padding: "6rem 2rem",
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)"
      }}>
          <div style={{ maxWidth: "800px", width: "100%" }}>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "3rem", textAlign: "center", color: "#fff", fontWeight: 200, letterSpacing: "2px" }}>
                  Experiencia Laboral
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <div style={{ 
                      padding: "2rem", 
                      borderRadius: "24px", 
                      backgroundColor: "rgba(255, 255, 255, 0.02)", 
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                  }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", marginBottom: "0.5rem", gap: "1rem" }}>
                          <h3 style={{ fontSize: "1.5rem", margin: 0, color: "#fff", fontWeight: 600 }}>NTT Data <span style={{ color: "var(--text-muted)", fontSize: "1.1rem", fontWeight: 400 }}>→ cliente BBVA</span></h3>
                          <span style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "1px", fontSize: "0.9rem", textTransform: "uppercase" }}>Mar 2026 – Actualidad</span>
                      </div>
                      <h4 style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginTop: 0, marginBottom: "1.5rem", fontWeight: 400 }}>Software Engineer Intern</h4>
                      <ul style={{ color: "var(--text-main)", display: "flex", flexDirection: "column", gap: "0.8rem", paddingLeft: "1.2rem", lineHeight: "1.6", fontWeight: 300 }}>
                          <li>Desarrollo de componentes y páginas web con la arquitectura <strong>BBVA Cells</strong> sobre <strong>Lit</strong> (Web Components nativos) en un contexto fintech real.</li>
                          <li>Análisis e inmersión en código de soluciones BBVA en producción, comprendiendo el stack tecnológico y arquitecturas propietarias a gran escala.</li>
                          <li>Aprendizaje del ciclo de vida completo de soluciones funcionales en entorno bancario empresarial con metodologías ágiles.</li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "6rem",
          paddingBottom: "4rem",
          zIndex: 50,
          position: "relative",
          gap: "1.5rem",
        }}
      >
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "0",
            fontSize: "1.1rem",
          }}
        >
          {selectedTech !== "Todas"
            ? `Has llegado al final de los proyectos de ${selectedTech}.`
            : "Has llegado al final del portfolio."}
        </p>

        {selectedTech !== "Todas" && (
          <button
            onClick={() => {
              setSelectedTech("Todas");
              window.scrollTo({ top: SCROLL.getSkillsEnd(), behavior: "smooth" });
            }}
            style={{
              width: "100%",
              maxWidth: "350px",
              padding: "1rem 2.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              color: "var(--text-main)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "32px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
            }}
          >
            Quitar filtro y ver todos
          </button>
        )}

        <button
          onClick={() => {
            setSelectedTech("Todas");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            width: "100%",
            maxWidth: "350px",
            padding: "1rem 2.5rem",
            backgroundColor: "transparent",
            color: "var(--text-muted)",
            border: "1px dashed rgba(255, 255, 255, 0.2)",
            borderRadius: "32px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
            e.currentTarget.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0)";
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Volver a la Bienvenida
        </button>
      </div>
    </>
  );
}
