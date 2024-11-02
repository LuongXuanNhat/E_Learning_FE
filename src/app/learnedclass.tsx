import { memo, useEffect, useState } from "react";
import { Enrollment } from "../models/Enrollment";
import {
  fetchMyClasses,
  getGradeByMultiId,
  getGradeByStudent,
} from "../services/service";
import Loading from "./components/loading";
import { Button, Card, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { sub_grade } from "@/models/Grade";

export function MyLearnedClass() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<Enrollment[]>([]);
  const [classesCurent, setClassesCurent] = useState<Enrollment[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchTerm === "") {
      setClassesCurent(classesCurent);
    }
    const searchWords = searchTerm
      .split(" ")
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word.length > 0);

    const filteredClasses = classesCurent.filter((clas) => {
      const userId = clas.class_id.toString().toLowerCase();
      const name = clas.Class!.Course!.name.toLowerCase();

      return searchWords.every(
        (word) => userId.includes(word) || name?.includes(word)
      );
    });

    setClasses(filteredClasses);
  };

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await fetchMyClasses();
        const classesWithGrades = await Promise.all(
          data
            .filter(
              (classItem) =>
                classItem.course_id !== null && classItem.class_id !== null
            )
            .map(async (classItem) => {
              const grade = await getGrade(
                classItem.course_id!,
                classItem.class_id!
              );
              return {
                ...classItem,
                content: grade.content,
                grade: grade.grade,
              };
            })
        );

        setClasses(classesWithGrades);
        setClassesCurent(classesWithGrades);
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu danh sách lớp học:" + err);
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  const getGrade = async (course_id: number, class_id: number) => {
    const grade = await getGradeByStudent(class_id, course_id);
    const existingSubGrade: sub_grade = { grade: 0, content: "" };
    return grade ?? existingSubGrade;
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="flex w-full h-full justify-center my-auto pt-10">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full p-6 bg-white">
      <Typography variant="h4" className="text-gray-900 mb-4">
        Thống kê học tập môn học
      </Typography>
      <div className="relative w-full mb-6">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearch}
          className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          placeholder="Tìm kiếm lớp học..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes
          .filter((classItem) => classItem.course_id !== null)
          .map((classItem) => (
            <Card key={classItem.class_id} className="p-6 shadow-lg">
              <Typography variant="h5" className="font-semibold mb-2">
                Lớp: {classItem.Class?.Course?.name}
              </Typography>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Điểm số:</span>
                <span className="font-bold text-lg">
                  {classItem.grade ?? 0}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-600">Nhận xét:</span>
                <span className="font-medium text-gray-800 pl-2">
                  {classItem.content || "Không có nhận xét"}
                </span>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
