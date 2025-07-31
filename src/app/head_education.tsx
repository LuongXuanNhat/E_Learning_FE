import { MiddlewareAuthor } from "@/middleware/Author";
import { Position, User } from "@/models/User";
import { getCookieUser } from "@/services/authService";
import { useEffect, useState } from "react";

export function HeadEducationHome() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const user = getCookieUser();
    setUser(user!);
  }, []);

  return (
    <div>
      <div className="pt-2">
        Xin chào <span className="text-light-blue-600">{user?.name}</span> !
      </div>
      <div className="container mx-auto py-10">
        <ul className="flex flex-wrap justify-center ">
          <li className="my-10 mx-3">
            <a
              href="/quan-ly-khoa-vien"
              className="rounded-md px-10 py-5 shadow  text-gray-900 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:shadow-lg"
            >
              Quản lý khoa viện
            </a>
          </li>
          <li className="my-10 mx-3">
            <a
              href="/educations"
              className="rounded-md px-10 py-5 shadow  text-gray-900 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:shadow-lg"
            >
              {" "}
              Danh sách nhân viên đào tạo
            </a>
          </li>
          <li className="my-10 mx-3">
            <a
              href="/secretaries"
              className="rounded-md px-10 py-5 shadow  text-gray-900 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:shadow-lg"
            >
              Danh sách thư ký khoa
            </a>
          </li>
          <li className="my-10 mx-3">
            <a
              href="/teachers"
              className="rounded-md px-10 py-5 shadow  text-gray-900 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:shadow-lg"
            >
              Danh sách giảng viên, cố vấn học tập
            </a>
          </li>
          <li className="my-10 mx-3">
            <a
              href="/students"
              className="rounded-md px-10 py-5 shadow  text-gray-900 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:shadow-lg"
            >
              Danh sách sinh viên
            </a>
          </li>
          <li className="my-10 mx-3">
            <a
              href="/xem-diem"
              className="rounded-md px-10 py-5 shadow  text-gray-900 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:shadow-lg"
            >
              Danh sách điểm
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
