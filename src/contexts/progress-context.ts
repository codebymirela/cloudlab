import {
  createContext,
} from "react";

import type {
  LessonProgress,
  UserProgress,
} from "../types/progress";

export type CompleteLessonInput = {
  lessonKey: string;

  earnedXp: number;

  maxXp: number;
};

export type CompleteLessonResult = {
  xpAdded: number;

  newBest: boolean;

  attempts: number;

  bestPercentage: number;

  attemptPercentage: number;
};

export type ProgressContextValue = {
  progress: UserProgress;

  completeLesson: (
    input: CompleteLessonInput,
  ) => CompleteLessonResult;

  getLessonProgress: (
    lessonKey: string,
  ) => LessonProgress | undefined;

  resetProgress: () => void;
};

export const ProgressContext =
  createContext<
    ProgressContextValue | undefined
  >(undefined);