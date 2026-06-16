import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main style={{ paddingBottom: '4rem' }}>
      <Hero />
      <Skills />
      <Projects />
      <footer style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)', marginTop: '6rem', borderTop: '1px solid var(--card-border)' }}>
        <p style={{ marginBottom: '1rem' }}>© {new Date().getFullYear()} RubizZ. Construido con Next.js</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <a href="https://github.com/RubizZ" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>GitHub</a>
          <a href="https://linkedin.com/in/ruben" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}
