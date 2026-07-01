"use client";

import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, LayoutGroup } from "framer-motion";
import { skillsData, SkillName } from "../data/skills";
import { SCROLL } from "../utils/scrollController";
import type { Dictionary } from "../lib/getDictionary";
import { activeEcosystems } from "../data/ecosystems";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCode,
  FaFilter,
} from "react-icons/fa";

interface SkillsProps {
  selectedTech: SkillName;
  setSelectedTech: (tech: SkillName) => void;
  dict: Dictionary;
}

export default function Skills({
  selectedTech,
  setSelectedTech,
  dict,
}: SkillsProps) {
  const { scrollY } = useScroll();
  const carouselRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorY, setIndicatorY] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [transitionType, setTransitionType] = useState<"spring" | "instant">(
    "spring",
  );
  const [fadeKey, setFadeKey] = useState(0);

  const previousTechRef = useRef(selectedTech);
  const [isFlyingFromTodas, setIsFlyingFromTodas] = useState(false);
  const [carouselBounds, setCarouselBounds] = useState({ left: 0, right: 0 });

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileFilters]);

  const updateIndicatorRef = useRef<
    ((type?: "spring" | "instant") => void) | null
  >(null);

  const updateIndicator = useCallback(
    (type: "spring" | "instant" = "instant") => {
      if (!dockRef.current) return;
      setTransitionType(type);

      const activeEl = dockRef.current.querySelector(
        `[data-tech="${selectedTech}"]`,
      ) as HTMLElement;
      if (activeEl) {
        const dockRect = dockRef.current.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        const x = elRect.left - dockRect.left + elRect.width / 2;
        const y = elRect.bottom - dockRect.top + 4; // 4px below the element
        let finalType = type;

        if (selectedTech === "Todas" && type === "spring") {
          const dockWidth = dockRect.width;
          const rightBoundary = dockWidth - carouselBounds.right;
          // If the old position was hidden by the carousel bounds
          if (indicatorX < carouselBounds.left || indicatorX > rightBoundary) {
            finalType = "instant";
            setFadeKey((k) => k + 1); // Remounts to trigger a teleport with fade-in
          }
        }

        setTransitionType(finalType);
        setIndicatorX(x);
        setIndicatorY(y);

        if (carouselRef.current) {
          const carouselRect = carouselRef.current.getBoundingClientRect();
          setCarouselBounds({
            left: Math.max(0, carouselRect.left - dockRect.left),
            right: Math.max(0, dockRect.right - carouselRect.right),
          });
        }
        setIndicatorVisible(true);
      }
    },
    [selectedTech, indicatorX, carouselBounds.left, carouselBounds.right],
  );

  useLayoutEffect(() => {
    updateIndicatorRef.current = updateIndicator;
  }, [updateIndicator]);

  useLayoutEffect(() => {
    if (selectedTech !== "Todas" && previousTechRef.current === "Todas") {
      setIsFlyingFromTodas(true);
    }
    previousTechRef.current = selectedTech;
    if (updateIndicatorRef.current) {
      updateIndicatorRef.current("spring");
    }
  }, [selectedTech]);

  useEffect(() => {
    const handleResize = () => {
      if (updateIndicatorRef.current) {
        updateIndicatorRef.current("instant");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const start = SCROLL.getTechNetworkEnd();
  const end = SCROLL.getSkillsEnd();
  const opacity = useTransform(scrollY, [start, start + 50], [0, 1]);
  const dockY = useTransform(scrollY, [start, end], ["-15vh", "0vh"]);
  const pointerEvents = useTransform(
    scrollY,
    [start, end],
    ["none", "auto"],
  ) as any;

  // Group skills by ecosystem
  const ecosystems = activeEcosystems.map((e) => e.id);
  const ecosystemWatermarks = activeEcosystems.reduce(
    (acc, eco) => {
      const ecoName = dict.ecosystems[eco.dictKey].name;
      const isLong = ecoName.length > 10;
      
      acc[eco.id] = (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: isLong ? 0.85 : 1,
            fontSize: isLong
              ? "clamp(0.8rem, 4vw, 2.5rem)"
              : "clamp(1rem, 6vw, 5rem)",
            textAlign: "center",
            maxWidth: "350px",
          }}
        >
          {isLong && ecoName.includes(" & ") ? (
            <>
              <span>{ecoName.split(" & ")[0]} &</span>
              <span>{ecoName.split(" & ")[1]}</span>
            </>
          ) : (
            <span>{ecoName}</span>
          )}
        </div>
      );
      return acc;
    },
    {} as Record<number, React.ReactNode>,
  );

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const currentIndex = Math.round(scrollLeft / clientWidth);
      const totalSlides = ecosystems.length;

      if (direction === "left") {
        if (currentIndex <= 0) {
          // Wrap to the last slide
          carouselRef.current.scrollTo({
            left: (totalSlides - 1) * clientWidth,
            behavior: "smooth",
          });
        } else {
          carouselRef.current.scrollTo({
            left: (currentIndex - 1) * clientWidth,
            behavior: "smooth",
          });
        }
      } else {
        if (currentIndex >= totalSlides - 1) {
          // Wrap to the first slide
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollTo({
            left: (currentIndex + 1) * clientWidth,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "clamp(2vh, 4dvh, 40px)",
        opacity,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Dock Principal de Tecnologías */}
        <motion.div
          ref={dockRef}
          className="dock-container"
          style={{
            pointerEvents,
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "space-around" : "flex-start",
            padding: "1rem 1.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            borderRadius: "32px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            y: dockY,
            width: "90%",
            maxWidth: "800px",
          }}
        >
          <LayoutGroup>
            {/* Botón Todas */}
            <div
              data-tech="Todas"
              onClick={() => {
                setSelectedTech("Todas");
                window.scrollTo({
                  top: SCROLL.getSkillsEnd(),
                  behavior: "smooth",
                });
              }}
              className="dock-item"
              style={{
                position: "relative",
                padding: "1rem 0.5rem",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                flexShrink: 0,
              }}
            >
              <div
                className="icon-wrapper"
                style={{
                  color:
                    selectedTech === "Todas"
                      ? "var(--accent)"
                      : "rgba(255,255,255,0.4)",
                  transition: "all 0.3s ease",
                  transform:
                    selectedTech === "Todas" ? "scale(1.3)" : "scale(1)",
                }}
              >
                <FaCode size="clamp(20px, 4vw, 28px)" />
              </div>
              {isMobile && (
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "-2px",
                    fontWeight: 500,
                  }}
                >
                  {dict.skills.all}
                </div>
              )}
              <div className="dock-tooltip">{dict.skills.all}</div>
            </div>

            {/* Filtro Activo (Móvil) */}
            {isMobile && selectedTech !== "Todas" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  onClick={() => setShowMobileFilters(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    background: "rgba(109,40,217,0.2)",
                    border: "1px solid rgba(109,40,217,0.5)",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {(() => {
                    const activeSkill = skillsData.find(
                      (s) => s.name === selectedTech,
                    );
                    if (activeSkill) {
                      const Icon = activeSkill.icon;
                      return (
                        <>
                          <Icon size={18} />
                          <span
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              letterSpacing: "0.5px",
                            }}
                          >
                            {selectedTech}
                          </span>
                        </>
                      );
                    }
                    return (
                      <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                        {dict.skills.all}
                      </span>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Botón Filtros (Móvil) */}
            {isMobile && (
              <div
                onClick={() => setShowMobileFilters(true)}
                className="dock-item"
                style={{
                  position: "relative",
                  padding: "1rem 0.5rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexShrink: 0,
                }}
              >
                <div
                  className="icon-wrapper"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaFilter size={24} />
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "0px",
                    fontWeight: 500,
                  }}
                >
                  {dict.skills.filters}
                </div>
                <div className="dock-tooltip">{dict.skills.filters}</div>
              </div>
            )}

            {/* Separador Visual */}
            {!isMobile && (
              <div
                style={{
                  width: "2px",
                  height: "40px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  margin: "0 1rem",
                  flexShrink: 0,
                }}
              />
            )}

            {/* Flecha Izquierda */}
            {!isMobile && (
              <button
                onClick={() => scrollCarousel("left")}
                className="nav-arrow"
                style={{
                  flexShrink: 0,
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  padding: "0.5rem",
                }}
              >
                <FaChevronLeft size={20} />
              </button>
            )}

            {/* Carrusel de Ecosistemas */}
            {!isMobile && (
              <div
                ref={carouselRef}
                onScroll={() => updateIndicator("instant")}
                className="carousel-container"
                style={{
                  display: "flex",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  scrollBehavior: "smooth",
                  flexGrow: 1,
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE/Edge
                  paddingTop: "45px",
                  paddingBottom: "45px",
                  marginTop: "-45px",
                  marginBottom: "-45px",
                }}
              >
                {ecosystems.map((ecoId) => {
                  const ecoSkills = skillsData.filter(
                    (s) => s.ecosystem === ecoId && !s.hidden,
                  );
                  return (
                    <div
                      key={ecoId}
                      style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "100%",
                        scrollSnapAlign: "start",
                        padding: "0 0.5rem",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          color: "rgba(255, 255, 255, 0.03)",
                          letterSpacing: "0.2em",
                          fontWeight: 900,
                          zIndex: 0,
                          pointerEvents: "none",
                        }}
                      >
                        {ecosystemWatermarks[ecoId]}
                      </div>
                      <div
                        style={{
                          position: "relative",
                          zIndex: 10,
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "1rem",
                        }}
                      >
                        {ecoSkills.map((skill) => {
                          const Icon = skill.icon;
                          const isActive = selectedTech === skill.name;
                          return (
                            <div
                              key={skill.name}
                              data-tech={skill.name}
                              onClick={() => {
                                setSelectedTech(skill.name);
                                window.scrollTo({
                                  top: SCROLL.getSkillsEnd(),
                                  behavior: "smooth",
                                });
                              }}
                              className="dock-item"
                              style={{
                                position: "relative",
                                padding: "0.5rem",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <div
                                className="icon-wrapper"
                                style={{
                                  color: isActive
                                    ? "var(--accent)"
                                    : "rgba(255,255,255,0.4)",
                                  transition:
                                    "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                  transform: isActive
                                    ? "scale(1.3)"
                                    : "scale(1)",
                                }}
                              >
                                <Icon size={28} />
                              </div>
                              <div className="dock-tooltip">{skill.name}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Flecha Derecha */}
            {!isMobile && (
              <button
                onClick={() => scrollCarousel("right")}
                className="nav-arrow"
                style={{
                  flexShrink: 0,
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  padding: "0.5rem",
                }}
              >
                <FaChevronRight size={20} />
              </button>
            )}
          </LayoutGroup>

          {/* Wrapper de enmascaramiento estático para la bola */}
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                zIndex: 100,
                clipPath: `inset(0px ${carouselBounds.right}px 0px ${selectedTech === "Todas" || isFlyingFromTodas ? 0 : carouselBounds.left}px)`,
              }}
            >
              {/* Indicador Global Flotante */}
              <motion.div
                key={fadeKey}
                initial={{ opacity: 0, x: indicatorX, y: indicatorY }}
                animate={{
                  x: indicatorX,
                  y: indicatorY,
                  opacity: indicatorVisible ? 1 : 0,
                }}
                onAnimationComplete={() => setIsFlyingFromTodas(false)}
                transition={{
                  x:
                    transitionType === "spring"
                      ? { type: "spring", stiffness: 400, damping: 30 }
                      : { type: "tween", duration: 0 },
                  y:
                    transitionType === "spring"
                      ? { type: "spring", stiffness: 400, damping: 30 }
                      : { type: "tween", duration: 0 },
                  opacity: { duration: 0.2 }, // Fade duration
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-3px",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "var(--accent)",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px var(--accent)",
                }}
              />
            </div>
          )}
        </motion.div>
      </div>
      <style>{`
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
        .nav-arrow {
          transition: all 0.3s ease;
        }
        .dock-tooltip {
          position: absolute; 
          top: -35px; 
          background: rgba(0,0,0,0.8); 
          color: white;
          padding: 6px 12px; 
          border-radius: 8px; 
          font-size: 0.85rem; 
          opacity: 0;
          pointer-events: none; 
          transition: all 0.3s ease; 
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,0.1);
          font-weight: 500;
          letter-spacing: 1px;
          z-index: 100;
        }
        .side-arrow {
          color: rgba(255,255,255,0.3);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @media (hover: hover) {
          .nav-arrow:hover {
            color: white !important;
            transform: scale(1.2);
          }
          .dock-item:hover .icon-wrapper { 
            transform: scale(1.4) translateY(-5px) !important; 
            color: #fff !important; 
          }
          .dock-item:hover .dock-tooltip { 
            opacity: 1; 
            transform: translateY(-5px); 
          }
          .side-arrow:hover {
            color: #fff;
            transform: translateY(-50%) scale(1.2) !important;
          }
        }
      `}</style>

      {/* Mobile Filters Modal */}
      {showMobileFilters &&
        isMobile &&
        mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="mobile-filters-modal"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(15, 15, 35, 0.95)",
              backdropFilter: "blur(20px)",
              zIndex: 99999, // Ensure it's above everything
              display: "flex",
              flexDirection: "column",
              padding: "2rem 1.5rem",
              overflowY: "auto",
              pointerEvents: "auto", // Crucial since parent might have none
              overscrollBehavior: "contain", // Prevents scroll chaining to body on mobile
              touchAction: "pan-y", // Prevents the browser intervention for passive touch listeners
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", color: "#fff", margin: 0 }}>
                {dict.skills.filters}
              </h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                {dict.projects.close}
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                paddingBottom: "4rem",
              }}
            >
              {ecosystems.map((ecoId) => {
                const ecoSkills = skillsData.filter(
                  (s) => s.ecosystem === ecoId && !s.hidden,
                );
                const ecoData = activeEcosystems.find((e) => e.id === ecoId);
                if (ecoSkills.length === 0) return null;

                return (
                  <div key={ecoId}>
                    <h3
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "1rem",
                      }}
                    >
                      {ecoData
                        ? dict.ecosystems[ecoData.dictKey].name
                        : `Ecosistema ${ecoId}`}
                    </h3>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
                    >
                      {ecoSkills.map((skill) => {
                        const Icon = skill.icon;
                        const isActive = selectedTech === skill.name;
                        return (
                          <div
                            key={skill.name}
                            onClick={() => {
                              setSelectedTech(skill.name);
                              setShowMobileFilters(false);
                              window.scrollTo({
                                top: SCROLL.getSkillsEnd(),
                                behavior: "smooth",
                              });
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "0.5rem 1rem",
                              borderRadius: "8px",
                              background: isActive
                                ? "rgba(109,40,217,0.2)"
                                : "rgba(255,255,255,0.05)",
                              border: `1px solid ${isActive ? "rgba(109,40,217,0.5)" : "rgba(255,255,255,0.1)"}`,
                              color: isActive
                                ? "#fff"
                                : "rgba(255,255,255,0.7)",
                              cursor: "pointer",
                            }}
                          >
                            <Icon size={18} />
                            <span
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: isActive ? 600 : 400,
                              }}
                            >
                              {skill.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>,
          document.body,
        )}
    </motion.div>
  );
}
