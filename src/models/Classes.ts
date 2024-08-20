import { Attendance } from "./Attendance";
import { Course } from "./Course";
import { Enrollment } from "./Enrollment";
import { Feedback } from "./Feedback";
import { Grade } from "./Grade";
import { User } from "./User";

export interface Class {
  class_id: number;
  course_id: number | null;
  advisor_id: number;
  name: string;
  description: string;
  schedule: string | null;
  created_at: string | Date;
  isRegistered: boolean | false;
  totalRegister?: number | 0;

  Course?: Course;
  Advisor?: User;
  Enrollments?: Enrollment[];
  Attendances?: Attendance[];
  Feedbacks?: Feedback[];
  Grades?: Grade[];
  // ChatRooms?: ChatRoom[];
  // Blogs?: Blog[];
}
