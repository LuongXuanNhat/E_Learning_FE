"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import { MiddlewareAuthor } from "@/middleware/Author";
import { Grade } from "@/models/Grade";
import { Position } from "@/models/User";
import {
  getGradeOfClass,
  updateGrades,
  updateStudentScoreInClass,
} from "@/services/service";
import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function StudyPoint({ id }: { id: number }) {
  const { addAlert } = useAlert();
  const [studentgrade, setStudentGrade] = useState<Grade[]>([]);

  const getStudentGrade = async () => {
    const data = await getGradeOfClass(id);
    setStudentGrade(data);
  };
  useEffect(() => {
    getStudentGrade();
  }, []);

  const updateStudentScore = async () => {
    try {
      var result = await updateStudentScoreInClass(id);
      await getStudentGrade();
      addAlert(AlertType.success, result);
    } catch (error) {
      addAlert(AlertType.warning, "Cập nhập học viên không thành công");
    }
  };

  const handleInputChange = (gradeId: number, field: string, value: any) => {
    setStudentGrade((prevGrades: Grade[]) =>
      prevGrades.map((grade) =>
        grade.grade_id === gradeId ? { ...grade, [field]: value } : grade
      )
    );
  };

  const updateGrade = async () => {
    try {
      await updateGrades(studentgrade);
      await getStudentGrade();
      addAlert(AlertType.success, "Cập nhập thành công");
    } catch (error) {
      addAlert(AlertType.warning, "Cập nhập điểm không thành công");
    }
  };

  return (
    <div>
      <div className="flex ">
        <Button
          className="mb-2 mr-2"
          ripple={true}
          onClick={updateStudentScore}
          color="blue"
        >
          Cập nhập học viên
        </Button>
        <Button
          className="mb-2"
          ripple={true}
          onClick={updateGrade}
          color="green"
        >
          Cập nhập điểm số
        </Button>
      </div>
      <div>
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Mã số
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Họ và tên
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-24">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Tự chọn 1
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-24">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Tự chọn 2
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-24">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Giữa kỳ
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 w-24">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Điểm danh
                </p>
              </th>
              <th className="p-4 border-b border-l-2 border-blue-gray-100 bg-blue-gray-50 w-24">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Quá trình
                </p>
              </th>
              <th className="p-4 border-b border-l-2 border-blue-gray-100 bg-blue-gray-50 w-24">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Cuối kỳ
                </p>
              </th>
              <th className="p-4 border-b border-l-4 border-blue-700  bg-blue-gray-50 w-32">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Điểm môn học
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {studentgrade.map((item) => (
              <tr key={item.grade_id}>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {item.Student!.username}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    {item.Student!.name}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="number"
                    value={item.optional_grade_1 ?? 0}
                    onChange={(e) =>
                      handleInputChange(
                        item.grade_id,
                        "optional_grade_1",
                        e.target.value
                      )
                    }
                    className="w-full font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="number"
                    value={item.optional_grade_2 ?? 0}
                    onChange={(e) =>
                      handleInputChange(
                        item.grade_id,
                        "optional_grade_2",
                        e.target.value
                      )
                    }
                    className="w-full font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="number"
                    value={item.midterm_grade}
                    onChange={(e) =>
                      handleInputChange(
                        item.grade_id,
                        "midterm_grade",
                        e.target.value
                      )
                    }
                    className="w-full font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <input
                    type="number"
                    value={item.rollcall_grade}
                    onChange={(e) =>
                      handleInputChange(
                        item.grade_id,
                        "rollcall_grade",
                        e.target.value
                      )
                    }
                    className="w-full font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                  />
                </td>
                <td className="p-4 border-b-2 border-l-2  border-blue-gray-50">
                  <input
                    type="number"
                    value={item.process_grade}
                    onChange={(e) =>
                      handleInputChange(
                        item.grade_id,
                        "process_grade",
                        e.target.value
                      )
                    }
                    className="w-full font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                  />
                </td>
                <td className="p-4 border-b-2 border-l-2 border-blue-gray-50">
                  <input
                    type="number"
                    value={item.final_grade}
                    onChange={(e) =>
                      handleInputChange(
                        item.grade_id,
                        "final_grade",
                        e.target.value
                      )
                    }
                    className="w-full font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                  />
                </td>
                <td className="p-4 border-b-2 border-l-4 border-blue-700">
                  <input
                    type="number"
                    value={item.summary_score}
                    onChange={(e) =>
                      handleInputChange(
                        item.grade_id,
                        "summary_score",
                        e.target.value
                      )
                    }
                    className="w-full font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MiddlewareAuthor(StudyPoint, [
  Position.SUB_TEACHER,
  Position.ADVISOR,
]);
