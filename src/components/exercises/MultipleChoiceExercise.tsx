import {
  useState,
} from "react";

import type {
  Exercise,
} from "../../types/learning";

type MultipleChoiceExerciseProps = {
  exercise: Exercise;

  onNext: (
    earnedXp: number,
  ) => void;

  isLastExercise: boolean;
};

export default function MultipleChoiceExercise({
  exercise,
  onNext,
  isLastExercise,
}: MultipleChoiceExerciseProps) {
  const [
    selectedOption,
    setSelectedOption,
  ] = useState<string | null>(
    null,
  );

  const [
    checked,
    setChecked,
  ] = useState(false);

  const [
    isCorrect,
    setIsCorrect,
  ] = useState(false);

  function handleCheckAnswer() {
    if (!selectedOption) {
      return;
    }

    const correct =
      selectedOption ===
      exercise.correctAnswer;

    setIsCorrect(
      correct,
    );

    setChecked(
      true,
    );
  }

  const earnedXp =
    isCorrect
      ? exercise.xp
      : 0;

  return (
    <section className="exercise-card">
      <div className="exercise-type">
        MULTIPLE CHOICE
      </div>

      <h2 className="exercise-question">
        {exercise.question}
      </h2>

      <div className="exercise-options">
        {exercise.options?.map(
          (option) => {
            const selected =
              selectedOption ===
              option.id;

            const correctOption =
              checked &&
              option.id ===
                exercise.correctAnswer;

            const wrongOption =
              checked &&
              selected &&
              !isCorrect;

            let className =
              "exercise-option";

            if (selected) {
              className +=
                " selected";
            }

            if (correctOption) {
              className +=
                " correct";
            }

            if (wrongOption) {
              className +=
                " incorrect";
            }

            return (
              <button
                key={
                  option.id
                }
                type="button"
                className={
                  className
                }
                disabled={
                  checked
                }
                onClick={() =>
                  setSelectedOption(
                    option.id,
                  )
                }
              >
                <span className="option-letter">
                  {option.id.toUpperCase()}
                </span>

                <span>
                  {option.text}
                </span>
              </button>
            );
          },
        )}
      </div>

      {!checked && (
        <button
          type="button"
          className="check-answer-button"
          disabled={
            !selectedOption
          }
          onClick={
            handleCheckAnswer
          }
        >
          Verificar resposta
        </button>
      )}

      {checked && (
        <div
          className={
            isCorrect
              ? "exercise-feedback correct-feedback"
              : "exercise-feedback incorrect-feedback"
          }
        >
          <div className="feedback-heading">
            {isCorrect
              ? "✅ Resposta correta!"
              : "❌ Resposta incorreta"}
          </div>

          {isCorrect && (
            <div className="earned-xp">
              +{exercise.xp} XP
            </div>
          )}

          {exercise.explanation && (
            <p>
              {
                exercise.explanation
              }
            </p>
          )}

          <button
            type="button"
            className="continue-button"
            onClick={() =>
              onNext(
                earnedXp,
              )
            }
          >
            {isLastExercise
              ? "Ver resultado →"
              : "Próxima questão →"}
          </button>
        </div>
      )}
    </section>
  );
}