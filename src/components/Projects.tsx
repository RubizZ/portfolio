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
    <section id="projects" style={{ position: 'relative', zIndex: 30, marginTop: '-300px' }}>
      <div className="projects-scroll-container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40vh',
        paddingBottom: '30vh'
      }}>
        {filteredProjects.map((project, index) => (
          <div key={project.name} className="project-sticky-wrapper" style={{
            position: 'sticky',
            top: '35vh',
            zIndex: 30 + index,
            height: 'fit-content'
          }}>
            <div className="minimal-card animate-up delay-2" style={{ 
              padding: '4rem', 
              width: '100%',
              maxWidth: '900px',
              margin: '0 auto',
              backgroundColor: 'rgba(10, 10, 15, 0.95)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0 -30px 60px rgba(0,0,0,0.7)',
              borderRadius: '32px',
              border: '1px solid rgba(255,255,255,0.03)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem'
            }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '3.5rem', fontWeight: 200, letterSpacing: '-1px', color: '#fff', margin: 0 }}>
                  {project.name}
                </h3>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="github-link">
                  <FaGithub size={36} />
                </a>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.35rem', lineHeight: '1.7', fontWeight: 300, maxWidth: '650px', margin: 0 }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                    backgroundColor: 'rgba(255,255,255,0.02)'
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
      <style>{`
        .github-link {
          color: rgba(255,255,255,0.3); 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .github-link:hover {
          color: #fff; 
          transform: scale(1.15) rotate(5deg);
        }
        .minimal-card {
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .minimal-card:hover {
          transform: translateY(-8px);
        }
      `}</style>
    </section>
  );
}
