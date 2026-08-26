import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  ProgressContext,
  type CompleteLessonInput,
  type CompleteLessonResult,
} from "./progress-context";

import type {
  LessonProgress,
  UserProgress,
} from "../types/progress";

const STORAGE_KEY =
  "cloudlab-progress";

const initialProgress: UserProgress = {
  totalXp: 0,

  streak: 0,

  lastStudyDate: null,

  lessons: {},
};

/*
 * Estrutura usada apenas para
 * migrar dados antigos salvos
 * no localStorage.
 */
type StoredLessonProgress =
  Partial<LessonProgress> & {
    completedAt?: string;
  };

type StoredUserProgress = {
  totalXp?: number;

  streak?: number;

  lastStudyDate?: string | null;

  lessons?: Record<
    string,
    StoredLessonProgress
  >;
};

/*
 * Garante que percentuais permaneçam
 * sempre entre 0 e 100.
 */
function clampPercentage(
  value: number,
) {
  return Math.min(
    100,
    Math.max(
      0,
      Math.round(value),
    ),
  );
}

/*
 * Retorna a data local no formato:
 *
 * YYYY-MM-DD
 */
function getLocalDateString() {
  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1,
    ).padStart(
      2,
      "0",
    );

  const day =
    String(
      now.getDate(),
    ).padStart(
      2,
      "0",
    );

  return `${year}-${month}-${day}`;
}

/*
 * Retorna a data local de ontem.
 */
function getYesterdayDateString() {
  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() - 1,
  );

  const year =
    yesterday.getFullYear();

  const month =
    String(
      yesterday.getMonth() + 1,
    ).padStart(
      2,
      "0",
    );

  const day =
    String(
      yesterday.getDate(),
    ).padStart(
      2,
      "0",
    );

  return `${year}-${month}-${day}`;
}

/*
 * Migra um progresso antigo para
 * a estrutura nova.
 *
 * A versão anterior possuía:
 *
 * completedAt
 *
 * Agora temos:
 *
 * firstCompletedAt
 * lastAttemptAt
 * attempts
 * lastAttemptXp
 * lastAttemptPercentage
 */
function normalizeLessonProgress(
  lessonKey: string,
  stored:
    StoredLessonProgress,
): LessonProgress {
  const fallbackDate =
    stored.lastAttemptAt ??
    stored.firstCompletedAt ??
    stored.completedAt ??
    new Date().toISOString();

  const earnedXp =
    typeof stored.earnedXp ===
    "number"
      ? stored.earnedXp
      : 0;

  const maxXp =
    typeof stored.maxXp ===
    "number"
      ? stored.maxXp
      : 0;

  const calculatedPercentage =
    maxXp > 0
      ? clampPercentage(
          (
            earnedXp /
            maxXp
          ) * 100,
        )
      : 0;

  const percentage =
    typeof stored.percentage ===
    "number"
      ? clampPercentage(
          stored.percentage,
        )
      : calculatedPercentage;

  const attempts =
    typeof stored.attempts ===
      "number" &&
    stored.attempts > 0
      ? Math.floor(
          stored.attempts,
        )
      : 1;

  return {
    lessonKey:
      stored.lessonKey ??
      lessonKey,

    earnedXp,

    maxXp,

    percentage,

    attempts,

    firstCompletedAt:
      stored.firstCompletedAt ??
      stored.completedAt ??
      fallbackDate,

    lastAttemptAt:
      stored.lastAttemptAt ??
      stored.completedAt ??
      fallbackDate,

    lastAttemptXp:
      typeof stored.lastAttemptXp ===
      "number"
        ? stored.lastAttemptXp
        : earnedXp,

    lastAttemptPercentage:
      typeof stored.lastAttemptPercentage ===
      "number"
        ? clampPercentage(
            stored.lastAttemptPercentage,
          )
        : percentage,
  };
}

/*
 * Carrega os dados do navegador
 * e migra automaticamente qualquer
 * progresso salvo na versão antiga.
 */
function loadProgress(): UserProgress {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEY,
      );

    if (!saved) {
      return initialProgress;
    }

    const parsed =
      JSON.parse(
        saved,
      ) as StoredUserProgress;

    const lessons =
      Object.fromEntries(
        Object.entries(
          parsed.lessons ?? {},
        ).map(
          ([
            lessonKey,
            storedLesson,
          ]) => [
            lessonKey,

            normalizeLessonProgress(
              lessonKey,
              storedLesson,
            ),
          ],
        ),
      );

    return {
      totalXp:
        typeof parsed.totalXp ===
        "number"
          ? parsed.totalXp
          : 0,

      streak:
        typeof parsed.streak ===
        "number"
          ? parsed.streak
          : 0,

      lastStudyDate:
        typeof parsed.lastStudyDate ===
          "string" ||
        parsed.lastStudyDate ===
          null
          ? parsed.lastStudyDate
          : null,

      lessons,
    };
  } catch {
    return initialProgress;
  }
}

