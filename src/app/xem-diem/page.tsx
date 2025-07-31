"use client";

import { Position, User } from "@/models/User";
import { AlertType, useAlert } from "../components/Alert/alertbase";
import Loading from "../components/loading";
import { MiddlewareAuthor } from "@/middleware/Author";
import { useEffect, useState } from "react";
import { getCookieUser } from "@/services/authService";
import { Grade } from "@/models/Grade";
import { getAllGrade } from "@/services/service";

interface GradesByFaculty {
  [facultyName: string]: Grade[];
}

interface StudentData {
  studentName: string;
  scores: { [courseName: string]: number | string };
}

function IndexPage() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState(true);

  const [userCurrent, setUserCurrent] = useState<User>({
    user_id: 0,
    username: "",
    name: "",
    cap_bac: "",
    chuc_vu: "",
    email: "",
    password: "",
    role: undefined,
    avatar_url: null,
    is_active: true,
    created_at: "",
    faculty_id: 0,
  });
  const [studentGrade, setStudentGrade] = useState<Grade[]>([]);

  const getStudentGrade = async () => {
    const data = await getAllGrade();
    const userCurrentA = getCookieUser();

    if (userCurrentA?.role == Position.SECRETARY) {
      const data1 = data.filter(
        (grade) => grade.Student?.faculty_id === userCurrentA.faculty_id
      );
      setStudentGrade(data1);
    } else {
      setStudentGrade(data);
    }
  };

  useEffect(() => {
    const userCurrentA = getCookieUser();
    setUserCurrent(userCurrentA!);

    getStudentGrade();
    setLoading(false);
  }, []);

  const gradesByFaculty: GradesByFaculty = studentGrade.reduce(
    (acc: GradesByFaculty, grade) => {
      const facultyName = grade.Student!.Faculty!.name;
      if (!acc[facultyName]) {
        acc[facultyName] = [];
      }
      acc[facultyName].push(grade);
      return acc;
    },
    {}
  );

  if (loading) return <Loading />;
  return (
    <div className="container mx-auto p-6">
      {Object.entries(gradesByFaculty).map(([faculty, grades]) => {
        // Danh sách khóa học trong từng khoa (không trùng lặp)
        const uniqueCourses = Array.from(
          new Set(grades.map((grade) => grade.Class!.Course!.name))
        );

        // Tạo dữ liệu sinh viên cho mỗi khoa
        const studentsData: StudentData[] = Object.values(
          grades.reduce((acc: { [studentId: number]: StudentData }, grade) => {
            const studentId = grade.student_id;
            if (!acc[studentId]) {
              acc[studentId] = {
                studentName: grade.Student!.name,
                scores: {},
              };
            }
            acc[studentId].scores[grade.Class!.Course!.name] =
              grade.summary_score ?? "-";
            return acc;
          }, {})
        );

        return (
          <div key={faculty} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {faculty}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Họ tên</th>
                    {uniqueCourses.map((courseName) => (
                      <th
                        key={courseName}
                        className="px-4 py-2 text-left border-b"
                      >
                        {courseName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {studentsData.map((studentData, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 border-b border-r">
                        {studentData.studentName}
                      </td>
                      {uniqueCourses.map((courseName) => (
                        <td
                          key={courseName}
                          className="px-4 py-2 border-b border-r"
                        >
                          {studentData.scores[courseName] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MiddlewareAuthor(IndexPage, [
  Position.EDUCATION,
  Position.HEAD_EDUCATION,
  Position.SECRETARY,
]);
