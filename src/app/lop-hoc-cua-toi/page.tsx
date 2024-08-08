"use client";
import {
  Button,
  Select,
  Typography,
  Option,
  IconButton,
} from "@material-tailwind/react";
import { Position, User } from "../models/User";
import {
  deleteClass,
  fetchManagerClass,
  fetchMyClasses,
  fetchUsers,
} from "../services/service";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import Pagination from "../components/paging";
import { AlertType, useAlert } from "../components/Alert/alertbase";
import { MiddlewareAuthor } from "../middleware/Author";
import { Enrollment } from "../models/Enrollment";

function MyClasses() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<Enrollment[]>([]);
  const [classesCurent, setClassesCurent] = useState<Enrollment[]>([]);
  const { addAlert } = useAlert();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchTerm === "") {
      setClassesCurent(classesCurent);
    }
    const searchWords = searchTerm
      .split(" ")
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word.length > 0);

    const filteredClasses = classesCurent.filter((clas) => {
      const userId = clas.class_id.toString().toLowerCase();
      const name = clas.Class?.name.toLowerCase();

      return searchWords.every(
        (word) => userId.includes(word) || name?.includes(word)
      );
    });

    setClasses(filteredClasses);
  };
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await fetchMyClasses();
        setClasses(data);
        setClassesCurent(data);
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu danh sách lớp học:" + err);
        setLoading(false);
      }
    };

    loadClasses();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative flex flex-col pb-20 w-full h-full overflow-scroll text-gray-700 bg-white shadow-md ">
      <div className="flex justify-between items-center">
        <Typography variant="h4" color="blue-gray" className="py-5 pl-5">
          Danh sách lớp học
        </Typography>
        <div className="flex justify-center">
          <div className="flex justify-center">
            <div className="relative h-10 w-full min-w-[200px] mr-2">
              <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
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
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Tìm kiếm
              </label>
            </div>
            <Button
              ripple={true}
              color="blue"
              className="w-40"
              onClick={() => {
                setSearchTerm("");
                setClasses(classes);
              }}
            >
              Xóa tìm kiếm
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-center">
        {classes.map((classes) => (
          <a
            key={classes.class_id}
            href={`/lop-hoc/${classes.class_id}`}
            className="w-1/4 px-4 py-4 mx-4 my-4 h-96 rounded-lg text-center"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <p className="text-xl font-bold">{classes.Class?.name}</p>
            <p className="py-4">Lịch học: {classes.Class?.schedule}</p>
            <img
              src="/images/class.png"
              alt=""
              className="w-72 object-contain text-center"
            />
          </a>
        ))}
      </div>

      <Pagination
        data={classes}
        itemsPerPageOptions={[1, 2, 5, 10, 20, 50]}
        onPageChange={setClasses}
      />
    </div>
  );
}
export default MiddlewareAuthor(MyClasses, [Position.STUDENT]);
