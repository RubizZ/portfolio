"use client";
import { useState } from "react";
import Hero from "./Hero";
import TechNetwork from "./TechNetwork";
import Skills from "./Skills";
import Projects from "./Projects";

export default function PortfolioClient() {
  const [selectedTech, setSelectedTech] = useState<string>("Todas");

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 40, pointerEvents: 'none' }}>
        <Hero />
        <TechNetwork />
        <Skills selectedTech={selectedTech} setSelectedTech={setSelectedTech} />
      </div>
      <div style={{ position: 'relative', zIndex: 30, paddingTop: '3900px' }}>
        <Projects selectedTech={selectedTech} />
      </div>
    </div>
  );
}
