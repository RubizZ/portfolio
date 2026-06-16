const projects = [
  {
    name: "flAIghts",
    description: "Aplicación web que calcula la ruta aérea óptima desde un origen a un destino.",
    tech: ["TypeScript", "Next.js"],
    url: "https://github.com/RubizZ/flAIghts"
  },
  {
    name: "CollabUp",
    description: "Aplicación de Android para organizar eventos y tareas compartidas con amigos o familia.",
    tech: ["Android", "Java/Kotlin"],
    url: "https://github.com/RubizZ/CollabUp"
  },
  {
    name: "VHUB",
    description: "Plataforma enfocada en gestión y organización, demostrando habilidades de integración de sistemas.",
    tech: ["Web", "Fullstack"],
    url: "https://github.com/RubizZ/VHUB"
  },
  {
    name: "Trendy",
    description: "Aplicación de escritorio sobre una tienda de ropa aplicando ingeniería del software.",
    tech: ["Java", "Desktop"],
    url: "https://github.com/RubizZ/Trendy"
  },
  {
    name: "typed-express-pipeline",
    description: "Librería Node.js para facilitar el tipado y encadenamiento de middleware en Express.",
    tech: ["TypeScript", "Node.js", "Express"],
    url: "https://github.com/RubizZ/typed-express-pipeline"
  },
  {
    name: "ArenaOfMusic",
    description: "Aplicación web multijugador sobre adivinar canciones escuchando un tiempo limitado.",
    tech: ["HTML", "JS", "WebSockets"],
    url: "https://github.com/RubizZ/ArenaOfMusic"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="container">
      <h2 className="section-title animate-up delay-1">Proyectos Destacados</h2>
      <div className="projects-grid animate-up delay-2" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {projects.map((project, index) => (
          <a key={index} href={project.url} target="_blank" rel="noopener noreferrer" className="glass project-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {project.name}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem', flexGrow: 1 }}>{project.description}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--accent)',
                  fontWeight: '500'
                }}>{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
      <style>{`
        .project-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
        }
        .project-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </section>
  );
}
