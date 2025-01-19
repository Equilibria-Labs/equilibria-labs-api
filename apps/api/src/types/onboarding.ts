export interface Onboarding {
  id: string;
  user_id: string;
  responses: Record<string, unknown>;
  status: 'draft' | 'in_progress' | 'completed';
  onboarding_type: string;
  completed_at?: string;
  last_step?: string;
  created_at: string;
  updated_at: string;
}
