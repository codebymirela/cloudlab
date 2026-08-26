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

export default function PracticePage() {
  const {
    pathId,
    moduleId,
    lessonId,
  } = useParams();

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

  if (
    lesson.exercises.length === 0
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
            to={`/learn/${pathId}/${moduleId}/${lessonId}`}
            className="primary-button"
          >
            ← Voltar para aula
          </Link>
        </div>
      </main>
    );
  }

  const currentExercise =
    lesson.exercises[
      currentExerciseIndex
    ];

  const totalExercises =
    lesson.exercises.length;

  const progress =
    completed
      ? 100
      : (
          currentExerciseIndex /
          totalExercises
        ) *
        100;

  function handleAnswered(
    xp: number,
  ) {
    setEarnedXp(
      (current) =>
        current + xp,
    );
  }

  function handleNext() {
    const isLast =
      currentExerciseIndex ===
      totalExercises - 1;

    if (isLast) {
      setCompleted(true);

      return;
    }

    setCurrentExerciseIndex(
      (current) =>
        current + 1,
    );
  }

  if (completed) {
    const percentage =
      Math.round(
        (earnedXp /
          lesson.xp) *
          100,
      );

    return (
      <main className="practice-page">
        <section className="practice-result">
          <div className="result-icon">
            🎉
          </div>

          <span className="eyebrow">
            PRACTICE COMPLETE
          </span>

          <h1>
            Aula concluída!
          </h1>

          <p>
            Você completou os exercícios de
            <strong>
              {" "}
              {lesson.title}
            </strong>
            .
          </p>

          <div className="result-stats">
            <div>
              <strong>
                {earnedXp}
              </strong>

              <span>
                XP obtido
              </span>
            </div>

            <div>
              <strong>
                {lesson.xp}
              </strong>

              <span>
                XP máximo
              </span>
            </div>

            <div>
              <strong>
                {percentage}%
              </strong>

              <span>
                desempenho
              </span>
            </div>
          </div>

          <div className="result-actions">
            <Link
              to={`/learn/${pathId}`}
              className="secondary-button"
            >
              Voltar para trilha
            </Link>

            <Link
              to={`/learn/${pathId}/${moduleId}/${lessonId}`}
              className="primary-button"
            >
              Rever aula
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="practice-page">
      <section className="practice-wrapper">
        <header className="practice-header">
          <div>
            <Link
              to={`/learn/${pathId}/${moduleId}/${lessonId}`}
              className="back-link"
            >
              ← Voltar para aula
            </Link>

            <span className="eyebrow">
              {learningModule.title}
            </span>

            <h1>
              {lesson.title}
            </h1>
          </div>

          <div className="practice-xp">
            ⭐ {earnedXp} XP
          </div>
        </header>

        <div className="practice-progress">
          <div className="progress-info">
            <span>
              Questão{" "}
              {currentExerciseIndex +
                1}
              {" "}de{" "}
              {totalExercises}
            </span>

            <span>
              {Math.round(
                progress,
              )}
              %
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {currentExercise.type ===
          "multiple-choice" && (
          <MultipleChoiceExercise
            key={
              currentExercise.id
            }
            exercise={
              currentExercise
            }
            onAnswered={
              handleAnswered
            }
            onNext={
              handleNext
            }
            isLastExercise={
              currentExerciseIndex ===
              totalExercises - 1
            }
          />
        )}
      </section>
    </main>
  );
}