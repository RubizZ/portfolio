"use client";

import { SiTypescript, SiJavascript, SiCplusplus, SiNodedotjs, SiReact, SiNextdotjs, SiAndroid, SiHtml5, SiExpress } from "react-icons/si";
import { FaCode, FaJava } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";

const skillsData = [
  { name: "Todas", icon: FaCode },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Java", icon: FaJava },
  { name: "C++", icon: SiCplusplus },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Android", icon: SiAndroid },
  { name: "HTML", icon: SiHtml5 },
  { name: "Express", icon: SiExpress }
];

interface SkillsProps {
  selectedTech: string;
  setSelectedTech: (tech: string) => void;
}

export default function Skills({ selectedTech, setSelectedTech }: SkillsProps) {
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [1400, 2050], [0, 1]);
  const dockY = useTransform(scrollY, [1400, 2050], ['-20vh', '0vh']);
  const pointerEvents = useTransform(scrollY, [1400, 2050], ['none', 'auto']) as any;

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
      pointerEvents: 'none'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div 
          className="dock-container" 
          style={{
            pointerEvents,
            display: 'flex',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            y: dockY
          }}
        >
          {skillsData.map(skill => {
            const Icon = skill.icon;
            const isActive = selectedTech === skill.name;
            return (
              <div 
                key={skill.name} 
                onClick={() => setSelectedTech(skill.name)}
                className="dock-item"
                style={{
                  position: 'relative',
                  padding: '1rem',
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
                  <Icon size={32} />
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="dock-indicator" 
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      width: '6px',
                      height: '6px',
                      backgroundColor: 'var(--accent)',
                      borderRadius: '50%',
                      boxShadow: '0 0 10px var(--accent)'
                    }} 
                  />
                )}
                <div className="dock-tooltip">{skill.name}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
      <style>{`
        .dock-item:hover .icon-wrapper { 
          transform: scale(1.5) translateY(-8px) !important; 
          color: #fff !important; 
        }
        .dock-tooltip {
          position: absolute; 
          top: -40px; 
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
        }
        .dock-item:hover .dock-tooltip { 
          opacity: 1; 
          transform: translateY(-5px); 
        }
      `}</style>
    </motion.div>
  );
}
