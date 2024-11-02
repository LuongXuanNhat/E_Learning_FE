"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import { MiddlewareAuthor } from "@/middleware/Author";
import { Faculty } from "@/models/Faculty";
import {
  getPositionFromString,
  Position,
  PositionLabels,
  Rank,
  User,
} from "@/models/User";
import { createUser, fetchFaculties } from "@/services/service";
import {
  Card,
  Input,
  Option,
  Button,
  Typography,
  Radio,
  input,
  Select,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

function IndexPage() {
  const { alerts, addAlert } = useAlert();
  const [dataFaculties, setDataFaculty] = useState<Faculty[]>([]);

  const [user, setUser] = useState<User>({
    user_id: 0,
    username: "",
    name: "",
    cap_bac: "",
    chuc_vu: PositionLabels[Position.STUDENT],
    email: "",
    password: "",
    role: Position.STUDENT,
    avatar_url: null,
    is_active: true,
    created_at: "",
    faculty_id: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFaculties();
        setDataFaculty(data);
      } catch (error) {
        addAlert(AlertType.info, "Lỗi lấy danh sách môn học: " + error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const validateData = () => {
    const requiredFields: (keyof User)[] = [
      "username",
      "name",
      "cap_bac",
      "chuc_vu",
      "email",
      "password",
    ];

    // Kiểm tra các trường bắt buộc
    const missingFields = requiredFields.filter((field) => !user[field]);

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

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      addAlert(AlertType.info, `email không hợp lệ`);
      return true;
    }

    // Kiểm tra độ dài mật khẩu (ví dụ: tối thiểu 6 ký tự)
    if (user.password.length < 6) {
      addAlert(AlertType.info, `Mật khẩu phải có ít nhất 6 ký tự`);
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validateData()) return;
      await createUser(user);
      addAlert(AlertType.success, `Tạo tài khoản ${user.username} thành công`);
      setUser((prevUser) => ({
        ...prevUser,
      }));
    } catch (error) {
      console.error("Lỗi:", error);
      addAlert(
        AlertType.error,
        `Tạo tài khoản ${user.username} thất bại: ` + error
      );
    }
  };

  return (
    <div className="py-3">
      <Card color="transparent" shadow={false}>
        <div className="row flex flex-wrap">
          <div className=" px-2 flex justify-between items-center w-full">
            <Typography variant="h4" color="blue-gray">
              Thêm mới tài khoản sinh viên
            </Typography>
            <a href="/quan-ly-sinh-vien">
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
                      name="username"
                      label="Mã số / Tên tài khoản (*)"
                      crossOrigin=""
                      size="lg"
                      placeholder="2011064280 hay nguyenvana"
                      className=""
                      value={user.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mx-4 w-full">
                    <Input
                      name="name"
                      label="Họ và tên (*)"
                      crossOrigin=""
                      size="lg"
                      placeholder="Nguyễn Văn A"
                      className=""
                      value={user.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Select
                      name="subject_id"
                      label="Chọn khoa/viện (*)"
                      key={user.faculty_id}
                      value={user.faculty_id.toString()}
                      onChange={(value: any) =>
                        handleSelectChange("faculty_id", value)
                      }
                    >
                      {dataFaculties.map((faculty) => (
                        <Option
                          key={faculty.faculty_id}
                          value={faculty.faculty_id.toString()}
                        >
                          {faculty.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Select
                      name="chuc_vu"
                      label="Chọn chức vụ (*)"
                      value={user.chuc_vu}
                      disabled={true}
                    >
                      {Object.values(Position).map((chuc_vu) => (
                        <Option key={chuc_vu} value={PositionLabels[chuc_vu]}>
                          {PositionLabels[chuc_vu]}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="mx-4 w-full">
                    <Select
                      name="cap_bac"
                      label="Chọn cấp bậc (*)"
                      value={user.cap_bac}
                      onChange={(value: any) =>
                        handleSelectChange("cap_bac", value)
                      }
                    >
                      {Object.values(Rank).map((cap_bac) => (
                        <Option key={cap_bac} value={cap_bac}>
                          {cap_bac}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Input
                      name="email"
                      label="Email (*)"
                      type="email"
                      crossOrigin=""
                      size="lg"
                      placeholder="nguyenvana@gmail.com"
                      className=" "
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mx-4 w-full">
                    <Input
                      name="password"
                      label="Mật khẩu (*)"
                      crossOrigin=""
                      type="passwword"
                      size="lg"
                      placeholder="Nhập cấp bậc"
                      className=" "
                      value={user.password}
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
export default MiddlewareAuthor(IndexPage, [
  Position.EDUCATION,
  Position.HEAD_EDUCATION,
]);
