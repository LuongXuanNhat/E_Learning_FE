import { User } from "./User";

export interface Attendance {
  attendance_id: number;
  class_id: number;
  student_id: number;
  date: Date;
  status: string;
  created_at: Date;

  // Associations
  Student?: User;
}
