"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import Loading from "@/app/components/loading";
import { MiddlewareAuthor } from "@/middleware/Author";
import { Course, de_xuat_ten_khoa_hoc } from "@/models/Course";
import { Subject } from "@/models/Subject";
import { Position, User } from "@/models/User";
import {
  createCourse,
  createUser,
  fetchSubjects,
  getCourseById,
  updateCourse,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSubject, setDataSubject] = useState<Subject[]>([]);

  const [course, setCourse] = useState<Course>({
    course_id: 0,
    subject_id: 0,
    name: "",
    description: "",
    status: "",
    start_date: "",
    end_date: "",
    image_url: null,
    registration_deadline: "",
    created_at: "",
  });

  const handleSelectChange = (name: string, value: any) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));

    const subject = dataSubject.find((x) => x.subject_id.toString() === value);
    if (subject) handleSelectChange("name", subject.name);
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
      "name",
      "subject_id",
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
      addAlert(AlertType.warning, "Hãy Chọn môn học/môn học");
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
    if (deadlineDate < new Date()) {
      addAlert(AlertType.warning, "Hạn đăng ký không hợp lệ.");
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validateData()) return;

      await updateCourse(course);
      addAlert(
        AlertType.success,
        `Cập nhập học phần ${course.name} thành công`
      );
    } catch (error) {
      console.error("Lỗi:", error);
      addAlert(
        AlertType.error,
        `Cập nhập học phần ${course.name} thất bại: ` + error
      );
    }
  };
  const fetchData = async () => {
    try {
      const data = await fetchSubjects();
      setDataSubject(data);
    } catch (error) {
      addAlert(AlertType.info, "Error fetching subjects: " + error);
    }
  };
  const loadCourse = async () => {
    try {
      const data = await getCourseById(params.id);

      const formattedData = {
        ...data,
        start_date: format(new Date(data.start_date), "yyyy-MM-dd"),
        end_date: format(new Date(data.end_date), "yyyy-MM-dd"),
        registration_deadline: format(
          new Date(data.registration_deadline),
          "yyyy-MM-dd"
        ),
      };
      setCourse(formattedData);
      setLoading(false);
    } catch (err) {
      addAlert(AlertType.error, "Có lỗi xảy ra khi tải dữ liệu học phần.");
      setError("");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params.id) {
      loadCourse();
      fetchData();
    } else {
      setError("Trang không tồn tại.");
    }
  }, []);

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
              Cập nhật học phần
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
                      name="subject_id"
                      label="Chọn môn học (*)"
                      key={course.subject_id}
                      value={course.subject_id.toString()}
                      onChange={(value: any) =>
                        handleSelectChange("subject_id", value)
                      }
                    >
                      {dataSubject.map((subject) => (
                        <Option
                          key={subject.subject_id}
                          value={subject.subject_id.toString()}
                        >
                          {subject.name}
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
                      value={course.start_date.toString()}
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
                      value={course.end_date.toString()}
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
                      value={course.registration_deadline.toString()}
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
                Cập nhập thông tin
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default MiddlewareAuthor(IndexPage, [Position.EDUCATION]);
