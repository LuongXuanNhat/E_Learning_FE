import { Class } from "./Classes";
import { Course } from "./Course";
import { User } from "./User";

export interface Enrollment {
  enrollment_id: number;
  student_id: number;
  course_id: number;
  class_id: number;
  registration_date: Date;
  created_at: Date;

  // Associations
  Student?: User;
  Course?: Course;
  Class?: Class;

  grade?: number;
  content?: string;
}
