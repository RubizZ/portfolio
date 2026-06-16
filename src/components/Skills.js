const skills = ["TypeScript", "JavaScript", "Java", "C++", "Node.js", "React", "Next.js", "Android"];

export default function Skills() {
  return (
    <section className="container">
      <h2 className="section-title animate-up delay-1">Tecnologías Principales</h2>
      <div className="skills-container animate-up delay-2" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        justifyContent: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {skills.map(skill => (
          <div key={skill} className="glass skill-pill" style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {skill}
          </div>
        ))}
      </div>
      <style>{`
        .skill-pill {
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .skill-pill:hover {
          transform: translateY(-3px) scale(1.05);
          background-color: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-secondary);
        }
      `}</style>
    </section>
  );
}
