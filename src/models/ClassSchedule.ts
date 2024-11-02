import { Class } from "./Classes";
import { Schedule } from "./Schedule";

export interface ClassSchedule {
  class_schedule_id: number;
  class_id: number;
  schedule_id: number;
  dayOfWeek: string;
  class?: Class;
  Schedule?: Schedule;
}
