import { FaGithub } from "react-icons/fa";

const projectsData = [
  {
    name: "flAIghts",
    description: "Aplicación web que calcula la ruta aérea óptima desde un origen a un destino.",
    tech: ["TypeScript", "Next.js", "React"],
    url: "https://github.com/RubizZ/flAIghts"
  },
  {
    name: "CollabUp",
    description: "Aplicación de Android para organizar eventos y tareas compartidas con amigos o familia.",
    tech: ["Android", "Java"],
    url: "https://github.com/RubizZ/CollabUp"
  },
  {
    name: "VHUB",
    description: "Plataforma enfocada en gestión y organización, demostrando habilidades de integración de sistemas.",
    tech: ["TypeScript", "Node.js"],
    url: "https://github.com/RubizZ/VHUB"
  },
  {
    name: "Trendy",
    description: "Aplicación de escritorio sobre una tienda de ropa aplicando ingeniería del software.",
    tech: ["Java"],
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
    tech: ["HTML", "JavaScript"],
    url: "https://github.com/RubizZ/ArenaOfMusic"
  }
];

interface ProjectsProps {
  selectedTech: string;
}

export default function Projects({ selectedTech }: ProjectsProps) {
  const filteredProjects = selectedTech === "Todas" 
    ? projectsData 
    : projectsData.filter(p => p.tech.includes(selectedTech));

  return (
    <section id="projects" style={{ position: 'relative', zIndex: 30, marginTop: '-55vh' }}>
      <div className="projects-scroll-container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '60vh',
        paddingBottom: '30vh'
      }}>
        {filteredProjects.map((project, index) => (
          <div key={project.name} className="project-sticky-wrapper" style={{
            position: 'sticky',
            top: '32vh',
            zIndex: 30 + index,
            height: 'fit-content'
          }}>
            <div className="glass animate-up delay-2" style={{ 
              padding: '3rem', 
              display: 'flex', 
              flexDirection: 'column', 
              width: '100%',
              maxWidth: '850px',
              margin: '0 auto',
              backgroundColor: 'var(--bg-color)',
              boxShadow: '0 -20px 50px rgba(0,0,0,0.8)',
              borderTop: '1px solid var(--card-border)',
              borderRadius: '24px',
              borderLeft: '1px solid var(--card-border)',
              borderRight: '1px solid var(--card-border)'
            }}>
               <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {project.name}
                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.8, color: 'var(--text-main)', transition: 'opacity 0.2s' }}>
                  <FaGithub size={32} />
                </a>
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.25rem', flexGrow: 1, lineHeight: '1.8' }}>{project.description}</p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    fontSize: '1rem',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    color: 'var(--accent)',
                    fontWeight: '600'
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '4rem' }}>
              Aún no hay proyectos públicos con esta tecnología.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
