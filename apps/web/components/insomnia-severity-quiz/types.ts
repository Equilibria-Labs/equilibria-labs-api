export type Question = {
  id: number;
  text: string;
  options: string[];
};

export type Result = {
  score: number;
  severity: string;
  description: string;
};
