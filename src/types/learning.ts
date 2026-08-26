export type ExerciseType =
  | "multiple-choice"
  | "fill-gap"
  | "order"
  | "code"
  | "architecture";

export type ExerciseOption = {
  id: string;
  text: string;
};

export type Exercise = {
  id: string;

  type: ExerciseType;

  question: string;

  options?: ExerciseOption[];

  correctAnswer?: string;

  explanation?: string;

  xp: number;
};

export type LessonSection = {
  id: string;

  title?: string;

  content: string;
};

export type Lesson = {
  id: string;

  title: string;

  description: string;

  estimatedMinutes: number;

  xp: number;

  content: LessonSection[];

  exercises: Exercise[];
};

export type LearningModule = {
  id: string;

  title: string;

  description: string;

  icon: string;

  lessons: Lesson[];
};

export type LearningPath = {
  id: string;

  title: string;

  description: string;

  icon: string;

  color: string;

  modules: LearningModule[];
};