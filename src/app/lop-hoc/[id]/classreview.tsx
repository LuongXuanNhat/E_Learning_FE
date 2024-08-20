"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import YouTubePlayer from "@/app/components/youtubeplayer";
import { MiddlewareAuthen } from "@/middleware/Authen";
import { Feedback } from "@/models/Feedback";
import { Lession } from "@/models/Lession";
import { Position } from "@/models/User";
import IsRole, { getCookieUser } from "@/services/authService";
import {
  createFeedback,
  createLession,
  deleteLession,
  fetchFeedbacks,
  fetchLessions,
  getLessionById,
  updateLession,
} from "@/services/service";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

function ClassReview({ id }: { id: number }) {
  const [isShow, setIsShow] = useState(true);
  const [canRole, setRole] = useState(false);
  const [titleEditor, setTitleEditor] = useState(false);
  const [feedkback, setFeedkback] = useState<Feedback>({
    class_id: 0,
    created_at: new Date(),
    content: "",
    feedback_id: 0,
    user_id: 0,
  });
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const { addAlert } = useAlert();

  useEffect(() => {
    setRole(IsRole([Position.STUDENT]));
    fetchLessionData();
  }, []);

  const showEditor = () => {
    setIsShow(!isShow);
  };

  const fetchLessionData = async () => {
    const data = await fetchFeedbacks(id);
    setFeedbacks(data);
  };

  const handlePost = async () => {
    try {
      if (feedkback.content.trim().length < 15) {
        addAlert(AlertType.info, "Nội dung đánh giá quá ngắn!");
        return;
      }
      feedkback.class_id = id;
      //   if (titleEditor) await updateFeedback(feedkback);

      feedkback.user_id = await getCookieUser()!.user_id;
      await createFeedback(feedkback);
      showEditor();
      fetchLessionData();
      addAlert(
        AlertType.success,
        `${titleEditor ? "Cập nhật" : "Đăng"} đánh giá thành công`
      );
      feedkback.content = "";
    } catch (error) {
      addAlert(AlertType.error, "Có lỗi xảy ra: " + error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeedkback((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const editLession = async (id: number) => {
    setTitleEditor(true);
    const lessionData = await getLessionById(id);
    setFeedkback(lessionData);
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
                    Đánh giá lớp học
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Học viên có thể phản ánh chất lượng dạy học tại đây dựa vào
                    một tiêu chí như: Thái độ giảng viên, chất lượng bài giảng,
                    .... (Bài đánh giá sẽ được gửi về tới cố vấn học tập & Bạn
                    lưu ý không thể sửa/xóa bài đánh giá)
                  </p>
                </div>
                <img
                  className="object-cover ml-auto w-full rounded-t-lg h-32 md:h-auto md:w-48 md:rounded-none md:rounded-e-lg"
                  src="/images/handsup.jpg"
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
                          name="content"
                          label="Nội dung phản ánh/đánh giá (*)"
                          crossOrigin=""
                          size="lg"
                          className=""
                          value={feedkback.content}
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
            {feedbacks.map((lession) => (
              <div key={lession.feedback_id} className="">
                <div className="flex flex-col  lg:flex-row">
                  <div className="md:w-96 pt-8">
                    <p className="font-bold">
                      {" "}
                      {lession.User?.name} đã đánh giá
                    </p>
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
                          onClick={() => editLession(lession.feedback_id)}
                          color="amber"
                          className="px-4 py-2 mr-4 rounded-md"
                        >
                          Sửa
                        </Button>
                        <Button
                          color="deep-orange"
                          className="px-4 py-2 rounded-md"
                          onClick={() =>
                            deleteLessionClass(lession.feedback_id)
                          }
                        >
                          Xóa
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="w-full bg-white shadow-md rounded-lg p-6">
                    <Typography variant="h6">{lession.content}</Typography>
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
export default MiddlewareAuthen(ClassReview);
