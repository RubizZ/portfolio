"use client";
import { useState } from "react";
import Hero from "./Hero";
import TechNetwork from "./TechNetwork";
import Skills from "./Skills";
import Projects from "./Projects";

// Duplicate minimal data needed for height calculation
const projectsData = [
  { tech: ["TypeScript", "Next.js", "React"] },
  { tech: ["Android", "Java"] },
  { tech: ["TypeScript", "Node.js"] },
  { tech: ["Java"] },
  { tech: ["TypeScript", "Node.js", "Express"] },
  { tech: ["HTML", "JavaScript"] }
];

export default function PortfolioClient() {
  const [selectedTech, setSelectedTech] = useState<string>("Todas");

  let filteredProjects = projectsData;
  if (selectedTech !== "Todas") {
    filteredProjects = filteredProjects.filter(p => p.tech.includes(selectedTech));
  }

  // Calculate required scroll height:
  // 3600px until filters/projects start
  // 1600px per project + 1500px extra to let the last one scroll out
  const scrollHeight = filteredProjects.length > 0 
    ? 3600 + (filteredProjects.length * 1600) + 1500 
    : 4500; // default space if no projects

  return (
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
  );
}


