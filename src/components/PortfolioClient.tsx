"use client";
import { useState } from "react";
import Hero from "./Hero";
import Experience from "./Experience";
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
          <Experience />
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
