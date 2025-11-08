
export enum GameState {
  HOME,
  SETUP,
  LOADING,
  QUIZZING,
  RESULTS,
  ERROR,
  ABOUT,
  PRIVACY,
  TERMS,
  CONTACT,
}

export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
  EXPERT = "Expert",
}

export interface Question {
  q: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: 'a' | 'b' | 'c' | 'd';
}