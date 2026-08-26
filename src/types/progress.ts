export type LessonProgress = {
  lessonKey: string;

  earnedXp: number;

  maxXp: number;

  percentage: number;

  completedAt: string;
};

export type UserProgress = {
  totalXp: number;

  streak: number;

  lastStudyDate: string | null;

  lessons: Record<
    string,
    LessonProgress
  >;
};