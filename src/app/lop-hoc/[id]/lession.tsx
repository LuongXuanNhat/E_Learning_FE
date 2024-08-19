"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import YouTubePlayer from "@/app/components/youtubeplayer";
import { Lession } from "@/app/models/Lession";
import { Position } from "@/app/models/User";
import IsRole from "@/app/services/authService";
import {
  createLession,
  deleteLession,
  fetchLessions,
  getLessionById,
  updateLession,
} from "@/app/services/service";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function LessionVideo({ id }: { id: number }) {
  const [isShow, setIsShow] = useState(true);
  const [canRole, setRole] = useState(false);
  const [titleEditor, setTitleEditor] = useState(false);
  const [lession, setLession] = useState<Lession>({
    class_id: 0,
    created_at: new Date(),
    description: "",
    LessionVideo_id: 0,
    link: "",
    title: "",
  });
  const [lessions, setLessions] = useState<Lession[]>([]);
  const { addAlert } = useAlert();

  useEffect(() => {
    setRole(
      IsRole([Position.ADVISOR, Position.SUB_TEACHER])
    );

    fetchLessionData();
  }, []);

  const showEditor = () => {
    setIsShow(!isShow);
  };

  const fetchLessionData = async () => {
    const data = await fetchLessions(id);
    setLessions(data);
  };
  function isValidYouTubeUrl(url: string) {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})$/;
    return regex.test(url);
  }

  const handlePost = async () => {
    try {
      if (lession.title.trim().length < 10) {
        addAlert(AlertType.info, "Tiêu đề quá ngắn!");
        return;
      }
      if (isValidYouTubeUrl(lession.link)) {
        addAlert(
          AlertType.info,
          "Link video youtube không hợp lệ! Bạn hãy kiểm tra lại"
        );
        return;
      }

      lession.class_id = id;
      if (titleEditor) await updateLession(lession);
      else await createLession(lession);
      showEditor();
      fetchLessionData();
      addAlert(
        AlertType.success,
        `${titleEditor ? "Cập nhật" : "Đăng"} bài giảng thành công`
      );
      lession.description = "";
      lession.link = "";
      lession.title = "";
    } catch (error) {
      addAlert(AlertType.error, "Có lỗi xảy ra: " + error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLession((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const editLession = async (id: number) => {
    setTitleEditor(true);
    const lessionData = await getLessionById(id);
    setLession(lessionData);
    showEditor();
  };
  const deleteLessionClass = async (lession_id: number) => {
    try {
      await deleteLession(lession_id);
      await fetchLessionData();
      addAlert(AlertType.success, "Xóa bài giảng thành công");
    } catch (error) {
      addAlert(AlertType.error, "Có lỗi xảy ra: " + error);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full">
          {canRole && (
            <div>
              <button
                onClick={showEditor}
                className="flex flex-col w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex flex-col ml-auto justify-between p-4 leading-normal ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Đăng bài giảng video
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Đăng bài giảng video tới học viên... Giúp học viên tiếp cận
                    được nguồn giảng dạy chất lượng nhất...
                  </p>
                </div>
                <img
                  className="object-cover ml-auto w-full rounded-t-lg h-32 md:h-auto md:w-48 md:rounded-none md:rounded-e-lg"
                  src="/images/lession.jpg"
                />
              </button>
              <div className="w-full my-4" hidden={isShow}>
                <div className="flex justify-end mb-4">
                  <Button onClick={showEditor} className="mx-2" color="gray">
                    Hủy
                  </Button>
                  <Button color="blue" ripple={true} onClick={handlePost}>
                    {titleEditor ? "Cập nhật" : "Đăng"}
                  </Button>
                </div>
                <form
                  className="mt-8 mb-2 w-full max-w-screen-lg sm:w-[1200px]"
                  onSubmit={handlePost}
                >
                  <div className="mb-1 flex flex-col gap-6">
                    <div className="flex justify-between">
                      <div className="mx-4 w-full">
                        <Input
                          name="title"
                          label="Tiêu đề bài giảng (*)"
                          crossOrigin=""
                          size="lg"
                          className=""
                          value={lession.title}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="mx-4 w-full">
                        <Input
                          name="link"
                          label="Url video (*)"
                          crossOrigin=""
                          type="url"
                          size="lg"
                          className=" "
                          value={lession.link}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="mx-4 w-full">
                        <Textarea
                          name="description"
                          label="Mô tả"
                          rows={2}
                          size="lg"
                          className=" "
                          value={lession.description}
                          onChange={() => handleInputChange}
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
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-96"></div>
      </div>
      <div>
        <div className="mx-auto px-4 py-8">
          <div className="space-y-6">
            {lessions.map((lession) => (
              <div key={lession.LessionVideo_id} className="">
                <div className="flex flex-col  lg:flex-row">
                  <div className="md:w-96 pt-8">
                    <p className="font-bold"> {lession.title}</p>
                    <p className="text-sm text-gray-600">
                      ngày:{" "}
                      {format(
                        new Date(lession.created_at || ""),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </p>
                    {IsRole([
                      Position.ADVISOR,
                      Position.SUB_TEACHER,
                      Position.EDUCATION,
                    ]) && (
                      <div className="flex mt-2">
                        <Button
                          onClick={() => editLession(lession.LessionVideo_id)}
                          color="amber"
                          className="px-4 py-2 mr-4 rounded-md"
                        >
                          Sửa
                        </Button>
                        <Button
                          color="deep-orange"
                          className="px-4 py-2 rounded-md"
                          onClick={() =>
                            deleteLessionClass(lession.LessionVideo_id)
                          }
                        >
                          Xóa
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="w-full bg-white shadow-md rounded-lg p-6">
                    <YouTubePlayer link={lession.link} />
                    <Typography>{lession.description}</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
