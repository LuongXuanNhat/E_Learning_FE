"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import { Attendance } from "@/models/Attendance";
import { StudentAttendanceSummary } from "@/models/User";
import { fetchAttendances } from "@/services/service";
import { Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function AttendanceSummary({ id }: { id: number }) {
  const [summary, setSummary] = useState<StudentAttendanceSummary[]>([]);
  const { addAlert } = useAlert();

  const getAttendance = async () => {
    try {
      const data: Attendance[] = await fetchAttendances(id);

      // Group by student_id and count attendance records
      const attendanceSummary = data.reduce(
        (acc: StudentAttendanceSummary[], attendance) => {
          const existing = acc.find(
            (item) => item.student_id === attendance.student_id
          );
          if (existing) {
            existing.attendance_count += 1;
          } else {
            acc.push({
              student_id: attendance.student_id,
              student_name: attendance.User?.name || "Unknown",
              attendance_count: 1,
            });
          }
          return acc;
        },
        []
      );

      setSummary(attendanceSummary);
    } catch (error) {
      addAlert(AlertType.error, "Có lỗi xảy ra khi lấy dữ liệu điểm danh.");
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <div>
      <Typography variant="h5" className="text-center pb-5">
        Tổng kết điểm danh học viên
      </Typography>
      <div>
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Tên học viên
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Số lần điểm danh
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item) => (
              <tr key={item.student_id}>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {item.student_name}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {item.attendance_count}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
