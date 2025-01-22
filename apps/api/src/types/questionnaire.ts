export interface Questionnaire {
  id: string;
  user_id: string;
  responses: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
