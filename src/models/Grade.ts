import { User } from "./User";

export interface Grade {
  grade_id: number;
  class_id: number;
  student_id: number;
  optional_grade_1?: number | 0;
  optional_grade_2?: number | 0;
  rollcall_grade: number;
  midterm_grade: number;
  final_grade: number;
  process_grade: number;
  final_score: number;
  summary_score: number;
  created_at: Date;
  content: string;
  // Associations
  Student?: User;
}

export interface sub_grade {
  grade: number;
  content: string;
}
