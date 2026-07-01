"use client";
import { useState, useEffect } from "react";
import Hero from "./Hero";
import Experience from "./Experience";
import TechNetwork from "./TechNetwork";
import Skills from "./Skills";
import Projects from "./Projects";
import { projectsData } from "../data/projects";
import { SkillName } from "../data/skills";
import InteractiveBackground from "./InteractiveBackground";
import { SCROLL } from "../utils/scrollController";
import type { Locale, Dictionary } from "../lib/getDictionary";

interface PortfolioClientProps {
  lang: Locale;
  dict: Dictionary;
}

export default function PortfolioClient({ lang, dict }: PortfolioClientProps) {
  const [selectedTech, setSelectedTech] = useState<SkillName>("Todas");

  let filteredProjects = projectsData;
  if (selectedTech !== "Todas") {
    filteredProjects = filteredProjects.filter((p) =>
      p.tech.includes(selectedTech),
    );
  }

  // We add space at the end so the sticky container unsticks shortly after the last project fully enters
  const scrollHeight = SCROLL.getTotalHeight(filteredProjects.length);
  const checkpoints = SCROLL.getAllCheckpoints(filteredProjects.length);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    let touchStartY = 0;
    let currentIndex = 0;
    let lastJumpTime = 0;
    let wheelTimeout: NodeJS.Timeout;

    const snapToNext = (direction: 1 | -1) => {
      if (direction === 1) {
        currentIndex = Math.min(currentIndex + 1, checkpoints.length - 1);
      } else {
        currentIndex = Math.max(currentIndex - 1, 0);
      }

      const targetY = checkpoints[currentIndex];
      window.scrollTo({ top: targetY, behavior: "smooth" });
      lastJumpTime = Date.now();
    };

    const syncCurrentIndex = () => {
      // Si ha pasado suficiente tiempo desde el último salto (la animación ha terminado),
      // resincronizamos el índice con la posición real del scroll por si usó algún botón.
      if (Date.now() - lastJumpTime > 800) {
        let minDiff = Infinity;
        const currentY = window.scrollY;
        for (let i = 0; i < checkpoints.length; i++) {
          const diff = Math.abs(checkpoints[i] - currentY);
          if (diff < minDiff) {
            minDiff = diff;
            currentIndex = i;
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if ((e.target as Element).closest('#mobile-filters-modal')) return;
      const lastCheckpoint = checkpoints[checkpoints.length - 1];
      const currentY = window.scrollY;

      if (currentY <= 5 && e.deltaY < 0) return;
      if (currentY >= lastCheckpoint - 5) {
        if (e.deltaY > 0) return;
        if (e.deltaY < 0 && currentY > lastCheckpoint + 5) return;
      }

      e.preventDefault();
      if (wheelTimeout) return;
      syncCurrentIndex();
      snapToNext(e.deltaY > 0 ? 1 : -1);

      wheelTimeout = setTimeout(() => {
        wheelTimeout = undefined as any;
      }, 300);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      syncCurrentIndex();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if ((e.target as Element).closest('#mobile-filters-modal')) return;
      const touchY = e.touches[0].clientY;
      const diff = touchStartY === 0 ? 0 : touchStartY - touchY;

      const lastCheckpoint = checkpoints[checkpoints.length - 1];
      const currentY = window.scrollY;

      if (currentY <= 5 && diff < 0) return;
      if (currentY >= lastCheckpoint - 5) {
        if (diff > 0) return;
        if (diff < 0 && currentY > lastCheckpoint + 5) return;
      }

      e.preventDefault();

      if (touchStartY === 0) return;

      if (Math.abs(diff) > 50) {
        snapToNext(diff > 0 ? 1 : -1);
        touchStartY = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [checkpoints]);

  return (
    <>
      <InteractiveBackground />
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100dvh",
            overflow: "hidden",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          <Hero lang={lang} dict={dict.hero} />
          <Experience dict={dict} />
          <TechNetwork dict={dict} />
          <Skills
            selectedTech={selectedTech}
            setSelectedTech={setSelectedTech}
            dict={dict}
          />
          <Projects selectedTech={selectedTech} dict={dict} />
        </div>
        <div
          className="scroll-track-container"
          style={{
            position: "relative",
            zIndex: 30,
            height: `${scrollHeight}px`,
          }}
        >
          {/* Scroll track for the motion animations */}
          {SCROLL.getAllCheckpoints(filteredProjects.length).map(
            (point, idx) => (
              <div
                key={idx}
                className="scroll-snap-point"
                style={{
                  position: "absolute",
                  top: `${point}px`,
                  height: "1px",
                  width: "100%",
                  pointerEvents: "none",
                }}
              />
            ),
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "clamp(3rem, 10dvh, 6rem)",
          paddingBottom: "clamp(2rem, 8dvh, 4rem)",
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
            ? dict.end.reachedEndFiltered.replace("{tech}", selectedTech)
            : dict.end.reachedEnd}
        </p>

        {selectedTech !== "Todas" && (
          <button
            onClick={() => {
              setSelectedTech("Todas");
              window.scrollTo({
                top: SCROLL.getSkillsEnd(),
                behavior: "smooth",
              });
            }}
            className="btn-remove-filter"
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
          >
            {dict.end.clearFilter}
          </button>
        )}

        <button
          className="btn-back-home"
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
        >
          {dict.end.backToHome}
        </button>
      </div>
    </>
  );
}
