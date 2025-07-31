"use client";
import { Button, Select, Typography, Option } from "@material-tailwind/react";
import { deleteFaculty, fetchFaculties } from "../../services/service";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import Pagination from "../components/paging";
import { Faculty } from "../../models/Faculty";
import { format } from "date-fns";
import { AlertType, useAlert } from "../components/Alert/alertbase";
import { MiddlewareAuthor } from "../../middleware/Author";
import { Position, User } from "../../models/User";
import { getCookieUser } from "@/services/authService";
import { Tooltip as ReactTooltip } from "react-tooltip";

function FacultyManager() {
  const [hoveredFacultyId, setHoveredFacultyId] = useState(0);
  const [faculties, setFacultys] = useState<Faculty[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFacultys, setCurrentFacultys] = useState<Faculty[]>([]);
  const [originalFacultys, setOriginalFacultys] = useState<Faculty[]>([]);
  const { addAlert } = useAlert();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchTerm === "") {
      setFacultys(originalFacultys);
    }
    const searchWords = searchTerm
      .split(" ")
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word.length > 0);

    const filteredUsers = originalFacultys.filter((user) => {
      const userId = user.faculty_id.toString().toLowerCase();
      const name = user.name.toLowerCase();

      return searchWords.every(
        (word) => userId.includes(word) || name.includes(word)
      );
    });

    setFacultys(filteredUsers);
  };
  useEffect(() => {
    const loadFacultys = async () => {
      try {
        const getUser = getCookieUser();
        setUser(getUser!);
        const data = await fetchFaculties();
        setFacultys(data);
        setOriginalFacultys(data);
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu học phần: " + err);
        setLoading(false);
      }
    };

    loadFacultys();
  }, []);
  const deleteConfirm = async function (id: number) {
    try {
      await deleteFaculty(id);
      const data = await fetchFaculties();
      setFacultys(data);
      setOriginalFacultys(data);
      setLoading(false);
      addAlert(AlertType.success, "Đã xóa thành công.");
    } catch (err) {
      setError("Có lỗi xảy ra khi xóa dữ liệu khoa viện.");
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
    <div className="relative flex flex-col pb-20 w-full h-full overflow-scroll text-gray-700 bg-white">
      <div className="flex justify-between items-center p-4">
        <Typography variant="h4" color="blue-gray" className="py-5 pl-5">
          Danh sách khoa/viện
        </Typography>
        <div className="flex justify-center items-center">
          <div className="relative h-10 w-full min-w-[200px] mr-2">
            <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 !pr-9 text-sm text-blue-gray-700 outline-none"
              placeholder="Tìm kiếm"
            />
          </div>
          <Button
            ripple={true}
            color="blue"
            className="w-48"
            onClick={() => {
              setSearchTerm("");
              setFacultys(originalFacultys);
            }}
          >
            Xóa tìm kiếm
          </Button>
          <a href="/quan-ly-khoa-vien/them-moi" className="ml-2">
            <Button
              ripple={true}
              color="green"
              hidden={user?.role != Position.HEAD_EDUCATION}
            >
              Thêm mới khoa/viện
            </Button>
          </a>
        </div>
      </div>

      {/* Grid layout for cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {currentFacultys.map((faculty: Faculty) => (
          <div
            key={faculty.faculty_id}
            className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            data-tooltip-id={`faculty-tooltip-${faculty.faculty_id}`}
            onMouseEnter={() => setHoveredFacultyId(faculty.faculty_id)}
            onMouseLeave={() => setHoveredFacultyId(0)}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-600 mr-2">
                  ID: {faculty.faculty_id}
                </span>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  {faculty.code}
                </span>
              </div>
            </div>

            <div className="mb-4 bg-gradient-to-r from-yellow-300 to-orange-400 ">
              <h3 className="text-lg font-bold text-gray-900 text-center uppercase py-14">
                {faculty.name}
              </h3>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Ngày tạo:{" "}
                {format(new Date(faculty.created_at), "dd-MM-yyyy HH:mm")}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <a
                href={`/quan-ly-khoa-vien/${faculty.faculty_id}`}
                className="w-1/2 mr-2"
              >
                <Button
                  hidden={user?.role != Position.HEAD_EDUCATION}
                  color="amber"
                  variant="outlined"
                  className="w-full capitalize"
                >
                  Chỉnh sửa
                </Button>
              </a>
              <Button
                hidden={user?.role != Position.HEAD_EDUCATION}
                color="red"
                variant="outlined"
                className="w-1/2 capitalize"
                onClick={() => deleteConfirm(faculty.faculty_id)}
              >
                Xóa
              </Button>
            </div>
            <ReactTooltip
              id={`faculty-tooltip-${faculty.faculty_id}`}
              place="top"
              content={
                faculty.Classes!.length > 0
                  ? faculty.Classes!.map((c) => c.name).join("\n")
                  : "Không có lớp nào"
              }
              style={{ whiteSpace: "pre-line" }}
            />
          </div>
        ))}
      </div>

      <Pagination
        data={faculties}
        itemsPerPageOptions={[1, 4, 8, 12, 16, 50]}
        onPageChange={setCurrentFacultys}
      />

      {/* Add ReactTooltip component */}
    </div>
  );
}
export default MiddlewareAuthor(FacultyManager, [
  Position.HEAD_EDUCATION,
  Position.EDUCATION,
]);
