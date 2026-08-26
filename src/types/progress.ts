export type LessonProgress = {
  lessonKey: string;

  /*
   * Melhor quantidade de XP
   * já obtida nesta aula.
   */
  earnedXp: number;

  /*
   * XP máximo disponível.
   */
  maxXp: number;

  /*
   * Melhor percentual obtido.
   */
  percentage: number;

  /*
   * Quantas vezes a prática
   * foi finalizada.
   */
  attempts: number;

  /*
   * Quando a aula foi concluída
   * pela primeira vez.
   */
  firstCompletedAt: string;

  /*
   * Quando ocorreu a tentativa
   * mais recente.
   */
  lastAttemptAt: string;

  /*
   * XP da tentativa mais recente.
   */
  lastAttemptXp: number;

  /*
   * Percentual da tentativa
   * mais recente.
   */
  lastAttemptPercentage: number;
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