"use client";

import bcrypt from "bcryptjs";
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
} from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import { MiddlewareAuthen } from "../../middleware/Authen";
import { getCookieUser, Logout } from "../../services/authService";
import { useRouter } from "next/navigation";

function IndexPage() {
  const { addAlert } = useAlert();
  const [loading, setLoading] = useState(true);
  const [pass, setPass] = useState(true);
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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newPassword.length < 6) {
        addAlert(AlertType.info, "Mật khẩu không khớp");
        return;
      }
      if (newPassword != confirmNewPassword) {
        addAlert(AlertType.info, "Mật khẩu không khớp");
        return;
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await updateUser(user);
      Logout();
      router.push("/");
      addAlert(
        AlertType.success,
        `Đổi mật khẩu thành công | Vui lòng đăng nhập lại`
      );
      window.location.reload();
    } catch (error) {
      console.error("Lỗi:", error);
      addAlert(AlertType.error, `Đổi mật khẩu thất bại: ` + error);
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
  const checkCurrentPassword = async () => {
    const check = await bcrypt.compare(currentPassword, user.password);

    console.log(check);
    console.log(currentPassword);
    if (check) setPass(false);
    else {
      addAlert(AlertType.info, "Sai mật khẩu");
      setCurrentPassword("");
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

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="flex w-full h-full justify-center my-auto pt-10">
        {error}
      </div>
    );

  function setValuePass(val: ChangeEvent<HTMLInputElement>): void {
    setCurrentPassword(val.target.value);
  }
  function setValueNewPass(val: ChangeEvent<HTMLInputElement>): void {
    setNewPassword(val.target.value);
  }
  function setConfirmValuePass(val: ChangeEvent<HTMLInputElement>): void {
    setConfirmNewPassword(val.target.value);
  }

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
                <div className="flex justify-between items-center">
                  <div className="mx-4 w-full">
                    <Input
                      name="password"
                      label="Mật khẩu hiện tại (*)"
                      crossOrigin=""
                      size="lg"
                      className=""
                      type="password"
                      onChange={(val) => setValuePass(val)}
                      value={currentPassword}
                    />
                  </div>
                  <div className="mx-4 w-full">
                    <Button
                      onClick={() => checkCurrentPassword()}
                      className="px-4 py-2 rounded-md  bg-blue-500"
                    >
                      Đặt mật khẩu mới
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mx-4 w-full">
                    <Input
                      label="Mật khẩu mới"
                      crossOrigin=""
                      type="password"
                      size="lg"
                      placeholder=""
                      className=" "
                      disabled={pass}
                      onChange={(val) => setValueNewPass(val)}
                      value={newPassword}
                    />
                  </div>
                  <div className="mx-4 w-full">
                    <Input
                      label="Nhập lại mật khẩu mới"
                      crossOrigin=""
                      type="password"
                      size="lg"
                      placeholder=""
                      className=" "
                      disabled={pass}
                      onChange={(val) => setConfirmValuePass(val)}
                      value={confirmNewPassword}
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
