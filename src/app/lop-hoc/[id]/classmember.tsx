"use client";

import { Class } from "@/app/models/Classes";
import { Enrollment } from "@/app/models/Enrollment";
import { Position } from "@/app/models/User";
import IsRole from "@/app/services/authService";
import { fetchStudentClass, getClassById } from "@/app/services/service";
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";

export default function ClassMember({ id }: { id: number }) {
  const router = useRouter();
  const [classes, setClass] = React.useState<Class>({
    class_id: 0,
    isRegistered: false,
    name: "",
    description: "",
    advisor_id: 0,
    course_id: null,
    schedule: "",
    created_at: "",
    Course: {
      start_date: new Date(),
      end_date: new Date(),
      course_id: 0,
      created_at: "",
      description: "",
      image_url: "",
      name: "",
      registration_deadline: "",
      status: "",
    },
    Advisor: {
      user_id: 0,
      username: "",
      name: "",
      cap_bac: "",
      chuc_vu: "",
      email: "",
      password: "",
      role: Position.STUDENT,
      avatar_url: null,
      is_active: true,
      created_at: "",
    },
  });
  const addStudent = () => {
    router.push("/lop-hoc/them-hoc-vien/" + classes.class_id);
  };
  const fetchData = async () => {
    const dataClass = await getClassById(id);
    setClass(dataClass);

    const dataStudents = await fetchStudentClass(id);
    setStudents(dataStudents);
  };
  const [students, setStudents] = useState<Enrollment[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="px-10 mx-20">
        <div>
          <Typography variant="h5">Giáo viên</Typography>
          <div className="flex items-center py-4">
            <img
              src="/images/teacher.png"
              alt=""
              className="h-10 w-10 rounded-full object-contain mr-4"
            />
            <span className="text-xl">{classes.Advisor?.name}</span>
          </div>
          <hr />
        </div>
        <div>
          <div className="flex justify-between mt-4">
            <Typography variant="h5">Học viên</Typography>
            <div className="flex items-center">
              <Typography variant="h6">{students.length} bạn học</Typography>
              {IsRole([Position.EDUCATION]) && (
                <Button
                  className="px-4 py-2 rounded-md ml-4 bg-blue-500"
                  onClick={() => addStudent}
                >
                  Thêm học viên
                </Button>
              )}
            </div>
          </div>
          <div>
            {students.length > 0 ? (
              <ul>
                {students.map((enrollment) =>
                  enrollment.Student ? (
                    <li
                      key={enrollment.enrollment_id}
                      className="py-5 border-b-2"
                    >
                      {enrollment.Student.name}
                    </li>
                  ) : null
                )}
              </ul>
            ) : (
              <Typography variant="h6">Chưa có sinh viên</Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
