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
      ) as UserProgress;

    return {
      ...initialProgress,
      ...parsed,

      lessons:
        parsed.lessons ?? {},
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

    const previousBest =
      previous?.earnedXp ?? 0;

    const newBest =
      earnedXp >
      previousBest;

    /*
     * Só adicionamos a diferença.
     *
     * Exemplo:
     * tentativa anterior = 18 XP
     * tentativa atual = 30 XP
     *
     * XP novo = 12
     */
    const xpAdded =
      Math.max(
        0,
        earnedXp -
          previousBest,
      );

    const today =
      getLocalDateString();

    const yesterday =
      getYesterdayDateString();

    let newStreak =
      progress.streak;

    /*
     * Só alteramos streak uma vez
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

    const bestEarnedXp =
      Math.max(
        previousBest,
        earnedXp,
      );

    const rawPercentage =
      maxXp > 0
        ? (
            bestEarnedXp /
            maxXp
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

    const lessonProgress:
      LessonProgress = {
      lessonKey,

      earnedXp:
        bestEarnedXp,

      maxXp,

      percentage,

      completedAt:
        new Date().toISOString(),
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