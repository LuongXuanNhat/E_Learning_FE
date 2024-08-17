"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import { Class } from "@/app/models/Classes";
import { Course } from "@/app/models/Course";
import { Position, PositionLabels, User } from "@/app/models/User";
import { createClass, fetchCourses, fetchUsers } from "@/app/services/service";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Option,
  Select,
  Alert,
} from "@material-tailwind/react";
import { format } from "date-fns";
import React from "react";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const { addAlert } = useAlert();
  const [classes, setClass] = React.useState<Class>({
    class_id: 0,
    isRegistered: false,
    name: "",
    description: "",
    advisor_id: 0,
    course_id: null,
    schedule: "",
    created_at: "",
  });
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  const [state, setState] = React.useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      const dataCourses = await fetchCourses();
      const currentDate = new Date();

      const filteredCourses = dataCourses.filter((item) => {
        const deadline = new Date(item.registration_deadline);
        return deadline.getTime() >= currentDate.getTime();
      });
      setCourses(filteredCourses);

      const dataUsers = await fetchUsers();
      const filteredUsers = dataUsers.filter((item) => {
        return (
          item.chuc_vu === PositionLabels[Position.ADVISOR] ||
          item.chuc_vu === PositionLabels[Position.SUB_TEACHER]
        );
      });
      setUsers(filteredUsers);

      setState(false);
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClass((classes) => ({
      ...classes,
      [name]: value,
    }));
  };
  const handleSelectChange = (name: string, value: any) => {
    console.log(value);
    setClass((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };
  const validateData = () => {
    const requiredFields: (keyof Class)[] = [
      "course_id",
      "class_id",
      "name",
      "schedule",
      "advisor_id",
    ];

    // Kiểm tra các trường bắt buộc
    const missingFields = requiredFields.filter((field) => !classes[field]);
    var countError = 0;
    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        const inputComponent = document.querySelector(`[name="${field}"]`);
        if (
          inputComponent &&
          !((field == "course_id" && state) || (field == "schedule" && state))
        ) {
          countError++;
          // Thêm prop error
          inputComponent.classList.add("error");

          // Xử lý sự kiện focus để xóa error
          inputComponent.addEventListener("focus", function () {
            inputComponent.classList.remove("error");
          });
        }
        if (
          inputComponent &&
          ((field == "course_id" && state) || (field == "schedule" && state))
        ) {
          inputComponent.classList.remove("error");
        }
      });
      return countError != 0;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validateData()) return;
      await createClass(classes);
      addAlert(AlertType.success, `Tạo lớp học: ${classes.name} thành công`);
    } catch (error) {
      console.error("Lỗi:", error);
      addAlert(
        AlertType.error,
        `Tạo lớp học ${classes.name} thất bại: ` + error
      );
    }
  };

  function CheckCourse() {
    return classes.course_id != null;
  }

  const getRegisterDate = React.useMemo(() => {
    const selectedCourse = courses.find(
      (course) => course.course_id == classes.course_id
    );
    if (!selectedCourse || !selectedCourse.registration_deadline) {
      return null;
    }
    return format(
      new Date(selectedCourse.registration_deadline),
      "dd-MM-yyyy HH:mm"
    );
  }, [courses, classes.course_id]);
  const getDurationDate = React.useMemo(() => {
    const selectedCourse = courses.find(
      (course) => course.course_id == classes.course_id
    );
    if (
      !selectedCourse ||
      !selectedCourse.start_date ||
      !selectedCourse.end_date
    ) {
      return null;
    }
    var startDate = format(new Date(selectedCourse.start_date), "dd/MM/yyyy");
    var endDate = format(new Date(selectedCourse.end_date), "dd/MM/yyyy");
    return " " + startDate + "  --  " + endDate;
  }, [courses, classes.course_id]);
  const isClassManager = () => {
    classes.course_id = null;
    classes.schedule = null;
    setState(!state);
  };

  return (
    <div className="py-3">
      <Card color="transparent" shadow={false}>
        <div className="row flex flex-wrap">
          <div className=" px-2 flex justify-between items-center w-full">
            <Typography variant="h4" color="blue-gray">
              Thêm mới lớp học
            </Typography>
            <a href="/quan-ly-lop-hoc">
              <Button
                ripple={true}
                className=""
                type="submit"
                variant="outlined"
              >
                Trở về
              </Button>
            </a>
          </div>

          <div className="w-full flex justify-center pl-10">
            <form
              className="mt-8 mb-2 w-full max-w-screen-lg sm:w-[1200px]"
              onSubmit={handleSubmit}
            >
              <div className="mb-1 flex flex-col gap-6">
                <div className="flex items-center">
                  <span className="mr-2 text-center">Là lớp học quản lý</span>
                  <Checkbox
                    crossOrigin=""
                    onClick={isClassManager}
                    checked={state}
                  ></Checkbox>
                </div>
                {CheckCourse() && (
                  <div className="flex float-end mx-4">
                    <Alert color="blue">
                      <span>Hạn đăng ký đến hết ngày </span>
                      <strong>{getRegisterDate}</strong>
                      <span className="ml-5">Thời gian diễn ra: </span>[
                      <strong>{getDurationDate}</strong> ]
                    </Alert>
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Input
                      name="name"
                      label="Tên lớp học (*)"
                      type="text"
                      crossOrigin=""
                      size="lg"
                      placeholder=""
                      className=" max-h-10"
                      value={classes.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mx-4 w-full">
                    <Select
                      name="advisor_id"
                      label="Chọn giảng viên (*)"
                      placeholder="Chọn giảng viên"
                      key={classes.advisor_id}
                      value={classes.advisor_id.toString()}
                      onChange={(value: any) =>
                        handleSelectChange("advisor_id", value)
                      }
                    >
                      {users.map((user) => (
                        <Option
                          key={user.user_id}
                          value={user.user_id.toString()}
                        >
                          {user.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Select
                      name="course_id"
                      label="Chọn khóa học (*)"
                      placeholder="Chọn khóa học"
                      key={classes.course_id}
                      value={classes.course_id?.toString()}
                      onChange={(value: any) =>
                        handleSelectChange("course_id", value)
                      }
                      disabled={state}
                    >
                      {courses.map((course) => (
                        <Option
                          key={course.course_id}
                          value={course.course_id.toString()}
                        >
                          {course.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="mx-4 w-full">
                    <Input
                      name="schedule"
                      label="Lịch dạy (*)"
                      crossOrigin=""
                      type="text"
                      size="lg"
                      placeholder=""
                      className="max-h-10"
                      disabled={state}
                      value={classes.schedule!}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Input
                      name="description"
                      label="Mô tả"
                      type="text"
                      crossOrigin=""
                      size="lg"
                      placeholder=""
                      className=" "
                      value={classes.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex float-end py-2 mx-4">
                <Typography className="text-xs text-red-500">
                  {" "}
                  (*) là không cho phép thiếu
                </Typography>
              </div>

              <Button
                ripple={true}
                className="mt-6 mx-4"
                type="submit"
                color="blue"
              >
                Tạo
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}