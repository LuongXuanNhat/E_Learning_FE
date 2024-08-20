"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import Loading from "@/app/components/loading";
import {
  getPositionFromString,
  Position,
  PositionLabels,
  Rank,
  User,
} from "@/models/User";
import { createUser, getUserById, updateUser } from "@/services/service";
import {
  Card,
  Input,
  Button,
  Typography,
  Radio,
  Option,
  Select,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { MiddlewareAuthen } from "../../middleware/Authen";
import { getCookieUser } from "../../services/authService";

function IndexPage() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      await updateUser(user);
      addAlert(
        AlertType.success,
        `Cập nhập tài khoản ${user.username} thành công`
      );
    } catch (error) {
      console.error("Lỗi:", error);
      addAlert(
        AlertType.error,
        `Cập nhập tài khoản ${user.username} thất bại: ` + error
      );
    }
  };
  const fetchUser = async (id: number) => {
    try {
      const data = await getUserById(id);
      setUser(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      addAlert(AlertType.error, "Có lỗi xảy ra khi tải dữ liệu người dùng.");
      setError("");
      setLoading(false);
    }
  };

  let userCookie = getCookieUser();
  useEffect(() => {
    if (userCookie) {
      fetchUser(userCookie.user_id);
    } else {
      setError("Có lỗi xảy ra");
    }
  }, []);

  const handleSelectChange = (name: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  return (
    <div className="py-3">
      <Card color="transparent" shadow={false}>
        <div className="row flex flex-wrap">
          <div className="w-full flex justify-center px-10">
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
                      disabled={true}
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
                    <Input
                      label="Ngày sinh"
                      crossOrigin=""
                      type="date"
                      size="lg"
                      placeholder="01/01/2000"
                      className=" "
                    />
                  </div>
                  <div className="mx-4 w-full">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Giới tính
                    </Typography>
                    <div className="flex justify-around">
                      <Radio
                        name="sex"
                        color="blue"
                        crossOrigin=""
                        label={
                          <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                          >
                            Nam
                          </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                      />
                      <Radio
                        name="sex"
                        color="blue"
                        crossOrigin=""
                        label={
                          <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                          >
                            Nữ
                          </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Select
                      name="chuc_vu"
                      label="Chọn chức vụ (*)"
                      value={`Loại tài khoản: ` + user.chuc_vu}
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
                      disabled={true}
                    />
                  </div>
                  <div className="mx-4 w-full">
                    <Input
                      name="created"
                      label="Ngày tạo tài khoản"
                      crossOrigin=""
                      type="text"
                      size="lg"
                      className=" "
                      value={format(
                        new Date(user.created_at),
                        "dd-MM-yyyy HH:mm"
                      )}
                      disabled={true}
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
export default MiddlewareAuthen(IndexPage);
