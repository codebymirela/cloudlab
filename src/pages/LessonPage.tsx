import {
  Link,
  useParams,
} from "react-router";

import {
  awsLearningPath,
} from "../data/awsLearningPath";

import {
  useProgress,
} from "../hooks/useProgress";

import {
  flattenLearningPath,
  isLessonUnlocked,
} from "../utils/learningNavigation";

export default function LessonPage() {
  const {
    pathId,
    moduleId,
    lessonId,
  } = useParams();

  const {
    getLessonProgress,
  } = useProgress();

  if (
    pathId !==
    awsLearningPath.id
  ) {
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
        currentLesson.id ===
        lessonId,
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

  /*
   * Verifica se a aula pode
   * realmente ser acessada.
   */
  const flatLessons =
    flattenLearningPath(
      awsLearningPath,
    );

  const lessonIndex =
    flatLessons.findIndex(
      (item) =>
        item.moduleId ===
          learningModule.id &&
        item.lesson.id ===
          lesson.id,
    );

  const unlocked =
    isLessonUnlocked(
      flatLessons,
      lessonIndex,
      getLessonProgress,
    );

  /*
   * Proteção contra acesso direto
   * pela URL.
   */
  if (!unlocked) {
    return (
      <main className="locked-lesson-page">

        <section className="locked-lesson-card">

          <div className="locked-icon">
            🔒
          </div>

          <span className="eyebrow">
            LESSON LOCKED
          </span>

          <h1>
            Esta aula ainda está bloqueada
          </h1>

          <p>
            Conclua a aula anterior para
            continuar avançando nesta
            trilha.
          </p>

          <Link
            to={`/learn/${awsLearningPath.id}`}
            className="primary-button"
          >
            Voltar para trilha
          </Link>

        </section>

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
          {
            learningModule.title
          }
        </span>

        <h2>
          {
            lesson.title
          }
        </h2>

        <div className="lesson-meta">

          <span>
            {
              lesson.estimatedMinutes
            }{" "}
            min
          </span>

          <span>
            {
              lesson.xp
            }{" "}
            XP
          </span>

        </div>

      </aside>


      <article className="lesson-content">

        <header className="lesson-header">

          <span className="eyebrow">
            LESSON
          </span>

          <h1>
            {
              lesson.title
            }
          </h1>

          <p>
            {
              lesson.description
            }
          </p>

        </header>


        {lesson.content.length > 0 ? (
          <div className="lesson-sections">

            {lesson.content.map(
              (section) => (

                <section
                  key={
                    section.id
                  }
                  className="lesson-section"
                >

                  {section.title && (
                    <h2>
                      {
                        section.title
                      }
                    </h2>
                  )}

                  <p>
                    {
                      section.content
                    }
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
              Esta aula ainda está
              sendo preparada.
            </h2>

            <p>
              O conteúdo desta aula será
              adicionado nas próximas
              etapas do projeto.
            </p>

          </div>
        )}


        {lesson.content.length >
          0 && (
          <footer className="lesson-footer">

            <div>
              <span className="eyebrow">
                LESSON COMPLETE
              </span>

              <h2>
                Pronta para praticar?
              </h2>

              <p>
                Termine os exercícios para
                desbloquear a próxima aula.
              </p>
            </div>

            <Link
              to={`/learn/${pathId}/${moduleId}/${lessonId}/practice`}
              className="primary-button"
            >
              Praticar →
            </Link>

          </footer>
        )}

      </article>

    </main>
  );
}