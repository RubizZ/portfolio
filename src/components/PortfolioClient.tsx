"use client";
import { useState, useEffect } from "react";
import Hero from "./Hero";
import TechNetwork from "./TechNetwork";
import Skills from "./Skills";
import Projects, { projectsData } from "./Projects";
import InteractiveBackground from "./InteractiveBackground";

export default function PortfolioClient() {
  const [selectedTech, setSelectedTech] = useState<string>("Todas");

  useEffect(() => {
    // Canvas handles the interaction now
  }, []);

  let filteredProjects = projectsData;
  if (selectedTech !== "Todas") {
    filteredProjects = filteredProjects.filter(p => p.tech.includes(selectedTech));
  }

  // Calculate required scroll height:
  // 3600px until filters/projects start
  // 1600px per project
  // We add 850px at the end so the sticky container unsticks shortly after the last project fully enters (which happens at 650px).
  const scrollHeight = filteredProjects.length > 0 
    ? 4400 + ((filteredProjects.length - 1) * 1600) + 1600 
    : 5300; // default space if no projects

  return (
    <>
      <InteractiveBackground />
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 40, pointerEvents: 'none' }}>
          <Hero />
          <TechNetwork />
          <Skills 
            selectedTech={selectedTech} 
            setSelectedTech={setSelectedTech} 
          />
          <Projects selectedTech={selectedTech} />
        </div>
        <div style={{ position: 'relative', zIndex: 30, height: `${scrollHeight}px` }}>
          {/* Scroll track for the motion animations */}
        </div>
      </div>

      {selectedTech !== "Todas" && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '6rem', paddingBottom: '2rem', zIndex: 50, position: 'relative' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1.1rem' }}>
            Has llegado al final de los proyectos de {selectedTech}.
          </p>
          <button 
            onClick={() => {
              setSelectedTech("Todas");
              window.scrollTo({ top: 5050, behavior: 'smooth' });
            }}
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              color: 'var(--text-main)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '32px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            }}
          >
            Quitar filtro y ver todos
          </button>
        </div>
      )}
    </>
  );
}


