"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import { Attendance } from "@/models/Attendance";
import {
  createAttendance,
  fetchAttendances,
  getCheckRollCall,
} from "@/services/service";
import { Button, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function AttendanceEveryday({ id }: { id: number }) {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [isRollCall, setIsRollCall] = useState(false);
  const { addAlert } = useAlert();

  const getAttendance = async () => {
    const data = await fetchAttendances(id);
    setAttendances(data);
  };

  const getRollCall = async () => {
    const data = await getCheckRollCall(id);
    setIsRollCall(data);
  };

  const groupAttendancesByDate = (attendances: Attendance[]) => {
    return attendances.reduce(
      (groups: Record<string, Attendance[]>, attendance) => {
        const date = new Date(attendance.created_at).toLocaleDateString(
          "vi-VN"
        ); // Format date as 'dd/MM/yyyy'
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(attendance);
        return groups;
      },
      {}
    );
  };

  useEffect(() => {
    getAttendance();
    getRollCall();
  }, []);

  const groupedAttendances = groupAttendancesByDate(attendances);

  const handleRollCall = async () => {
    try {
      const obj: Attendance = {
        attendance_id: 0,
        class_id: id,
        student_id: 0,
        date: new Date(),
        status: "",
        created_at: new Date(),
      };
      if (isRollCall) {
        obj.status = "Close";
        setIsRollCall(false);
      } else {
        obj.status = "Open";
        setIsRollCall(true);
      }

      var result = await createAttendance(obj);
      addAlert(AlertType.success, result);
    } catch (error: any) {
      addAlert(AlertType.error, error);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h5" className="px-3 py-1 text-blue-500 font-bold">
          Nhật ký điểm danh
        </Typography>
        <Button
          className=""
          ripple={true}
          onClick={handleRollCall}
          color={isRollCall ? "deep-orange" : "blue"}
        >
          {isRollCall ? "Đóng điểm danh hôm nay" : "Mở điểm danh hôm này"}
        </Button>
      </div>
      <div>
        {Object.keys(groupedAttendances)
          .sort()
          .map((date, index) => (
            <div key={date}>
              <Typography className="mt-8 mb-3" variant="h5">
                Điểm danh lần {index + 1}
              </Typography>
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
                        Điểm danh lúc
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Hành động
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupedAttendances[date].map((attendance) => (
                    <tr key={attendance.attendance_id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {attendance.User!.name}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {format(
                            new Date(attendance.created_at),
                            "dd/MM/yyyy 'lúc' hh:mm"
                          )}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {attendance.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}
