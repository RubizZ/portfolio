"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.85]);
  const pointerEvents = useTransform(scrollY, [0, 400], ['auto', 'none']) as any;

  return (
    <motion.div 
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        scale,
        pointerEvents: 'none'
      }}
    >
      <motion.div className="container" style={{ textAlign: 'center', pointerEvents }}>
        <div className="hero-content">
          <h1 style={{ fontSize: '4.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Hola, soy <span style={{ color: 'var(--accent)' }}>Rubén Hidalgo</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Software Developer enfocado en crear soluciones eficientes, elegantes y centradas en resolver problemas reales.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://github.com/RubizZ" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FaGithub size={20} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/rub%C3%A9n-hidalgo-arias-96295134a" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <FaLinkedin size={20} /> LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
