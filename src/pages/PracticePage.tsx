import { useState } from "react";

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

  /*
   * Validação da learning path.
   */
  if (pathId !== "aws") {
    return (
      <main className="page-container">
        <h1>
          Learning path not found.
        </h1>
      </main>
    );
  }

  /*
   * Busca o módulo informado na URL.
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
   * Busca a aula dentro do módulo.
   */
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

  /*
   * Chave única e estável da aula.
   *
   * É melhor usar os IDs encontrados
   * nos dados do que depender diretamente
   * dos valores recebidos pela URL.
   */
  const lessonKey =
    `${awsLearningPath.id}:${learningModule.id}:${lesson.id}`;

  /*
   * Melhor resultado salvo anteriormente.
   */
  const previousProgress =
    getLessonProgress(
      lessonKey,
    );

  /*
   * A aula existe, mas ainda não possui
   * exercícios cadastrados.
   */
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
            to={`/learn/${awsLearningPath.id}/${learningModule.id}/${lesson.id}`}
            className="primary-button"
          >
            ← Voltar para aula
          </Link>
        </div>
      </main>
    );
  }

  /*
   * Quantidade total de exercícios.
   */
  const totalExercises =
    lesson.exercises.length;

  /*
   * XP máximo real da prática.
   *
   * Dessa forma, caso o XP das questões
   * seja alterado futuramente, o resultado
   * continuará correto automaticamente.
   */
  const maxExerciseXp =
    lesson.exercises.reduce(
      (
        total,
        exercise,
      ) =>
        total + exercise.xp,
      0,
    );

  /*
   * Exercício atualmente exibido.
   */
  const currentExercise =
    lesson.exercises[
      currentExerciseIndex
    ];

  /*
   * Proteção contra índice inválido.
   */
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
   * Progresso visual.
   *
   * Na primeira questão:
   * 0 de 5 concluídas = 0%
   *
   * Na segunda:
   * 1 de 5 concluída = 20%
   *
   * Ao terminar:
   * 100%
   */
  const rawProgress =
    completed
      ? 100
      : (
          currentExerciseIndex /
          totalExercises
        ) * 100;

  const progressPercentage =
    Math.min(
      100,
      Math.max(
        0,
        rawProgress,
      ),
    );

  /*
   * Chamado quando o usuário termina
   * uma questão e clica para continuar.
   */
  function handleNext(
    questionXp: number,
  ) {
    /*
     * Calculamos o novo valor diretamente
     * para não depender da atualização
     * assíncrona do useState.
     */
    const updatedXp =
      earnedXp + questionXp;

    setEarnedXp(
      updatedXp,
    );

    const isLastExercise =
      currentExerciseIndex ===
      totalExercises - 1;

    /*
     * Ainda existem perguntas.
     */
    if (!isLastExercise) {
      setCurrentExerciseIndex(
        (current) =>
          current + 1,
      );

      return;
    }

    /*
     * Última pergunta:
     * salva o resultado persistente.
     */
    const result =
      completeLesson({
        lessonKey,

        earnedXp:
          updatedXp,

        maxXp:
          maxExerciseXp,
      });

    /*
     * Guardamos separadamente o XP
     * final porque ele será utilizado
     * na tela de resultados.
     */
    setFinalAttemptXp(
      updatedXp,
    );

    setXpAdded(
      result.xpAdded,
    );

    setCompleted(
      true,
    );
  }

  /*
   * Tela final da prática.
   */
  if (completed) {
    const rawPercentage =
      maxExerciseXp > 0
        ? (
            finalAttemptXp /
            maxExerciseXp
          ) * 100
        : 0;

    const percentage =
      Math.min(
        100,
        Math.max(
          0,
          Math.round(
            rawPercentage,
          ),
        ),
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
            Prática concluída!
          </h1>

          <p>
            Você completou os exercícios de{" "}
            <strong>
              {lesson.title}
            </strong>
            .
          </p>

          <div className="result-stats">
            <div>
              <strong>
                {finalAttemptXp}
              </strong>

              <span>
                XP da tentativa
              </span>
            </div>

            <div>
              <strong>
                {maxExerciseXp}
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

          {xpAdded > 0 ? (
            <div className="xp-saved-message">
              ⭐ +{xpAdded} XP adicionados
              ao seu progresso!
            </div>
          ) : (
            <div className="xp-saved-message">
              Seu melhor resultado já era
              igual ou superior ao desta
              tentativa.
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
   * Tela normal da prática.
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
              {learningModule.title}
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
              de {totalExercises}
            </span>

            <span>
              {Math.round(
                progressPercentage,
              )}
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
                {currentExercise.type}
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