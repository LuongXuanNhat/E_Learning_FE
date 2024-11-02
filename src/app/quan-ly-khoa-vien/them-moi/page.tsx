"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import Loading from "@/app/components/loading";
import { MiddlewareAuthor } from "@/middleware/Author";
import { Faculty } from "@/models/Faculty";
import { Position, User } from "@/models/User";
import {
  createCourse,
  createFaculty,
  createUser,
  getCourseById,
  getFacultyById,
  updateCourse,
  updateFaculty,
} from "@/services/service";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

function IndexPage({ params }: { params: { id: number } }) {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [faculty, setFaculty] = useState<Faculty>({
    faculty_id: 0,
    code: "",
    name: "",
    is_active: true,
    created_at: new Date(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFaculty((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateData = () => {
    const requiredFields: (keyof Faculty)[] = ["name", "code"];

    // Kiểm tra các trường bắt buộc
    const missingFields = requiredFields.filter((field) => !faculty[field]);

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

    if (faculty.name === "") {
      addAlert(AlertType.warning, "Hãy chọn khoa/viện");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validateData()) return;

      await createFaculty(faculty);
      addAlert(
        AlertType.success,
        `Thêm mới khoa/viện ${faculty.name} thành công`
      );
      faculty.code = "";
      faculty.name = "";
    } catch (error) {
      console.error("Lỗi:", error);
      addAlert(
        AlertType.error,
        `Thêm mới khoa/viện ${faculty.name} thất bại: ` + error
      );
    }
  };
  const loadFaculty = async () => {
    try {
      const data = await getFacultyById(params.id);

      const formattedData = {
        ...data,
        start_date: format(new Date(data.start_date), "yyyy-MM-dd"),
        end_date: format(new Date(data.end_date), "yyyy-MM-dd"),
        registration_deadline: format(
          new Date(data.registration_deadline),
          "yyyy-MM-dd"
        ),
      };
      setFaculty(formattedData);
      setLoading(false);
    } catch (err) {
      addAlert(AlertType.error, "Có lỗi xảy ra khi tải dữ liệu khoa/viện.");
      setError("");
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="flex w-full h-full justify-center my-auto pt-10">
        {error}
      </div>
    );
  return (
    <div className="py-3">
      <Card color="transparent" shadow={false}>
        <div className="row flex flex-wrap">
          <div className=" px-2 flex justify-between items-center w-full">
            <Typography variant="h4" color="blue-gray">
              Cập nhật khoa/viện
            </Typography>
            <a href="/quan-ly-khoa-vien">
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
                    <Input
                      crossOrigin=""
                      name="code"
                      size="lg"
                      label="Mã khoa/viện (*)"
                      value={faculty.code}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mx-4 w-full">
                    <Input
                      name="name"
                      label="Tên khoa/viện (*)"
                      crossOrigin=""
                      size="lg"
                      placeholder="Tên khoa/viện"
                      className=""
                      value={faculty.name ?? ""}
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
                Thêm mới
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default MiddlewareAuthor(IndexPage, [Position.HEAD_EDUCATION]);
