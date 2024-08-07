"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import { Course, de_xuat_ten_khoa_hoc } from "@/app/models/Course";
import { User } from "@/app/models/User";
import { createCourse, createUser } from "@/app/services/service";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";

export default function IndexPage() {
  const { addAlert } = useAlert();
  const [course, setCourse] = useState<Course>({
    course_id: 0,
    name: "",
    description: "",
    status: "",
    start_date: "",
    end_date: "",
    image_url: null,
    registration_deadline: "",
    created_at: "",
  });

  const handleSelectChange = (name: string, value: string) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourse((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateData = () => {
    const requiredFields: (keyof Course)[] = [
      "description",
      "start_date",
      "end_date",
      "registration_deadline",
    ];

    // Kiểm tra các trường bắt buộc
    const missingFields = requiredFields.filter((field) => !course[field]);

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        const inputComponent = document.querySelector(`[name="${field}"]`);
        if (inputComponent) {
          // Thêm prop error
          inputComponent.classList.add("error");

          // Xử lý sự kiện focus để xóa error
          inputComponent.addEventListener("focus", function () {
            inputComponent.classList.remove("error");
          });
        }
      });
      return true;
    }

    if (course.name === "") {
      addAlert(AlertType.warning, "Hãy chọn khóa học/môn học");
      return true;
    }
    const startDate = new Date(course.start_date);
    const endDate = new Date(course.end_date);
    const deadlineDate = new Date(course.registration_deadline);
    if (startDate >= endDate) {
      addAlert(AlertType.warning, "Ngày bắt đầu phải nhỏ hơn ngày kết thúc.");
      return true;
    }
    if (deadlineDate > startDate) {
      addAlert(
        AlertType.warning,
        "Hạn đăng ký phải không được quá ngày bắt đầu."
      );
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validateData()) return;

      await createCourse(course);
      addAlert(AlertType.success, `Tạo học phần ${course.name} thành công`);
      course.name = "";
      course.description = "";
      course.start_date = "";
      course.end_date = "";
      course.registration_deadline = "";
    } catch (error) {
      console.error("Lỗi:", error);
      addAlert(
        AlertType.error,
        `Tạo học phần ${course.name} thất bại: ` + error
      );
    }
  };

  return (
    <div className="py-3">
      <Card color="transparent" shadow={false}>
        <div className="row flex flex-wrap">
          <div className=" px-2 flex justify-between items-center w-full">
            <Typography variant="h4" color="blue-gray">
              Thêm mới học phần
            </Typography>
            <a href="/quan-ly-hoc-phan">
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
                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Select
                      name="name"
                      label="Chọn khóa học (*)"
                      value={course.name}
                      onChange={(value: any) =>
                        handleSelectChange("name", value)
                      }
                    >
                      {Object.values(de_xuat_ten_khoa_hoc).map((khoaHoc) => (
                        <Option key={khoaHoc} value={khoaHoc}>
                          {khoaHoc}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="mx-4 w-full">
                    <Input
                      name="description"
                      label="Mô tả (*)"
                      crossOrigin=""
                      size="lg"
                      placeholder="Mô tả học phần"
                      className=""
                      value={course.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Input
                      name="start_date"
                      label="Ngày bắt đầu (*)"
                      crossOrigin=""
                      type="date"
                      size="lg"
                      placeholder="01/01/2000"
                      className=" "
                      value={course.start_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mx-4 w-full">
                    <Input
                      name="end_date"
                      label="Ngày kết thúc (*)"
                      crossOrigin=""
                      type="date"
                      size="lg"
                      placeholder="01/02/2000"
                      className=" "
                      value={course.end_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mx-4 w-full">
                    <Input
                      name="registration_deadline"
                      label="Ngày hết hạn đăng ký học phần (*)"
                      crossOrigin=""
                      type="date"
                      size="lg"
                      placeholder="01/02/2000"
                      className=" "
                      value={course.registration_deadline}
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
