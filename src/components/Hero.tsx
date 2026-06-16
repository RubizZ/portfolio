import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <div style={{ position: 'relative', height: '150vh' }}>
      <section style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 10, 
        height: '100vh', 
        backgroundColor: 'var(--bg-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="container" style={{ width: '100%', textAlign: 'center' }}>
          <div className="hero-content animate-up delay-1">
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
              <a href="https://linkedin.com/in/ruben" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <FaLinkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
