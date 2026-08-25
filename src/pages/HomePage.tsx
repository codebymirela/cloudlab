import { Link } from "react-router";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="hero">
        <span className="hero-badge">
          LEARN • BUILD • PRACTICE
        </span>

        <h1>
          Learn Cloud by building it.
        </h1>

        <p>
          Aprenda AWS, Terraform e Cloud Engineering
          através de lições interativas, desafios práticos
          e arquiteturas visuais.
        </p>
      </section>

      <section className="mode-grid">
        <Link
          to="/learn"
          className="mode-card"
        >
          <div className="mode-icon">
            ☁
          </div>

          <div>
            <span className="mode-label">
              LEARN
            </span>

            <h2>
              Aprender
            </h2>

            <p>
              Lições curtas, exercícios, troubleshooting,
              desafios e trilhas de aprendizado.
            </p>
          </div>

          <span className="mode-link">
            Começar a aprender →
          </span>
        </Link>

        <Link
          to="/build"
          className="mode-card"
        >
          <div className="mode-icon">
            ◇
          </div>

          <div>
            <span className="mode-label">
              BUILD
            </span>

            <h2>
              Cloud Studio
            </h2>

            <p>
              Monte arquiteturas AWS visualmente,
              analise configurações e desenvolva projetos.
            </p>
          </div>

          <span className="mode-link">
            Começar a construir →
          </span>
        </Link>
      </section>
    </main>
  );
}