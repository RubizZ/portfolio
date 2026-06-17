"use client";

import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.85]);
  const pointerEvents = useTransform(
    scrollY,
    [0, 400],
    ["auto", "none"],
  ) as any;
  const arrowOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const arrowPointerEvents = useTransform(
    scrollY,
    [0, 100],
    ["auto", "none"],
  ) as any;

  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity,
          scale,
          pointerEvents: "none",
        }}
      >
        <motion.div
          className="container"
          style={{ textAlign: "center", pointerEvents }}
        >
          <div className="hero-content">
            <h1
              style={{
                fontSize: "4.5rem",
                fontWeight: "800",
                marginBottom: "1.5rem",
                lineHeight: "1.1",
              }}
            >
              Hola, soy{" "}
              <span style={{ color: "var(--accent)" }}>Rubén Hidalgo</span>
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "var(--text-muted)",
                maxWidth: "600px",
                margin: "0 auto 3rem",
              }}
            >
              Software Engineer enfocado en crear soluciones eficientes,
              elegantes y centradas en resolver problemas reales.
            </p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <a
                href="https://github.com/RubizZ"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FaGithub size={20} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/rub%C3%A9n-hidalgo-arias-96295134a"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <FaLinkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
        style={{
          position: "absolute",
          bottom: "8vh",
          left: "50%",
          x: "-50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: arrowOpacity,
          pointerEvents: arrowPointerEvents,
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        <span
          style={{
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Conocimientos
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </>
  );
}
