export default function Hero() {
  return (
    <section className="container">
      <div className="hero-content animate-up delay-1" style={{ textAlign: 'center', padding: '8rem 0 4rem' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
          Hola, soy <span style={{ color: 'var(--accent)' }}>RubizZ</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Software Developer enfocado en crear soluciones eficientes, elegantes y centradas en resolver problemas reales.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="https://github.com/RubizZ" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            GitHub
          </a>
          <a href="https://linkedin.com/in/ruben" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
