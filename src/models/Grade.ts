import { User } from "./User";

export interface Grade {
  grade_id: number;
  class_id: number;
  student_id: number;
  midterm_grade: number;
  final_grade: number;
  process_grade: number;
  final_score: number;
  created_at: Date;

  // Associations
  Student?: User;
}
