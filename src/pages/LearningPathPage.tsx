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

export default function LearningPathPage() {
  const {
    pathId,
  } = useParams();

  const {
    progress,
    getLessonProgress,
  } = useProgress();

  /*
   * Por enquanto temos somente
   * a trilha AWS implementada.
   */
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
   * Retorna o XP máximo de uma aula.
   *
   * Se existirem exercícios,
   * calculamos usando o XP real deles.
   *
   * Caso ainda não existam exercícios,
   * utilizamos lesson.xp.
   */
  function getLessonMaxXp(
    lesson:
      (typeof path.modules)[number]["lessons"][number],
  ) {
    const exerciseXp =
      lesson.exercises.reduce(
        (
          total,
          exercise,
        ) =>
          total +
          exercise.xp,
        0,
      );

    return exerciseXp > 0
      ? exerciseXp
      : lesson.xp;
  }

  /*
   * Quantidade total de aulas.
   */
  const totalLessons =
    path.modules.reduce(
      (
        total,
        module,
      ) =>
        total +
        module.lessons.length,
      0,
    );

  /*
   * XP máximo possível
   * em toda a trilha.
   */
  const totalXp =
    path.modules.reduce(
      (
        moduleTotal,
        module,
      ) =>
        moduleTotal +
        module.lessons.reduce(
          (
            lessonTotal,
            lesson,
          ) =>
            lessonTotal +
            getLessonMaxXp(
              lesson,
            ),
          0,
        ),
      0,
    );

  /*
   * XP obtido somente
   * nesta trilha.
   */
  const earnedPathXp =
    path.modules.reduce(
      (
        moduleTotal,
        module,
      ) =>
        moduleTotal +
        module.lessons.reduce(
          (
            lessonTotal,
            lesson,
          ) => {
            const lessonKey =
              `${path.id}:${module.id}:${lesson.id}`;

            const saved =
              getLessonProgress(
                lessonKey,
              );

            return (
              lessonTotal +
              (
                saved?.earnedXp ??
                0
              )
            );
          },
          0,
        ),
      0,
    );

  /*
   * Percentual geral.
   */
  const pathProgress =
    totalXp > 0
      ? Math.min(
          100,
          Math.round(
            (
              earnedPathXp /
              totalXp
            ) *
              100,
          ),
        )
      : 0;

  /*
   * Número de aulas com
   * desempenho de 100%.
   */
  const completedLessons =
    path.modules.reduce(
      (
        total,
        module,
      ) =>
        total +
        module.lessons.filter(
          (lesson) => {
            const lessonKey =
              `${path.id}:${module.id}:${lesson.id}`;

            return (
              getLessonProgress(
                lessonKey,
              )?.percentage ===
              100
            );
          },
        ).length,
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
             * XP máximo do módulo.
             */
            const moduleMaxXp =
              module.lessons.reduce(
                (
                  total,
                  lesson,
                ) =>
                  total +
                  getLessonMaxXp(
                    lesson,
                  ),
                0,
              );

            /*
             * XP já conquistado
             * no módulo.
             */
            const moduleEarnedXp =
              module.lessons.reduce(
                (
                  total,
                  lesson,
                ) => {
                  const lessonKey =
                    `${path.id}:${module.id}:${lesson.id}`;

                  const saved =
                    getLessonProgress(
                      lessonKey,
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

            const moduleProgress =
              moduleMaxXp > 0
                ? Math.min(
                    100,
                    Math.round(
                      (
                        moduleEarnedXp /
                        moduleMaxXp
                      ) *
                        100,
                    ),
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

                          const lessonKey =
                            `${path.id}:${module.id}:${lesson.id}`;

                          const lessonProgress =
                            getLessonProgress(
                              lessonKey,
                            );

                          const percentage =
                            lessonProgress?.percentage ??
                            0;

                          const completed =
                            percentage ===
                            100;

                          const started =
                            percentage >
                            0;

                          return (
                            <Link
                              key={
                                lesson.id
                              }
                              to={`/learn/${path.id}/${module.id}/${lesson.id}`}
                              className={
                                completed
                                  ? "lesson-preview lesson-completed"
                                  : "lesson-preview"
                              }
                            >

                              <div
                                className={
                                  completed
                                    ? "lesson-status completed"
                                    : started
                                      ? "lesson-status started"
                                      : "lesson-status"
                                }
                              >
                                {
                                  completed
                                    ? "✓"
                                    : started
                                      ? `${percentage}%`
                                      : "○"
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


                              {
                                completed && (
                                  <span className="lesson-complete-label">
                                    Concluída
                                  </span>
                                )
                              }

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