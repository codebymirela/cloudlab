import { Link } from "react-router";

export default function LearnPage() {
  return (
    <main className="page-container">
      <section className="page-header">
        <span className="eyebrow">
          LEARN
        </span>

        <h1>
          Escolha sua trilha
        </h1>

        <p>
          Desenvolva suas habilidades de Cloud
          passo a passo.
        </p>
      </section>

      <section className="learning-grid">
        <article className="learning-card">
          <div className="learning-icon">
            ☁
          </div>

          <h2>
            AWS Cloud
          </h2>

          <p>
            Compute, networking, storage,
            databases, security e arquitetura.
          </p>

          <Link
            to="/learn/aws"
            className="learning-button"
          >
            Começar
          </Link>
        </article>

        <article className="learning-card">
          <div className="learning-icon">
            HCL
          </div>

          <h2>
            Terraform
          </h2>

          <p>
            Infrastructure as Code, providers,
            resources, state e modules.
          </p>

          <button disabled>
            Em breve
          </button>
        </article>

        <article className="learning-card">
          <div className="learning-icon">
            $
          </div>

          <h2>
            Linux
          </h2>

          <p>
            Terminal, arquivos, processos,
            networking e troubleshooting.
          </p>

          <button disabled>
            Em breve
          </button>
        </article>
      </section>
    </main>
  );
}