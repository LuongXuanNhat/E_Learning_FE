"use client";
import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import Loading from "@/app/components/loading";
import { MiddlewareAuthor } from "@/app/middleware/Author";
import { Class } from "@/app/models/Classes";
import { Position, User } from "@/app/models/User";
import {
  fetchStudents,
  getClassById,
  updateMemberInClass,
} from "@/app/services/service";
import { Select, Option, Input, Button } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function AddStudent() {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedValues, setSelectedValues] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addAlert } = useAlert();
  const [classes, setClass] = useState<Class>();

  const router = usePathname();

  const getClass = async () => {
    const matches = router!.match(/\/lop-hoc\/(\d+)/);
    let class_id;
    if (matches && matches.length > 0) {
      class_id = matches[1];
    }

    console.log(class_id);
    const classId = Number(class_id);
    setClass(await getClassById(classId));
  };

  const fetchData = async () => {
    const dataStudents = await fetchStudents();
    setStudents(dataStudents);
  };

  useEffect(() => {
    getClass();
    setLoading(false);
    getClass();
  }, []);

  const handleSelectChange = (value: User) => {
    setSelectedValues((prevValues) => {
      if (prevValues.find((u) => u.user_id === value.user_id)) {
        return prevValues.filter((u) => u.user_id !== value.user_id);
      } else {
        return [...prevValues, value];
      }
    });
  };

  const handleRemoveStudent = (valueToRemove: User) => {
    setSelectedValues((prevValues) =>
      prevValues.filter((value) => value !== valueToRemove)
    );
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const updateMemberClass = async () => {
    if (selectedValues && selectedValues.length > 0) {
      console.log(selectedValues);
      try {
        await updateMemberInClass(
          selectedValues,
          classes!.class_id,
          classes!.course_id
        );

        addAlert(AlertType.success, "Cập nhập học viên trong lớp thành công");
      } catch (error) {
        addAlert(AlertType.error, "Có lỗi khi cập nhập học viên");
      }
    } else {
      addAlert(AlertType.info, "Vui lòng chọn học viên");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="pt-5 flex justify-between">
        <Select
          name="user_id"
          label="Chọn học viên (*)"
          key=""
          onChange={(value: string | undefined) => {
            const selectedUser = students.find(
              (student) => student.user_id.toString() === value
            );
            if (selectedUser) handleSelectChange(selectedUser);
          }}
          value={
            selectedValues.length > 0
              ? selectedValues[selectedValues.length - 1].user_id.toString()
              : ""
          }
        >
          <div className="p-2">
            <Input
              crossOrigin=""
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
          </div>
          {filteredStudents.map((student) => (
            <Option
              key={student.user_id.toString()}
              value={student.user_id.toString()}
            >
              {student.name}
            </Option>
          ))}
        </Select>
        <Button
          color="blue"
          className="ml-2"
          onClick={() => updateMemberClass()}
        >
          Thêm
        </Button>
      </div>
      <div className="pt-5">
        Danh sách chọn:{" "}
        {selectedValues.map((user, i) => (
          <div className="flex justify-between" key={i}>
            <div className="text-blue-500">
              {user.name + " - " + user.username}
            </div>
            <button
              onClick={() => handleRemoveStudent(user)}
              className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MiddlewareAuthor(AddStudent, [
  Position.EDUCATION,
  Position.SECRETARY,
]);
