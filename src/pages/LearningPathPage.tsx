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
  findContinueLesson,
  flattenLearningPath,
  getLessonMaxXp,
  isLessonUnlocked,
} from "../utils/learningNavigation";

export default function LearningPathPage() {
  const {
    pathId,
  } = useParams();

  const {
    progress,
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

  const path =
    awsLearningPath;

  /*
   * Todas as aulas em ordem.
   */
  const flatLessons =
    flattenLearningPath(
      path,
    );

  const totalLessons =
    flatLessons.length;

  /*
   * Quantas aulas já foram
   * efetivamente finalizadas.
   */
  const completedLessons =
    flatLessons.filter(
      (item) =>
        Boolean(
          getLessonProgress(
            item.key,
          ),
        ),
    ).length;

  /*
   * Progresso baseado em aulas,
   * não em XP.
   */
  const pathProgress =
    totalLessons > 0
      ? Math.round(
          (
            completedLessons /
            totalLessons
          ) *
            100,
        )
      : 0;

  /*
   * XP máximo da trilha.
   */
  const totalXp =
    flatLessons.reduce(
      (
        total,
        item,
      ) =>
        total +
        getLessonMaxXp(
          item.lesson,
        ),
      0,
    );

  /*
   * XP já obtido nessa trilha.
   */
  const earnedPathXp =
    flatLessons.reduce(
      (
        total,
        item,
      ) => {
        const saved =
          getLessonProgress(
            item.key,
          );

        return (
          total +
          (
            saved?.earnedXp ??
            0
          )
        );
      },
      0,
    );

  /*
   * Próxima aula disponível.
   */
  const continueLesson =
    findContinueLesson(
      flatLessons,
      getLessonProgress,
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
              {
                path.description
              }
            </p>
          </div>

        </div>


        <div className="path-progress-card">

          <div className="path-progress-heading">

            <div>
              <strong>
                Seu progresso
              </strong>

              <span>
                {
                  completedLessons
                }{" "}
                de{" "}
                {
                  totalLessons
                }{" "}
                aulas concluídas
              </span>
            </div>

            <strong className="path-progress-percentage">
              {
                pathProgress
              }
              %
            </strong>

          </div>


          <div className="path-progress-track">

            <div
              className="path-progress-fill"
              style={{
                width:
                  `${pathProgress}%`,
              }}
            />

          </div>


          <div className="path-progress-xp">

            <span>
              ⭐ {
                earnedPathXp
              } XP obtidos
            </span>

            <span>
              {
                totalXp
              } XP disponíveis
            </span>

          </div>


          <div className="continue-learning-area">

            {continueLesson ? (
              <Link
                to={`/learn/${path.id}/${continueLesson.moduleId}/${continueLesson.lesson.id}`}
                className="continue-learning-button"
              >
                <span>
                  Continuar aprendendo
                </span>

                <strong>
                  {
                    continueLesson.lesson.title
                  }
                  {" →"}
                </strong>
              </Link>
            ) : (
              <div className="path-completed-message">
                <span>
                  🏆
                </span>

                <div>
                  <strong>
                    Trilha concluída!
                  </strong>

                  <small>
                    Você completou todas
                    as aulas disponíveis.
                  </small>
                </div>
              </div>
            )}

          </div>

        </div>


        <div className="path-summary">

          <div>
            <strong>
              {
                path.modules.length
              }
            </strong>

            <span>
              módulos
            </span>
          </div>

          <div>
            <strong>
              {
                totalLessons
              }
            </strong>

            <span>
              aulas
            </span>
          </div>

          <div>
            <strong>
              {
                progress.totalXp
              }
            </strong>

            <span>
              XP total
            </span>
          </div>

        </div>

      </section>


      <section className="module-list">

        {path.modules.map(
          (
            module,
            moduleIndex,
          ) => {

            /*
             * Progresso do módulo baseado
             * em aulas concluídas.
             */
            const moduleCompleted =
              module.lessons.filter(
                (lesson) => {
                  const item =
                    flatLessons.find(
                      (current) =>
                        current.moduleId ===
                          module.id &&
                        current.lesson.id ===
                          lesson.id,
                    );

                  if (!item) {
                    return false;
                  }

                  return Boolean(
                    getLessonProgress(
                      item.key,
                    ),
                  );
                },
              ).length;

            const moduleProgress =
              module.lessons.length >
              0
                ? Math.round(
                    (
                      moduleCompleted /
                      module.lessons.length
                    ) *
                      100,
                  )
                : 0;

            return (
              <article
                key={
                  module.id
                }
                className="module-card"
              >

                <div className="module-number">
                  {
                    moduleIndex +
                    1
                  }
                </div>


                <div className="module-content">

                  <div className="module-heading">

                    <div className="module-icon">
                      {
                        module.icon
                      }
                    </div>

                    <div className="module-title-area">

                      <span className="module-label">
                        MODULE{" "}
                        {
                          moduleIndex +
                          1
                        }
                      </span>

                      <h2>
                        {
                          module.title
                        }
                      </h2>

                    </div>

                    <div className="module-progress-value">
                      {
                        moduleProgress
                      }
                      %
                    </div>

                  </div>


                  <p className="module-description">
                    {
                      module.description
                    }
                  </p>


                  <div className="module-progress-track">

                    <div
                      className="module-progress-fill"
                      style={{
                        width:
                          `${moduleProgress}%`,
                      }}
                    />

                  </div>


                  <div className="lesson-preview-list">

                    {
                      module.lessons.map(
                        (
                          lesson,
                        ) => {

                          const flatIndex =
                            flatLessons.findIndex(
                              (item) =>
                                item.moduleId ===
                                  module.id &&
                                item.lesson.id ===
                                  lesson.id,
                            );

                          const item =
                            flatLessons[
                              flatIndex
                            ];

                          if (!item) {
                            return null;
                          }

                          const lessonProgress =
                            getLessonProgress(
                              item.key,
                            );

                          const completed =
                            Boolean(
                              lessonProgress,
                            );

                          const unlocked =
                            isLessonUnlocked(
                              flatLessons,
                              flatIndex,
                              getLessonProgress,
                            );

                          /*
                           * Aula bloqueada.
                           */
                          if (!unlocked) {
                            return (
                              <div
                                key={
                                  lesson.id
                                }
                                className="lesson-preview lesson-locked"
                              >

                                <div className="lesson-status locked">
                                  🔒
                                </div>

                                <div className="lesson-preview-info">

                                  <strong>
                                    {
                                      lesson.title
                                    }
                                  </strong>

                                  <span>
                                    {
                                      lesson.estimatedMinutes
                                    }{" "}
                                    min
                                    {" · "}
                                    {
                                      getLessonMaxXp(
                                        lesson,
                                      )
                                    }{" "}
                                    XP
                                  </span>

                                </div>

                                <span className="lesson-locked-label">
                                  Bloqueada
                                </span>

                              </div>
                            );
                          }

                          /*
                           * Aula desbloqueada.
                           */
                          return (
                            <Link
                              key={
                                lesson.id
                              }
                              to={`/learn/${path.id}/${module.id}/${lesson.id}`}
                              className={
                                completed
                                  ? "lesson-preview lesson-completed"
                                  : "lesson-preview lesson-current"
                              }
                            >

                              <div
                                className={
                                  completed
                                    ? "lesson-status completed"
                                    : "lesson-status current"
                                }
                              >
                                {
                                  completed
                                    ? "✓"
                                    : "▶"
                                }
                              </div>


                              <div className="lesson-preview-info">

                                <strong>
                                  {
                                    lesson.title
                                  }
                                </strong>

                                <span>
                                  {
                                    lesson.estimatedMinutes
                                  }{" "}
                                  min
                                  {" · "}
                                  {
                                    getLessonMaxXp(
                                      lesson,
                                    )
                                  }{" "}
                                  XP
                                </span>

                              </div>


                              {completed && (
                                <span className="lesson-score-label">
                                  {
                                    lessonProgress?.percentage
                                  }
                                  %
                                </span>
                              )}


                              {!completed && (
                                <span className="lesson-current-label">
                                  Disponível
                                </span>
                              )}

                            </Link>
                          );
                        },
                      )
                    }

                  </div>

                </div>

              </article>
            );
          },
        )}

      </section>

    </main>
  );
}