import {
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router";

import MultipleChoiceExercise
  from "../components/exercises/MultipleChoiceExercise";

import {
  awsLearningPath,
} from "../data/awsLearningPath";

import {
  useProgress,
} from "../hooks/useProgress";

export default function PracticePage() {
  const {
    pathId,
    moduleId,
    lessonId,
  } = useParams();

  const {
    completeLesson,
    getLessonProgress,
  } = useProgress();

  const [
    currentExerciseIndex,
    setCurrentExerciseIndex,
  ] = useState(0);

  const [
    earnedXp,
    setEarnedXp,
  ] = useState(0);

  const [
    completed,
    setCompleted,
  ] = useState(false);

  const [
    xpAdded,
    setXpAdded,
  ] = useState(0);

  const [
    finalAttemptXp,
    setFinalAttemptXp,
  ] = useState(0);

  const [
    finalPercentage,
    setFinalPercentage,
  ] = useState(0);

  const [
    bestPercentage,
    setBestPercentage,
  ] = useState(0);

  const [
    attemptNumber,
    setAttemptNumber,
  ] = useState(0);

  const [
    isNewBest,
    setIsNewBest,
  ] = useState(false);

  /*
   * Learning path.
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

  /*
   * Módulo.
   */
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

  /*
   * Aula.
   */
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

  const lessonKey =
    `${awsLearningPath.id}:${learningModule.id}:${lesson.id}`;

  const previousProgress =
    getLessonProgress(
      lessonKey,
    );

  /*
   * Sem exercícios.
   */
  if (
    lesson.exercises.length ===
    0
  ) {
    return (
      <main className="practice-page">
        <div className="practice-empty">
          <span className="eyebrow">
            PRACTICE
          </span>

          <h1>
            Exercícios em breve
          </h1>

          <p>
            Esta aula ainda não possui
            exercícios cadastrados.
          </p>

          <Link
            to={`/learn/${awsLearningPath.id}/${learningModule.id}/${lesson.id}`}
            className="primary-button"
          >
            ← Voltar para aula
          </Link>
        </div>
      </main>
    );
  }

  const totalExercises =
    lesson.exercises.length;

  /*
   * XP máximo calculado diretamente
   * pelas questões.
   */
  const maxExerciseXp =
    lesson.exercises.reduce(
      (
        total,
        exercise,
      ) =>
        total +
        exercise.xp,
      0,
    );

  const currentExercise =
    lesson.exercises[
      currentExerciseIndex
    ];

  if (!currentExercise) {
    return (
      <main className="practice-page">
        <div className="practice-empty">
          <span className="eyebrow">
            PRACTICE ERROR
          </span>

          <h1>
            Exercício não encontrado
          </h1>

          <p>
            Não foi possível carregar
            esta questão.
          </p>

          <Link
            to={`/learn/${awsLearningPath.id}`}
            className="primary-button"
          >
            Voltar para trilha
          </Link>
        </div>
      </main>
    );
  }

  /*
   * Barra de progresso da tentativa.
   */
  const progressPercentage =
    completed
      ? 100
      : Math.min(
          100,
          Math.max(
            0,
            (
              currentExerciseIndex /
              totalExercises
            ) * 100,
          ),
        );

  /*
   * Finalização de cada questão.
   */
  function handleNext(
    questionXp: number,
  ) {
    const updatedXp =
      earnedXp +
      questionXp;

    setEarnedXp(
      updatedXp,
    );

    const isLastExercise =
      currentExerciseIndex ===
      totalExercises - 1;

    /*
     * Próxima questão.
     */
    if (!isLastExercise) {
      setCurrentExerciseIndex(
        (current) =>
          current + 1,
      );

      return;
    }

    /*
     * Última questão.
     */
    const result =
      completeLesson({
        lessonKey,

        earnedXp:
          updatedXp,

        maxXp:
          maxExerciseXp,
      });

    setFinalAttemptXp(
      updatedXp,
    );

    setFinalPercentage(
      result.attemptPercentage,
    );

    setBestPercentage(
      result.bestPercentage,
    );

    setAttemptNumber(
      result.attempts,
    );

    setIsNewBest(
      result.newBest,
    );

    setXpAdded(
      result.xpAdded,
    );

    setCompleted(
      true,
    );
  }

  /*
   * Resultado final.
   */
  if (completed) {
    return (
      <main className="practice-page">
        <section className="practice-result">

          <div className="result-icon">
            {isNewBest
              ? "🏆"
              : "🎉"}
          </div>

          <span className="eyebrow">
            PRACTICE COMPLETE
          </span>

          <h1>
            Prática concluída!
          </h1>

          <p>
            Você completou os exercícios de{" "}
            <strong>
              {lesson.title}
            </strong>
            .
            {" "}
            Desempenho desta tentativa:{" "}
            <strong>
              {finalPercentage}%
            </strong>
            .
          </p>


          <div className="result-stats">

            <div>
              <strong>
                {finalAttemptXp}
                /
                {maxExerciseXp}
              </strong>

              <span>
                XP da tentativa
              </span>
            </div>


            <div>
              <strong>
                {bestPercentage}%
              </strong>

              <span>
                melhor resultado
              </span>
            </div>


            <div>
              <strong>
                {attemptNumber}
              </strong>

              <span>
                tentativas
              </span>
            </div>

          </div>


          {isNewBest && (
            <div className="xp-saved-message">
              🏆 Novo melhor resultado!
            </div>
          )}


          {xpAdded > 0 ? (
            <div className="xp-saved-message">
              ⭐ +{xpAdded} XP adicionados
              ao seu progresso!
            </div>
          ) : (
            <div className="xp-saved-message">
              Nenhum XP adicional nesta
              tentativa. Seu melhor resultado
              continua salvo.
            </div>
          )}


          <div className="result-actions">

            <Link
              to={`/learn/${awsLearningPath.id}`}
              className="secondary-button"
            >
              Voltar para trilha
            </Link>

            <Link
              to={`/learn/${awsLearningPath.id}/${learningModule.id}/${lesson.id}`}
              className="primary-button"
            >
              Rever aula
            </Link>

          </div>

        </section>
      </main>
    );
  }

  /*
   * Tela de prática.
   */
  return (
    <main className="practice-page">

      <section className="practice-wrapper">

        <header className="practice-header">

          <div>

            <Link
              to={`/learn/${awsLearningPath.id}/${learningModule.id}/${lesson.id}`}
              className="back-link"
            >
              ← Voltar para aula
            </Link>

            <span className="eyebrow">
              {
                learningModule.title
              }
            </span>

            <h1>
              {lesson.title}
            </h1>


            {previousProgress && (
              <p className="previous-score">
                Melhor resultado:{" "}
                {
                  previousProgress.percentage
                }
                %
                {" · "}
                {
                  previousProgress.attempts
                }{" "}
                {
                  previousProgress.attempts ===
                  1
                    ? "tentativa"
                    : "tentativas"
                }
              </p>
            )}

          </div>


          <div className="practice-xp">
            ⭐ {earnedXp} XP
          </div>

        </header>


        <div className="practice-progress">

          <div className="progress-info">

            <span>
              Questão{" "}
              {
                currentExerciseIndex +
                1
              }{" "}
              de{" "}
              {totalExercises}
            </span>

            <span>
              {
                Math.round(
                  progressPercentage,
                )
              }
              %
            </span>

          </div>


          <div className="progress-track">

            <div
              className="progress-fill"
              style={{
                width:
                  `${progressPercentage}%`,
              }}
            />

          </div>

        </div>


        {currentExercise.type ===
        "multiple-choice" ? (

          <MultipleChoiceExercise
            key={
              currentExercise.id
            }
            exercise={
              currentExercise
            }
            onNext={
              handleNext
            }
            isLastExercise={
              currentExerciseIndex ===
              totalExercises - 1
            }
          />

        ) : (

          <div className="practice-empty">

            <span className="eyebrow">
              EXERCISE TYPE
            </span>

            <h2>
              Tipo de exercício ainda
              não implementado
            </h2>

            <p>
              O exercício{" "}
              <strong>
                {
                  currentExercise.type
                }
              </strong>{" "}
              será suportado em uma
              próxima versão do
              CloudLab.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}