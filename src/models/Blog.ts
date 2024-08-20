import { User } from "./User";

export interface Blog {
  blog_id: number;
  class_id: number;
  teacher_id: number;
  title: string;
  content: string;
  resource_url: string;
  created_at: Date | string | null;

  Teacher?: User;
}
