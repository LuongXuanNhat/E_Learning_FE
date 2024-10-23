import { User } from "./User";

export interface Document {
  document_id: number;
  title: string;
  description: string;
  link: string;
  created_at: Date;
  author_id: number;
  is_active: boolean | false;

  Author?: User;
}
