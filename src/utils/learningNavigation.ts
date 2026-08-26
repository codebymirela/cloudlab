import type {
  LearningPath,
  Lesson,
} from "../types/learning";

import type {
  LessonProgress,
} from "../types/progress";

export type FlatLearningLesson = {
  key: string;

  pathId: string;

  moduleId: string;

  moduleTitle: string;

  lesson: Lesson;

  moduleIndex: number;

  lessonIndex: number;

  globalIndex: number;
};

type ProgressLookup = (
  lessonKey: string,
) => LessonProgress | undefined;

/*
 * Cria a chave única usada pelo
 * sistema de progresso.
 */
export function buildLessonKey(
  pathId: string,
  moduleId: string,
  lessonId: string,
) {
  return `${pathId}:${moduleId}:${lessonId}`;
}

/*
 * Calcula o XP máximo real
 * de uma aula.
 */
export function getLessonMaxXp(
  lesson: Lesson,
) {
  const exerciseXp =
    lesson.exercises.reduce(
      (
        total,
        exercise,
      ) =>
        total + exercise.xp,
      0,
    );

  return exerciseXp > 0
    ? exerciseXp
    : lesson.xp;
}

/*
 * Transforma:
 *
 * Module
 *   ├ Lesson
 *   └ Lesson
 *
 * Module
 *   └ Lesson
 *
 * em uma única sequência.
 */
export function flattenLearningPath(
  path: LearningPath,
): FlatLearningLesson[] {
  const items:
    FlatLearningLesson[] = [];

  path.modules.forEach(
    (
      module,
      moduleIndex,
    ) => {
      module.lessons.forEach(
        (
          lesson,
          lessonIndex,
        ) => {
          items.push({
            key:
              buildLessonKey(
                path.id,
                module.id,
                lesson.id,
              ),

            pathId:
              path.id,

            moduleId:
              module.id,

            moduleTitle:
              module.title,

            lesson,

            moduleIndex,

            lessonIndex,

            globalIndex:
              items.length,
          });
        },
      );
    },
  );

  return items;
}

/*
 * Uma aula é considerada concluída
 * quando existe progresso salvo.
 *
 * O percentual representa o domínio,
 * mas não impede o avanço.
 */
export function isLessonCompleted(
  lessonKey: string,
  getLessonProgress:
    ProgressLookup,
) {
  return Boolean(
    getLessonProgress(
      lessonKey,
    ),
  );
}

/*
 * Primeira aula:
 * sempre desbloqueada.
 *
 * Demais aulas:
 * desbloqueadas quando a aula
 * imediatamente anterior foi concluída.
 */
export function isLessonUnlocked(
  lessons:
    FlatLearningLesson[],

  index: number,

  getLessonProgress:
    ProgressLookup,
) {
  if (index === 0) {
    return true;
  }

  if (
    index < 0 ||
    index >= lessons.length
  ) {
    return false;
  }

  const previousLesson =
    lessons[index - 1];

  return isLessonCompleted(
    previousLesson.key,
    getLessonProgress,
  );
}

/*
 * Localiza a próxima aula
 * disponível que ainda não foi feita.
 */
export function findContinueLesson(
  lessons:
    FlatLearningLesson[],

  getLessonProgress:
    ProgressLookup,
) {
  return lessons.find(
    (
      lesson,
      index,
    ) => {
      const completed =
        isLessonCompleted(
          lesson.key,
          getLessonProgress,
        );

      const unlocked =
        isLessonUnlocked(
          lessons,
          index,
          getLessonProgress,
        );

      return (
        unlocked &&
        !completed
      );
    },
  );
}