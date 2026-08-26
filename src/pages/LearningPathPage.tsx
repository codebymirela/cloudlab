import {
  Link,
  useParams,
} from "react-router";

import {
  awsLearningPath,
} from "../data/awsLearningPath";

export default function LearningPathPage() {
  const { pathId } = useParams();

  if (pathId !== "aws") {
    return (
      <main className="page-container">
        <h1>
          Learning path not found.
        </h1>
      </main>
    );
  }

  const path = awsLearningPath;

  const totalLessons =
    path.modules.reduce(
      (total, module) =>
        total + module.lessons.length,
      0,
    );

  const totalXp =
    path.modules.reduce(
      (moduleTotal, module) =>
        moduleTotal +
        module.lessons.reduce(
          (lessonTotal, lesson) =>
            lessonTotal + lesson.xp,
          0,
        ),
      0,
    );

  return (
    <main className="learning-path-page">
      <section className="learning-path-hero">
        <Link
          to="/learn"
          className="back-link"
        >
          ← Trilhas
        </Link>

        <div className="path-title-row">
          <div className="path-main-icon">
            {path.icon}
          </div>

          <div>
            <span className="eyebrow">
              LEARNING PATH
            </span>

            <h1>
              {path.title}
            </h1>

            <p>
              {path.description}
            </p>
          </div>
        </div>

        <div className="path-summary">
          <div>
            <strong>
              {path.modules.length}
            </strong>

            <span>
              módulos
            </span>
          </div>

          <div>
            <strong>
              {totalLessons}
            </strong>

            <span>
              aulas
            </span>
          </div>

          <div>
            <strong>
              {totalXp}
            </strong>

            <span>
              XP disponível
            </span>
          </div>
        </div>
      </section>

      <section className="module-list">
        {path.modules.map(
          (module, index) => (
            <article
              key={module.id}
              className="module-card"
            >
              <div className="module-number">
                {index + 1}
              </div>

              <div className="module-content">
                <div className="module-heading">
                  <div className="module-icon">
                    {module.icon}
                  </div>

                  <div>
                    <span className="module-label">
                      MODULE {index + 1}
                    </span>

                    <h2>
                      {module.title}
                    </h2>
                  </div>
                </div>

                <p className="module-description">
                  {module.description}
                </p>

                <div className="lesson-preview-list">
                  {module.lessons.map(
                    (lesson, lessonIndex) => (
                      <Link
                        key={lesson.id}
                        to={`/learn/${path.id}/${module.id}/${lesson.id}`}
                        className="lesson-preview"
                      >
                        <div className="lesson-status">
                          {lessonIndex === 0
                            ? "▶"
                            : "○"}
                        </div>

                        <div className="lesson-preview-info">
                          <strong>
                            {lesson.title}
                          </strong>

                          <span>
                            {lesson.estimatedMinutes} min
                            {" · "}
                            {lesson.xp} XP
                          </span>
                        </div>
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </article>
          ),
        )}
      </section>
    </main>
  );
}