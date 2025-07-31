import { Class } from "./Classes";

export interface Faculty {
  faculty_id: number;
  code: string;
  name: string;
  is_active: boolean;
  created_at: Date;

  Classes?: Class[];
}
