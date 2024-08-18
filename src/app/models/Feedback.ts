import { User } from "./User";

export interface Feedback {
  feedback_id: number;
  class_id: number;
  user_id: number;
  content: string;
  created_at: Date;

  User?: User;
}
