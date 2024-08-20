export interface Subject {
  subject_id: number;
  name: string;
  description: string | null;
  created_at: Date | string;
}
