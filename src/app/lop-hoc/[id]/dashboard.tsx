"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import EditorHTML from "@/app/components/editor";
import { Blog } from "@/app/models/Blog";
import { deleteBlog, getBlogOfClass, saveBlog } from "@/app/services/service";
import { Button } from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

export default function DashboardclassName({ id }: { id: number }) {
  const [isShow, setIsShow] = useState(true);
  const [blogs, setCurrentBlog] = useState<Blog[]>([]);
  const [editorContent, setEditorContent] = useState("");
  const { addAlert } = useAlert();

  const fetchBlogData = async () => {
    try {
      const data = await getBlogOfClass(id);
      setCurrentBlog(data);
    } catch (error) {
      addAlert(AlertType.error, "Có lỗi lấy bài đăng:" + error);
    }
  };
  useEffect(() => {
    fetchBlogData();
  }, []);

  const showEditor = () => {
    setIsShow(!isShow);
  };

  const handleEditorContent = (content: string) => {
    setEditorContent(content);
  };

  const handlePost = async () => {
    try {
      await saveBlog(editorContent, id);
      showEditor();
      fetchBlogData();
      addAlert(AlertType.success, "Đăng bài thành công");
    } catch (error) {
      addAlert(AlertType.error, "Có lỗi xảy ra: " + error);
    }
  };
  const deleteBlogClass = async (blog_id: number) => {
    try {
      await deleteBlog(blog_id);
      fetchBlogData();
      addAlert(AlertType.success, "Xóa bài thành công");
    } catch (error) {
      addAlert(AlertType.error, "Có lỗi xảy ra: " + error);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="md:w-96"></div>
        <div className="w-full">
          <button
            onClick={showEditor}
            className="flex flex-col w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-32 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="/images/study.jpg"
            />
            <div className="flex flex-col justify-between p-4 leading-normal ">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Tạo thông báo
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Tạo bài viết thông báo tới học viên... Bạn có thể gửi tài liệu
                hoặc bài tập...
              </p>
            </div>
          </button>
          <div className="w-full my-4" hidden={isShow}>
            <div className="flex justify-end mb-4">
              <Button onClick={showEditor} className="mx-2" color="gray">
                Hủy
              </Button>
              <Button onClick={handlePost} color="blue">
                Đăng
              </Button>
            </div>
            <EditorHTML onContentChange={handleEditorContent} />
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto px-4 py-8">
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div key={blog.blog_id} className="">
                <div className="flex flex-col  lg:flex-row">
                  <div className="md:w-96 pt-8">
                    <p className="font-bold">{blog.Teacher?.name}</p>
                    <p className="text-sm text-gray-600">
                      Đăng ngày:{" "}
                      {format(
                        new Date(blog.created_at || ""),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </p>
                    <div className="flex mt-2">
                      <Button
                        color="amber"
                        className="px-4 py-2 mr-4 rounded-md"
                      >
                        Sửa
                      </Button>
                      <Button
                        color="deep-orange"
                        className="px-4 py-2 rounded-md"
                        onClick={() => deleteBlogClass(blog.blog_id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                  <div className="w-full bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <div
                      className="text-gray-800 mb-4"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
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
