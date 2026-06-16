import { SiTypescript, SiJavascript, SiJava, SiCplusplus, SiNodedotjs, SiReact, SiNextdotjs, SiAndroid, SiHtml5, SiExpress } from "react-icons/si";
import { FaCode } from "react-icons/fa";

const skillsData = [
  { name: "Todas", icon: FaCode },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Java", icon: SiJava },
  { name: "C++", icon: SiCplusplus },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Android", icon: SiAndroid },
  { name: "HTML", icon: SiHtml5 },
  { name: "Express", icon: SiExpress }
];

export default function Skills({ selectedTech, setSelectedTech }) {
  return (
    <section className="container" style={{ padding: '2rem 2rem' }}>
      <h2 className="section-title animate-up delay-1" style={{ marginBottom: '2rem' }}>Tecnologías Principales</h2>
      <div className="skills-container animate-up delay-2" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {skillsData.map(skill => {
          const Icon = skill.icon;
          const isActive = selectedTech === skill.name;
          return (
            <button 
              key={skill.name} 
              onClick={() => setSelectedTech(skill.name)}
              className={`glass skill-pill ${isActive ? 'active' : ''}`} 
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                color: isActive ? '#fff' : 'var(--text-main)',
                backgroundColor: isActive ? 'var(--accent)' : 'var(--card-bg)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: isActive ? '1px solid var(--accent)' : '1px solid var(--card-border)',
                cursor: 'pointer'
              }}
            >
              <Icon size={18} />
              {skill.name}
            </button>
          );
        })}
      </div>
      <style>{`
        .skill-pill {
          transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
          border-radius: 999px !important;
        }
        .skill-pill:hover {
          transform: translateY(-3px) scale(1.05);
          background-color: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-secondary);
        }
        .skill-pill.active:hover {
          background-color: var(--accent-hover);
          border-color: var(--accent-hover);
        }
      `}</style>
    </section>
  );
}
