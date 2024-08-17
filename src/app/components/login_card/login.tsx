import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { AlertType, useAlert } from "../Alert/alertbase";
import { LoginDto } from "./loginDto";
import { useState } from "react";
import { CookieName } from "@/app/models/keyCookie";
import { getCookie, login, removeCookie } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import { usePathname } from "next/dist/client/components/navigation";

export function LoginCard({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const { addAlert } = useAlert();
  const router = usePathname();
  const [user, setUser] = useState<LoginDto>({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user.username == "") {
        addAlert(AlertType.info, "Tài khoản đăng nhập trống!");
        return;
      }
      if (user.password == "") {
        addAlert(AlertType.info, "Bạn nhập thiếu mật khẩu!");
        return;
      }
      await login(user);
      addAlert(AlertType.success, `Đăng nhập thành công`);
      if (getCookie(CookieName.isReload)) {
        removeCookie(CookieName.isReload);
        window.location.reload();
        onLoginSuccess();
        return;
      }
      if (router == "/") {
        window.location.reload();
      }
      onLoginSuccess();
    } catch (error) {
      console.error("Lỗi:", error);
      addAlert(AlertType.error, `Đăng nhập thất bại: ` + error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <Card className="w-96">
      <form onSubmit={handleSubmit}>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 flex justify-center h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Đăng nhập
          </Typography>
          <img
            src="/images/logo.jpg"
            className="ml-2 mr-1 w-10 h-10 rounded-full"
          />
          <Typography variant="h3" color="white">
            E-Learning
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Tài khoản"
            size="lg"
            crossOrigin=""
            autoComplete="username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
          <Input
            label="Mật khẩu"
            size="lg"
            type="password"
            crossOrigin=""
            autoComplete="current-password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />

          <div className="-ml-2.5">
            <Checkbox label="Ghi nhớ tài khoản" crossOrigin="" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth type="submit">
            Đăng nhập
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Quên tài khoản?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Quên mật khẩu
            </Typography>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
}
