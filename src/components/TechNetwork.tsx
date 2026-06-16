"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { SiTypescript, SiNodedotjs, SiReact, SiNextdotjs } from "react-icons/si";
import { FaJava, FaChevronDown } from "react-icons/fa";

export default function TechNetwork() {
  const { scrollY } = useScroll();
  
  const nodesOpacity = useTransform(scrollY, [400, 600, 1200, 1400], [0, 1, 1, 0]);
  const nodesY = useTransform(scrollY, [400, 600], [40, 0]);
  const nodesScale = useTransform(scrollY, [400, 600], [0.85, 1]);
  const linesOpacity = useTransform(scrollY, [600, 800, 1200, 1400], [0, 0.4, 0.4, 0]);
  const arrowOpacity = useTransform(scrollY, [400, 600, 800, 1000], [0, 1, 1, 0]);
  const arrowPointerEvents = useTransform(scrollY, [400, 600, 800, 1000], ['none', 'auto', 'auto', 'none']) as any;

  const nodes = [
    { id: 1, icon: SiReact, x: 20, y: 30, color: '#61DAFB', name: "React" },
    { id: 2, icon: SiTypescript, x: 80, y: 25, color: '#3178C6', name: "TypeScript" },
    { id: 3, icon: SiNodedotjs, x: 50, y: 50, color: '#339933', name: "Node.js" },
    { id: 4, icon: FaJava, x: 30, y: 70, color: '#007396', name: "Java" },
    { id: 5, icon: SiNextdotjs, x: 70, y: 75, color: '#ffffff', name: "Next.js" },
  ];

  const connections = [
    [0, 2], [1, 2], [2, 3], [2, 4], [0, 3], [1, 4]
  ];

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
      pointerEvents: 'none', zIndex: 15,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <motion.h2 style={{
        position: 'absolute',
        top: '10vh',
        width: '100%',
        textAlign: 'center',
        fontSize: '3rem',
        fontWeight: 300,
        letterSpacing: '4px',
        color: 'var(--text-main)',
        opacity: nodesOpacity,
        y: nodesY,
        zIndex: 20
      }}>
        TECNOLOGÍAS PRINCIPALES
      </motion.h2>

      <motion.svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: linesOpacity }}>
        {connections.map((conn, idx) => {
          const n1 = nodes[conn[0]];
          const n2 = nodes[conn[1]];
          return (
            <line 
              key={idx}
              x1={`${n1.x}%`} y1={`${n1.y}%`}
              x2={`${n2.x}%`} y2={`${n2.y}%`}
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          );
        })}
      </motion.svg>

      <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: nodesOpacity, y: nodesY, scale: nodesScale }}>
        {nodes.map(node => {
          const Icon = node.icon;
          return (
            <div key={node.id} style={{
              position: 'absolute',
              top: `${node.y}%`,
              left: `${node.x}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.8rem'
            }}>
              <div style={{
                width: '70px', height: '70px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 30px ${node.color}44`,
                color: node.color
              }}>
                <Icon size={36} />
              </div>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', fontWeight: 300 }}>
                {node.name}
              </span>
            </div>
          );
        })}
      </motion.div>

      <motion.div 
        onClick={() => window.scrollTo({ top: 2050, behavior: 'smooth' })}
        style={{
          position: 'absolute',
          bottom: '8vh',
          left: '50%',
          x: '-50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: arrowOpacity,
          pointerEvents: arrowPointerEvents,
          cursor: 'pointer',
          zIndex: 50
        }}
      >
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Proyectos</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </div>
  );
}
