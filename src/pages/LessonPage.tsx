import {
  Link,
  useParams,
} from "react-router";

import {
  awsLearningPath,
} from "../data/awsLearningPath";

export default function LessonPage() {
  const {
    pathId,
    moduleId,
    lessonId,
  } = useParams();

  if (pathId !== "aws") {
    return (
      <main className="page-container">
        <h1>
          Learning path not found.
        </h1>
      </main>
    );
  }

  const learningModule =
    awsLearningPath.modules.find(
      (module) =>
        module.id === moduleId,
    );

  if (!learningModule) {
    return (
      <main className="page-container">
        <h1>
          Module not found.
        </h1>
      </main>
    );
  }

  const lesson =
    learningModule.lessons.find(
      (currentLesson) =>
        currentLesson.id === lessonId,
    );

  if (!lesson) {
    return (
      <main className="page-container">
        <h1>
          Lesson not found.
        </h1>
      </main>
    );
  }

  return (
    <main className="lesson-page">
      <aside className="lesson-sidebar">
        <Link
          to={`/learn/${pathId}`}
          className="back-link"
        >
          ← AWS Cloud
        </Link>

        <span className="eyebrow">
          {learningModule.title}
        </span>

        <h2>
          {lesson.title}
        </h2>

        <div className="lesson-meta">
          <span>
            {lesson.estimatedMinutes} min
          </span>

          <span>
            {lesson.xp} XP
          </span>
        </div>
      </aside>

      <article className="lesson-content">
        <header className="lesson-header">
          <span className="eyebrow">
            LESSON
          </span>

          <h1>
            {lesson.title}
          </h1>

          <p>
            {lesson.description}
          </p>
        </header>

        {lesson.content.length > 0 ? (
          <div className="lesson-sections">
            {lesson.content.map(
              (section) => (
                <section
                  key={section.id}
                  className="lesson-section"
                >
                  {section.title && (
                    <h2>
                      {section.title}
                    </h2>
                  )}

                  <p>
                    {section.content}
                  </p>
                </section>
              ),
            )}
          </div>
        ) : (
          <div className="lesson-empty">
            <span className="eyebrow">
              CONTENT IN PROGRESS
            </span>

            <h2>
              Esta aula ainda está sendo preparada.
            </h2>

            <p>
              O conteúdo desta aula será adicionado
              nas próximas etapas do projeto.
            </p>
          </div>
        )}

        {lesson.content.length > 0 && (
          <footer className="lesson-footer">
            <div>
              <span className="eyebrow">
                LESSON COMPLETE
              </span>

              <h2>
                Pronta para praticar?
              </h2>

              <p>
                Na próxima etapa adicionaremos
                exercícios relacionados a esta aula.
              </p>
            </div>

            <button
              type="button"
              className="primary-button"
            >
              Praticar →
            </button>
          </footer>
        )}
      </article>
    </main>
  );
}