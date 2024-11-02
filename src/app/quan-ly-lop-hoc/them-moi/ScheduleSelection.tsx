import React, { useState } from "react";
import { Select, Option, Input } from "@material-tailwind/react";
import { Schedule } from "@/models/Schedule";
import { ClassSchedule } from "@/models/ClassSchedule";

interface ScheduleSelectionProps {
  schedules: Schedule[];
  onScheduleChange: (scheduleSelections: ClassSchedule[]) => void;
}
const DAYS_OF_WEEK = [
  { value: "Monday", label: "Thứ 2" },
  { value: "Tuesday", label: "Thứ 3" },
  { value: "Wednesday", label: "Thứ 4" },
  { value: "Thursday", label: "Thứ 5" },
  { value: "Friday", label: "Thứ 6" },
  { value: "Saturday", label: "Thứ 7" },
  { value: "Sunday", label: "Chủ Nhật" },
];
const ScheduleSelection: React.FC<ScheduleSelectionProps> = ({
  schedules,
  onScheduleChange,
}) => {
  const [scheduleSelections, setScheduleSelections] = useState<ClassSchedule[]>(
    [
      {
        class_schedule_id: 0,
        class_id: 0,
        schedule_id: 0,
        dayOfWeek: "",
      },
    ]
  );

  const handleAddRow = () => {
    setScheduleSelections((prev) => [
      ...prev,
      {
        class_schedule_id: 0,
        class_id: 0,
        schedule_id: 0,
        dayOfWeek: "",
      },
    ]);
  };

  const handleRemoveRow = (indexToRemove: number) => {
    setScheduleSelections((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleScheduleChange = (index: number, scheduleId: string) => {
    const updatedSelections = [...scheduleSelections];
    updatedSelections[index] = {
      ...updatedSelections[index],
      schedule_id: parseInt(scheduleId),
    };

    setScheduleSelections(updatedSelections);
    onScheduleChange(updatedSelections);
  };
  const handleDayOfWeekChange = (index: number, dayOfWeek: string) => {
    const updatedSelections = [...scheduleSelections];
    updatedSelections[index] = {
      ...updatedSelections[index],
      dayOfWeek: dayOfWeek,
    };

    setScheduleSelections(updatedSelections);
    onScheduleChange(updatedSelections);
  };
  return (
    <div>
      {scheduleSelections.map((selection, index) => (
        <div key={index} className="flex items-center mb-4">
          <div className="mx-4 w-full">
            <Select
              name={`schedule-${index}`}
              label="Chọn tiết dạy"
              placeholder="Chọn tiết dạy"
              key={selection.schedule_id}
              value={selection.schedule_id.toString()}
              onChange={(value: any) => handleScheduleChange(index, value)}
            >
              {schedules.map((schedule) => (
                <Option
                  key={schedule.schedule_id}
                  value={schedule.schedule_id.toString()}
                >
                  {schedule.name} - {schedule.description}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mx-4 w-full">
            <Select
              name={`dayOfWeek-${index}`}
              label="Chọn thứ"
              placeholder="Chọn thứ"
              value={selection.dayOfWeek}
              onChange={(value: any) => handleDayOfWeekChange(index, value)}
            >
              {DAYS_OF_WEEK.map((day) => (
                <Option key={day.value} value={day.value}>
                  {day.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center">
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveRow(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Xóa
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-start mt-2">
        <button
          type="button"
          onClick={handleAddRow}
          className="text-blue-500 hover:text-blue-700"
        >
          + Thêm tiết dạy
        </button>
      </div>
    </div>
  );
};

export default ScheduleSelection;
