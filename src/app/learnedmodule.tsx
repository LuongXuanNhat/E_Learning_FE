import { memo, useEffect, useState } from "react";
import { Enrollment } from "../models/Enrollment";
import { useAlert } from "./components/Alert/alertbase";
import { fetchMyClasses, getGradeByMultiId } from "../services/service";
import Loading from "./components/loading";
import { Button, Card, Typography } from "@material-tailwind/react";
import { format } from "date-fns";

export function MyLearnedModule() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<Enrollment[]>([]);
  const [classesCurent, setClassesCurent] = useState<Enrollment[]>([]);
  const [passStatus, setPassStatus] = useState<any>();
  const [grade, setGrade] = useState(0);

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
      const name = clas.Class!.Course!.name.toLowerCase();

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
  useEffect(() => {
    const loadPassStatus = async () => {
      const statusPromises = classes
        .filter((classItem) => classItem.course_id !== null)
        .map(async (classItem) => {
          const status = await checkPass(
            classItem.course_id,
            classItem.class_id
          );
          return [classItem.class_id, status];
        });

      const statuses = await Promise.all(statusPromises);
      const statusObject = Object.fromEntries(statuses);

      setPassStatus(statusObject);
    };

    loadPassStatus();
  }, [classes]);

  const checkPass = async (course_id: number, class_id: number) => {
    try {
      const result = await getGradeByMultiId(class_id, course_id);

      return result;
    } catch (error) {
      console.error("Error checking pass status:", error);
      return "Unknown";
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
    <div className="relative flex flex-col pb-20 w-full h-full overflow-scroll text-gray-700 bg-white shadow-md ">
      <div className="flex justify-between items-center">
        <Typography
          as="span"
          variant="h4"
          color="blue-gray"
          className="py-5 pl-5"
        >
          Danh sách học phần của tôi
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
              className="w-full"
              onClick={() => {
                setSearchTerm("");
                setClasses(classesCurent);
              }}
            >
              Xóa tìm kiếm
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-center">
        {classes
          .filter((classItem) => classItem.course_id !== null)
          .map((classItem) => (
            <div
              key={classItem.class_id}
              className="w-full md:w-1/2 lg:w-1/3 p-4"
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold  text-primary">
                      {classItem.Class?.Course?.name}
                    </h3>
                    <div>
                      {new Date(classItem.Class!.Course!.start_date) <=
                        new Date() &&
                      new Date(classItem.Class!.Course!.end_date) >=
                        new Date() ? (
                        <img
                          src="images/process.png"
                          alt=""
                          className="w-10 h-10"
                        />
                      ) : passStatus[classItem.class_id] != null &&
                        passStatus[classItem.class_id] >= 5 ? (
                        <img src="images/pass.png" className="w-10 h-10" />
                      ) : (
                        <img src="images/fail.png" className="w-10 h-10" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-600 flex-grow">
                    {classItem.Class?.ClassSchedules &&
                    classItem.Class?.ClassSchedules.length > 0 ? (
                      <div>
                        {classItem.Class?.ClassSchedules.map(
                          (classSchedule) => (
                            <div
                              key={classSchedule.class_schedule_id}
                              className="mb-2 last:mb-0"
                            >
                              <p className="font-semibold text-blue-gray-900">
                                {classSchedule.Schedule?.name || "Không có tên"}
                              </p>
                              <div className="flex">
                                <p className="text-sm text-blue-gray-600 mr-4">
                                  {classSchedule.Schedule?.description ||
                                    "Không có mô tả"}
                                </p>
                                <p className="text-sm text-blue-gray-500">
                                  Thứ: {classSchedule.dayOfWeek}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500  text-sm">Chưa có lịch học</p>
                    )}

                    <div className="flex items-center gap-2 justify-between">
                      <span>
                        {format(
                          new Date(
                            classItem.Class!.Course!.start_date.toString()
                          ),
                          "dd/MM/yyyy"
                        )}
                        {" - "}
                        {format(
                          new Date(
                            classItem.Class!.Course!.end_date.toString()
                          ),
                          "dd/MM/yyyy"
                        )}
                      </span>
                      <strong className="font-bold">
                        {passStatus[classItem.class_id]}
                      </strong>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
