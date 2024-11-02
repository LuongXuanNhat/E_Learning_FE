import { ClassSchedule } from "./ClassSchedule";

export interface Schedule {
  schedule_id: number;
  name: string;
  description?: string;
  created_at: Date;
  classSchedules?: ClassSchedule[];
}
