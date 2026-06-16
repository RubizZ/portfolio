"use client";
import { useState } from "react";
import Skills from "./Skills";
import Projects from "./Projects";

export default function PortfolioClient() {
  const [selectedTech, setSelectedTech] = useState("Todas");

  return (
    <>
      <Skills selectedTech={selectedTech} setSelectedTech={setSelectedTech} />
      <Projects selectedTech={selectedTech} />
    </>
  );
}
