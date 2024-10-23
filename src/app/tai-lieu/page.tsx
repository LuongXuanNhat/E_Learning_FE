"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import Loading from "@/app/components/loading";
import { Document } from "@/models/Document";
import { Position, PositionLabels, User } from "@/models/User";
import IsRole, { getCookieUser } from "@/services/authService";
import {
  apiBackend,
  createDocument,
  deleteDocument,
  fetchDocuments,
  getDocumentById,
  updateDocument,
  uploadDocument,
} from "@/services/service";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { MiddlewareAuthen } from "@/middleware/Authen";
import Pagination from "../components/paging";

function DocumentBank() {
  const [isShow, setIsShow] = useState(true);
  const [isRollCall, setIsRollCall] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocuments, setCurrentDocuments] = useState<Document[]>([]);
  const { addAlert } = useAlert();
  const [canRole, setRole] = useState(false);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [uploaded, setUploaded] = useState(false);
  const [isTookAttendance, setIsTookAttendance] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [titleEditor, setTitleEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [document, setDocument] = useState<Document>({
    author_id: 0,
    created_at: new Date(),
    description: "",
    document_id: 0,
    link: "",
    title: "",
    is_active: false,
  });
  const handleSearch = (searchValue: string) => {
    if (searchValue.trim() === "") {
      setDocuments(currentDocuments);
      return;
    }

    const searchWords = searchValue
      .toLowerCase()
      .split(" ")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    const filteredDocuments = currentDocuments.filter((doc) => {
      const title = doc.title.toLowerCase();
      const author = doc.Author!.name.toLowerCase();

      return searchWords.every(
        (word) => title.includes(word) || author.includes(word)
      );
    });

    setDocuments(filteredDocuments);
  };
  const editdocument = async (id: number) => {
    setTitleEditor(true);
    const documentData = await getDocumentById(id);
    setDocument(documentData);
    setIsShow(false);
  };
  useEffect(() => {
    setRole(IsRole([Position.ADVISOR, Position.SUB_TEACHER]));
    fetchDocumentData();

    const account = getCookieUser();
    setUser(account!);

    setLoading(false);
  }, []);

  const showEditor = () => {
    setIsShow(!isShow);
  };
  const fetchDocumentData = async () => {
    const data = await fetchDocuments();
    setDocuments(data);
    setCurrentDocuments(data);
  };
  const handlePost = async () => {
    try {
      if (document.title.trim().length < 10) {
        addAlert(AlertType.info, "Tiêu đề quá ngắn!");
        return;
      }

      if (titleEditor) await updateDocument(document);
      else await createDocument(document);
      showEditor();
      fetchDocumentData();
      addAlert(
        AlertType.success,
        `${titleEditor ? "Cập nhật" : "Đăng"} bài giảng thành công`
      );
      document.description = "";
      document.link = "";
      document.title = "";
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      addAlert(AlertType.error, "Có lỗi xảy ra: " + error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocument((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInputChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDocument((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInputChangeDocument = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (!validTypes.includes(file.type)) {
        addAlert(
          AlertType.info,
          "Vui lòng tải lên tệp định dạng .pdf, .doc, .docx, .pptx,.xlsx"
        );
        return;
      }

      const formData = new FormData();
      formData.append("document", file);

      try {
        const response = await uploadDocument(formData);
        if (response) {
          setDocument((prevdocument) => ({
            ...prevdocument,
            link: apiBackend + response,
          }));

          setUploaded(true);
          addAlert(AlertType.success, "Đã tải lên tài liệu.");
        } else {
          addAlert(AlertType.info, "Lỗi khi tải tài liệu.");
        }
      } catch (error) {
        addAlert(AlertType.error, "Lỗi khi xử lý tài liệu: " + error);
      }
    } else {
      document.link = "";
      setUploaded(false);
    }
  };
  const deleteDocumentStart = async (document_id: number) => {
    try {
      await deleteDocument(document_id);
      await fetchDocumentData();
      addAlert(AlertType.success, "Xóa tài liệu thành công");
    } catch (error) {
      addAlert(AlertType.error, "Có lỗi xảy ra: " + error);
    }
  };
  if (loading) return <Loading />;
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="md:w-96">
          {isRollCall &&
          !isTookAttendance &&
          user!.chuc_vu == PositionLabels[Position.STUDENT] ? (
            <Button color="green" ripple={true} onClick={handlePost}>
              Điểm danh hôm nay ({format(new Date(), "dd-MM-yyyy")})
            </Button>
          ) : isTookAttendance &&
            user!.chuc_vu == PositionLabels[Position.STUDENT] ? (
            <Button color="blue-gray" ripple={true}>
              Đã điểm danh ({format(new Date(), "dd-MM-yyyy")})
            </Button>
          ) : null}
        </div>
        {canRole && (
          <div className="w-full">
            <button
              onClick={showEditor}
              className="flex flex-col w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full rounded-t-lg h-32 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src="/images/document.jpg"
              />
              <div className="flex flex-col justify-between p-4 leading-normal ">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Tải lên tài liệu
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Upload tài liệu vào ngân hàng tài liệu càng thêm phong phú. Để
                  học viên dễ dàng tiếp cấn nhất đến nguồn tài nguyên học tập
                  dồi dào...
                </p>
              </div>
            </button>
            <div className="w-full my-4" hidden={isShow}>
              <div className="flex justify-end mb-4">
                <Button onClick={showEditor} className="mx-2" color="gray">
                  Hủy
                </Button>
                <Button onClick={handlePost} color="blue">
                  Gửi xét duyệt
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
                        label="Tiêu đề tài liệu (*)"
                        crossOrigin=""
                        autoComplete="title"
                        size="lg"
                        className=""
                        value={document.title}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="mx-4 w-full">
                      <Input
                        disabled={uploaded}
                        name="link"
                        label="Url document (*)"
                        crossOrigin=""
                        autoComplete="link"
                        type="url"
                        size="lg"
                        className=" "
                        value={document.link}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Input
                        ref={fileInputRef}
                        name="document"
                        label="Tải lên"
                        crossOrigin=""
                        type="file"
                        size="lg"
                        className=" "
                        accept=".doc,.docx,.pdf,.pptx,.xlsx"
                        onChange={handleInputChangeDocument}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="mx-4 w-full">
                      <Textarea
                        name="description"
                        autoComplete="description"
                        label="Mô tả"
                        rows={2}
                        size="lg"
                        className=" "
                        value={document.description}
                        onChange={(e) => handleInputChange2(e)}
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
      <div>
        <div className="mx-auto px-4 py-8">
          <div className="flex justify-center w-1/2 float-end">
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
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
              className="w-48"
              onClick={() => {
                setSearchTerm("");
                setDocuments(documents);
              }}
            >
              Xóa tìm kiếm
            </Button>
          </div>
          <div className="space-y-6 mt-14">
            {documents.map((document) => (
              <div key={document.document_id} className="">
                <div className="flex flex-col  lg:flex-row">
                  <div className="md:w-96 pt-8">
                    <p className="font-bold"> {document.title}</p>
                    <p className="text-sm text-gray-600">
                      ngày:{" "}
                      {format(
                        new Date(document.created_at || ""),
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
                          onClick={() => editdocument(document.document_id)}
                          color="amber"
                          className="px-4 py-2 mr-4 rounded-md"
                        >
                          Sửa
                        </Button>
                        <Button
                          color="deep-orange"
                          className="px-4 py-2 rounded-md"
                          onClick={() =>
                            deleteDocumentStart(document.document_id)
                          }
                        >
                          Xóa
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="w-full bg-white shadow-md rounded-lg p-6">
                    <div className="flex flex-wrap justify-between">
                      <Typography>Tác giả: {document.Author!.name}</Typography>
                      <a
                        href="#"
                        download={document.link}
                        className="text-blue-600 font-bold"
                      >
                        <Typography className="font-bold">Tải xuống</Typography>
                      </a>
                    </div>
                    <hr className="my-3" />
                    <Typography className="line-clamp-6">
                      {document.description}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            data={currentDocuments}
            itemsPerPageOptions={[1, 2, 5, 10, 20, 50]}
            onPageChange={setDocuments}
          />
        </div>
      </div>
    </div>
  );
}
export default MiddlewareAuthen(DocumentBank);