type ProgressProviderProps = {
  children: ReactNode;
};

export function ProgressProvider({
  children,
}: ProgressProviderProps) {
  const [
    progress,
    setProgress,
  ] = useState<UserProgress>(
    loadProgress,
  );

  /*
   * Toda alteração no progresso
   * é persistida automaticamente.
   */
  useEffect(
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          progress,
        ),
      );
    },
    [progress],
  );

  function completeLesson({
    lessonKey,
    earnedXp,
    maxXp,
  }: CompleteLessonInput): CompleteLessonResult {
    const previous =
      progress.lessons[
        lessonKey
      ];

    /*
     * Impede valores inválidos de XP.
     */
    const safeMaxXp =
      Math.max(
        0,
        maxXp,
      );

    const safeEarnedXp =
      safeMaxXp > 0
        ? Math.min(
            safeMaxXp,
            Math.max(
              0,
              earnedXp,
            ),
          )
        : 0;

    /*
     * Percentual desta tentativa.
     */
    const attemptPercentage =
      safeMaxXp > 0
        ? clampPercentage(
            (
              safeEarnedXp /
              safeMaxXp
            ) * 100,
          )
        : 0;

    /*
     * Melhor resultado anterior.
     */
    const previousBestXp =
      previous?.earnedXp ??
      0;

    const previousBestPercentage =
      previous?.percentage ??
      0;

    /*
     * Verifica se houve melhora
     * no domínio da aula.
     */
    const newBest =
      attemptPercentage >
      previousBestPercentage;

    /*
     * Anti-farm de XP.
     *
     * Se a pessoa tinha 24 XP
     * e agora conseguiu 40:
     *
     * ganha apenas +16 XP.
     */
    const xpAdded =
      Math.max(
        0,
        safeEarnedXp -
          previousBestXp,
      );

    /*
     * Mantemos sempre o melhor XP
     * e o melhor percentual.
     */
    const bestEarnedXp =
      Math.max(
        previousBestXp,
        safeEarnedXp,
      );

    const bestPercentage =
      Math.max(
        previousBestPercentage,
        attemptPercentage,
      );

    /*
     * Incrementa o contador
     * de tentativas.
     */
    const attempts =
      (
        previous?.attempts ??
        0
      ) + 1;

    const attemptDate =
      new Date().toISOString();

    /*
     * Primeira conclusão nunca muda.
     */
    const firstCompletedAt =
      previous?.firstCompletedAt ??
      attemptDate;

    /*
     * Controle de streak.
     */
    const today =
      getLocalDateString();

    const yesterday =
      getYesterdayDateString();

    let newStreak =
      progress.streak;

    /*
     * Só altera o streak uma vez
     * por dia.
     */
    if (
      progress.lastStudyDate !==
      today
    ) {
      if (
        progress.lastStudyDate ===
        yesterday
      ) {
        newStreak =
          progress.streak + 1;
      } else {
        newStreak = 1;
      }
    }

    /*
     * Novo estado da aula.
     */
    const lessonProgress:
      LessonProgress = {
      lessonKey,

      earnedXp:
        bestEarnedXp,

      maxXp:
        safeMaxXp,

      percentage:
        bestPercentage,

      attempts,

      firstCompletedAt,

      lastAttemptAt:
        attemptDate,

      lastAttemptXp:
        safeEarnedXp,

      lastAttemptPercentage:
        attemptPercentage,
    };

    setProgress(
      (current) => ({
        ...current,

        totalXp:
          current.totalXp +
          xpAdded,

        streak:
          newStreak,

        lastStudyDate:
          today,

        lessons: {
          ...current.lessons,

          [lessonKey]:
            lessonProgress,
        },
      }),
    );

    return {
      xpAdded,

      newBest,

      attempts,

      bestPercentage,

      attemptPercentage,
    };
  }

  function getLessonProgress(
    lessonKey: string,
  ) {
    return progress.lessons[
      lessonKey
    ];
  }

  function resetProgress() {
    setProgress({
      totalXp: 0,

      streak: 0,

      lastStudyDate: null,

      lessons: {},
    });
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,

        completeLesson,

        getLessonProgress,

        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}