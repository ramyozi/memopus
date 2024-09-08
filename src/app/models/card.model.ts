export interface Card {
  id: number;
  question: string;
  answer: string;
  description: string;
  tag: number;
  column: number;
  showAnswer?: boolean;
}
