"use client";

import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { motion, useScroll, useTransform, LayoutGroup } from "framer-motion";
import { skillsData, SkillName } from "../data/skills";
import { FaChevronLeft, FaChevronRight, FaCode } from "react-icons/fa";

interface SkillsProps {
  selectedTech: SkillName;
  setSelectedTech: (tech: SkillName) => void;
}

export default function Skills({ selectedTech, setSelectedTech }: SkillsProps) {
  const { scrollY } = useScroll();
  const carouselRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [transitionType, setTransitionType] = useState<"spring" | "instant">("spring");
  const [fadeKey, setFadeKey] = useState(0);

  const previousTechRef = useRef(selectedTech);
  const [isFlyingFromTodas, setIsFlyingFromTodas] = useState(false);
  const [carouselBounds, setCarouselBounds] = useState({ left: 0, right: 0 });



  const updateIndicatorRef = useRef<((type?: "spring" | "instant") => void) | null>(null);

  const updateIndicator = useCallback((type: "spring" | "instant" = "instant") => {
    if (!dockRef.current) return;
    setTransitionType(type);
    
    const activeEl = dockRef.current.querySelector(`[data-tech="${selectedTech}"]`) as HTMLElement;
    if (activeEl) {
        const dockRect = dockRef.current.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        const x = elRect.left - dockRect.left + (elRect.width / 2);
        let finalType = type;

        if (selectedTech === "Todas" && type === "spring") {
          const dockWidth = dockRect.width;
          const rightBoundary = dockWidth - carouselBounds.right;
          // If the old position was hidden by the carousel bounds
          if (indicatorX < carouselBounds.left || indicatorX > rightBoundary) {
            finalType = "instant";
            setFadeKey(k => k + 1); // Remounts to trigger a teleport with fade-in
          }
        }

        setTransitionType(finalType);
        setIndicatorX(x);

        if (carouselRef.current) {
          const carouselRect = carouselRef.current.getBoundingClientRect();
          setCarouselBounds({
            left: Math.max(0, carouselRect.left - dockRect.left),
            right: Math.max(0, dockRect.right - carouselRect.right)
          });
        }
        setIndicatorVisible(true);
      }
  }, [selectedTech, indicatorX, carouselBounds.left, carouselBounds.right]);

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const opacity = useTransform(scrollY, [4400, 4450], [0, 1]);
  const dockY = useTransform(scrollY, [4400, 5050], ['-15vh', '0vh']);
  const pointerEvents = useTransform(scrollY, [4400, 5050], ['none', 'auto']) as any;

  // Group skills by ecosystem
  const ecosystems = [1, 2, 3, 4, 5];
  const ecosystemWatermarks: Record<number, React.ReactNode> = {
    1: <span style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>FRONTEND</span>,
    2: <span style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>NODE.JS</span>,
    3: <span style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>JAVA</span>,
    4: <span style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>PYTHON</span>,
    5: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 0.85, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        <span>INFRA &</span>
        <span>DATOS</span>
      </div>
    )
  };
  
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const currentIndex = Math.round(scrollLeft / clientWidth);
      const totalSlides = ecosystems.length;
      
      if (direction === 'left') {
        if (currentIndex <= 0) {
          // Wrap to the last slide
          carouselRef.current.scrollTo({ left: (totalSlides - 1) * clientWidth, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollTo({ left: (currentIndex - 1) * clientWidth, behavior: 'smooth' });
        }
      } else {
        if (currentIndex >= totalSlides - 1) {
          // Wrap to the first slide
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollTo({ left: (currentIndex + 1) * clientWidth, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '4vh',
      opacity,
      pointerEvents: 'none',
      zIndex: 50
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

        {/* Dock Principal de Tecnologías */}
        <motion.div 
          ref={dockRef}
          className="dock-container" 
          style={{
            pointerEvents,
            display: 'flex',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            y: dockY,
            width: '90%',
            maxWidth: '800px'
          }}
        >
          <LayoutGroup>
          {/* Botón Todas */}
          <div 
            data-tech="Todas"
            onClick={() => {
              setSelectedTech("Todas");
              window.scrollTo({ top: 5050, behavior: 'smooth' });
            }}
            className="dock-item"
            style={{
              position: 'relative',
              padding: '1rem 0.5rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              flexShrink: 0
            }}
          >
            <div className="icon-wrapper" style={{
              color: selectedTech === "Todas" ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
              transform: selectedTech === "Todas" ? 'scale(1.3)' : 'scale(1)'
            }}>
              <FaCode size={28} />
            </div>
            <div className="dock-tooltip">Todas</div>
          </div>

          {/* Separador Visual */}
          <div style={{
            width: '2px',
            height: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            margin: '0 1rem',
            flexShrink: 0
          }} />

          {/* Flecha Izquierda */}
          <button 
            onClick={() => scrollCarousel('left')}
            className="nav-arrow"
            style={{ flexShrink: 0, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '0.5rem' }}
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Carrusel de Ecosistemas */}
          <div 
            ref={carouselRef}
            onScroll={() => updateIndicator("instant")}
            className="carousel-container"
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              flexGrow: 1,
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
              paddingTop: '45px',
              paddingBottom: '45px',
              marginTop: '-45px',
              marginBottom: '-45px'
            }}
          >
            {ecosystems.map(ecoId => {
              const ecoSkills = skillsData.filter(s => s.ecosystem === ecoId);
              return (
                <div 
                  key={ecoId}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '100%',
                    scrollSnapAlign: 'start',
                    padding: '0 0.5rem'
                  }}
                >
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', display: 'flex', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.03)', letterSpacing: '8px', fontWeight: 900, zIndex: 0, pointerEvents: 'none' }}>
                    {ecosystemWatermarks[ecoId]}
                  </div>
                  <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                  {ecoSkills.map(skill => {
                    const Icon = skill.icon;
                    const isActive = selectedTech === skill.name;
                    return (
                      <div 
                        key={skill.name} 
                        data-tech={skill.name}
                        onClick={() => {
                          setSelectedTech(skill.name);
                          window.scrollTo({ top: 5050, behavior: 'smooth' });
                        }}
                        className="dock-item"
                        style={{
                          position: 'relative',
                          padding: '0.5rem',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <div className="icon-wrapper" style={{
                          color: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: isActive ? 'scale(1.3)' : 'scale(1)'
                        }}>
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

          {/* Flecha Derecha */}
          <button 
            onClick={() => scrollCarousel('right')}
            className="nav-arrow"
            style={{ flexShrink: 0, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '0.5rem' }}
          >
            <FaChevronRight size={20} />
          </button>
          </LayoutGroup>

          {/* Wrapper de enmascaramiento estático para la bola */}
          <div style={{
            position: 'absolute',
            left: 0, top: 0, right: 0, bottom: 0,
            pointerEvents: 'none',
            zIndex: 100,
            clipPath: `inset(0px ${carouselBounds.right}px 0px ${(selectedTech === "Todas" || isFlyingFromTodas) ? 0 : carouselBounds.left}px)`
          }}>
            {/* Indicador Global Flotante */}
            <motion.div
              key={fadeKey}
              initial={{ opacity: 0, x: indicatorX }}
              animate={{ x: indicatorX, opacity: indicatorVisible ? 1 : 0 }}
              onAnimationComplete={() => setIsFlyingFromTodas(false)}
              transition={{ 
                x: transitionType === "spring" 
                  ? { type: "spring", stiffness: 400, damping: 30 } 
                  : { type: "tween", duration: 0 },
                opacity: { duration: 0.2 } // Fade duration
              }}
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '-3px',
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--accent)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--accent)'
              }}
            />
          </div>

        </motion.div>

      </div>
      <style>{`
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
        .nav-arrow {
          transition: all 0.3s ease;
        }
        .nav-arrow:hover {
          color: white !important;
          transform: scale(1.2);
        }
        .dock-item:hover .icon-wrapper { 
          transform: scale(1.4) translateY(-5px) !important; 
          color: #fff !important; 
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
        .dock-item:hover .dock-tooltip { 
          opacity: 1; 
          transform: translateY(-5px); 
        }
      `}</style>
    </motion.div>
  );
}
