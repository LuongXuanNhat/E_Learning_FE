import { Attendance } from "@/models/Attendance";
import { LoginDto } from "../app/components/login_card/loginDto";
import { Class } from "../models/Classes";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { Feedback } from "../models/Feedback";
import { Lession } from "../models/Lession";
import { Subject } from "../models/Subject";
import { Position, User } from "../models/User";
import { getCookieUser } from "./authService";
import { Grade, sub_grade } from "@/models/Grade";
import { Document } from "@/models/Document";
import { Blog } from "@/models/Blog";
import { Faculty } from "@/models/Faculty";
import { Schedule } from "@/models/Schedule";

// const apiBase = "http://192.168.1.83:3000/api";
export const apiBase = "http://localhost:3002/api";
export const apiBackend = "http://localhost:3002";

// USER
export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(apiBase + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function fetchTrainingDepartmentPersonal(): Promise<User[]> {
  const response = await fetchUsers();
  const users: User[] = await response;
  return users.filter((user) => user.role === Position.EDUCATION);
}

export async function fetchSecretaryDepartmentPersonal(): Promise<User[]> {
  const response = await fetchUsers();
  const users: User[] = await response;
  return users.filter((user) => user.role === Position.SECRETARY);
}

export async function fetchTeacherDepartmentPersonal(): Promise<User[]> {
  const response = await fetchUsers();
  const users: User[] = await response;
  return users.filter(
    (user) =>
      user.role === Position.SUB_TEACHER || user.role === Position.ADVISOR
  );
}

export async function fetchStudents(): Promise<User[]> {
  const response = await fetch(apiBase + "/users/student", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function createUser(userData: User) {
  userData.created_at = new Date();
  const response = await fetch(apiBase + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateUser(userData: User) {
  const response = await fetch(apiBase + "/users/" + userData.user_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteUser(id: number) {
  const response = await fetch(apiBase + "/users/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function getUserById(id: number) {
  const response = await fetch(apiBase + "/users/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

// COURSE
export async function fetchCourses(): Promise<Course[]> {
  const response = await fetch(apiBase + "/courses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function createCourse(userData: Course) {
  userData.created_at = new Date();
  userData.status = "1";
  const response = await fetch(apiBase + "/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateCourse(userData: Course) {
  const response = await fetch(apiBase + "/courses/" + userData.course_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteCourse(id: number) {
  const response = await fetch(apiBase + "/courses/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function getCourseById(id: number) {
  const response = await fetch(apiBase + "/courses/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

// CLASSES
export async function fetchClasses(): Promise<Class[]> {
  const response = await fetch(apiBase + "/classes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function fetchManagerClass(): Promise<Class[]> {
  const response = await fetch(apiBase + "/classes/t/1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function fetchMyClasses(): Promise<Enrollment[]> {
  const student_id = getCookieUser()?.user_id;
  const response = await fetch(apiBase + "/classes/myclasses/" + student_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function fetchTeacherClasses(): Promise<Class[]> {
  const teacher_id = getCookieUser()?.user_id;
  const response = await fetch(
    apiBase + "/classes/teacherclasses/" + teacher_id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function fetchCourseClass(): Promise<Class[]> {
  const response = await fetch(apiBase + "/classes/t/2", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function fetchClassRegisted(): Promise<Class[]> {
  const response = await fetch(
    apiBase + "/classes/list/" + getCookieUser()?.user_id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function fetchClassRegister(): Promise<Class[]> {
  const response = await fetch(
    apiBase + "/classes/register/" + getCookieUser()?.user_id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function fetchStudentClass(id: number): Promise<Enrollment[]> {
  const response = await fetch(apiBase + "/classes/students/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function fetchClassRegisterForAdmin(): Promise<Class[]> {
  const response = await fetch(apiBase + "/classes/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function createClass(classData: Class) {
  classData.created_at = new Date();
  const response = await fetch(apiBase + "/classes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateClass(userData: Class) {
  const response = await fetch(apiBase + "/classes/" + userData.class_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteClass(id: number) {
  const response = await fetch(apiBase + "/classes/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function removeStudentFromClass(id: number) {
  const response = await fetch(apiBase + "/enrollments/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function getClassById(id: number) {
  const response = await fetch(apiBase + "/classes/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateMemberInClass(
  data: User[],
  class_id: number,
  course_id: number | null
) {
  const response = await fetch(apiBase + "/enrollments/addMember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
      class_id,
      course_id,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function RegisterCourseByStudent(
  class_id: number,
  course_id: number | null
) {
  var user = getCookieUser();
  const response = await fetch(apiBase + "/enrollments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      class_id: class_id,
      course_id: course_id,
      student_id: user?.user_id,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function CancelRegisterCourseByStudent(
  course_id: number | null,
  class_id: number
) {
  const student_id = getCookieUser()?.user_id;
  const response = await fetch(
    apiBase +
      "/enrollments/user/" +
      student_id +
      "/course/" +
      course_id +
      "/class/" +
      class_id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}

//    SAVE BLOG
export async function saveBlog(content: string, class_id: number) {
  var user = getCookieUser();
  const response = await fetch(apiBase + "/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      class_id: class_id,
      teacher_id: user?.user_id,
      title: "",
      content: content,
      resource_url: "",
      created_at: new Date(),
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateBlog(blog: Blog) {
  const response = await fetch(apiBase + "/blogs", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blog_id: blog.blog_id,
      class_id: blog.class_id,
      teacher_id: blog.teacher_id,
      title: "",
      content: blog.content,
      resource_url: "",
      documents: blog.documents,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function getBlogOfClass(class_id: number) {
  const response = await fetch(apiBase + "/blogs/" + class_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteBlog(id: number) {
  const response = await fetch(apiBase + "/blogs/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}

//      SUBJECT
export async function fetchSubjects(): Promise<Subject[]> {
  const response = await fetch(apiBase + "/subjects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function createSubject(data: Subject) {
  data.created_at = new Date();
  const response = await fetch(apiBase + "/subjects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateSubject(data: Subject) {
  const response = await fetch(apiBase + "/subjects/" + data.subject_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteSubject(id: number) {
  const response = await fetch(apiBase + "/subjects/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function getSubjectById(id: number) {
  const response = await fetch(apiBase + "/subjects/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

//      LESSION VIDEO
export async function fetchLessions(id: number): Promise<Lession[]> {
  const response = await fetch(apiBase + "/lessions/class/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function createLession(data: Lession) {
  data.created_at = new Date();
  const response = await fetch(apiBase + "/lessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateLession(data: Lession) {
  const response = await fetch(apiBase + "/lessions/" + data.LessionVideo_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteLession(id: number) {
  const response = await fetch(apiBase + "/lessions/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function getLessionById(id: number) {
  const response = await fetch(apiBase + "/lessions/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

//      FEEDBACK
export async function fetchFeedbacks(id: number): Promise<Feedback[]> {
  const response = await fetch(apiBase + "/feedbacks/class/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function createFeedback(data: Feedback) {
  data.created_at = new Date();
  const response = await fetch(apiBase + "/feedbacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateFeedback(data: Feedback) {
  const response = await fetch(apiBase + "/feedbacks/" + data.feedback_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteFeedback(id: number) {
  const response = await fetch(apiBase + "/feedbacks/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function getFeedbackById(id: number) {
  const response = await fetch(apiBase + "/feedbacks/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

//    ATTENDANCE
export async function fetchAttendances(id: number): Promise<Attendance[]> {
  const response = await fetch(apiBase + "/attendances/class/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function getCheckRollCall(id: number) {
  const response = await fetch(apiBase + "/attendances/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function getTookAttendance(id: number) {
  const user_id = getCookieUser()!.user_id;
  const response = await fetch(
    apiBase + "/attendances/myattentdence/" + id + "/" + user_id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function createAttendance(data: Attendance) {
  data.student_id = getCookieUser()!.user_id;
  data.created_at = new Date();
  const response = await fetch(apiBase + "/attendances", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

//        GRADE STUDENT SCORE POINT

export async function getAllGrade(): Promise<Grade[]> {
  const response = await fetch(apiBase + "/grades", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function getGradeOfClass(id: number) {
  const response = await fetch(apiBase + "/grades/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export function getGradeByMultiId(class_id: number, course_id: number) {
  const params = new URLSearchParams({
    class_id: class_id.toString(),
    course_id: course_id.toString(),
    user_id: getCookieUser()!.user_id.toString(),
  });

  return fetch(apiBase + `/grades/checkPassCourse?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(() => 0);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Lỗi api: ", error);
      return 0;
    });
}

export function getGradeByStudent(
  class_id: number,
  course_id: number
): Promise<sub_grade | null> {
  const params = new URLSearchParams({
    class_id: class_id.toString(),
    course_id: course_id.toString(),
    user_id: getCookieUser()!.user_id.toString(),
  });

  return fetch(apiBase + `/grades//student/getgrade?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 404) {
          console.warn("Grade not found");
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as sub_grade;
    })
    .catch((error) => {
      console.error("Lỗi api: ", error);
      return null;
    });
}

export async function updateStudentScoreInClass(id: number) {
  const response = await fetch(apiBase + "/grades/update/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateGrades(grades: Grade[]) {
  const response = await fetch(apiBase + "/grades/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(grades),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

// Handle File
export async function uploadVideo(formData: FormData) {
  const response = await fetch(apiBase + "/upload-video", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (response.ok) return data.videoPath;
  return "";
}

// Document
export async function uploadDocument(formData: FormData) {
  const response = await fetch(apiBase + "/upload-document", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (response.ok) return data.documentPath;
  return "";
}
export async function createDocument(data: Document) {
  data.created_at = new Date();
  data.author_id = getCookieUser()?.user_id ?? 0;
  const response = await fetch(apiBase + "/Documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateDocument(data: Document) {
  const response = await fetch(apiBase + "/Documents/" + data.document_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteDocument(id: number) {
  const response = await fetch(apiBase + "/Documents/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function getDocumentById(id: number) {
  const response = await fetch(apiBase + "/Documents/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function fetchDocuments(): Promise<Document[]> {
  const response = await fetch(apiBase + "/DocumentList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

//      Faculty
export async function fetchFaculties(): Promise<Faculty[]> {
  const response = await fetch(apiBase + "/faculties", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function createFaculty(data: Faculty) {
  data.created_at = new Date();
  const response = await fetch(apiBase + "/faculties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateFaculty(data: Faculty) {
  const response = await fetch(apiBase + "/faculties/" + data.faculty_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteFaculty(id: number) {
  const response = await fetch(apiBase + "/faculties/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function getFacultyById(id: number) {
  const response = await fetch(apiBase + "/faculties/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

//      Schedule
export async function fetchSchedules(): Promise<Schedule[]> {
  const response = await fetch(apiBase + "/schedules", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}

export async function createSchedule(data: Schedule) {
  data.created_at = new Date();
  const response = await fetch(apiBase + "/schedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function updateSchedule(data: Schedule) {
  const response = await fetch(apiBase + "/schedules/" + data.schedule_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
export async function deleteSchedule(id: number) {
  const response = await fetch(apiBase + "/schedules/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.ok;
}
export async function getScheduleById(id: number) {
  const response = await fetch(apiBase + "/schedules/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData.message;
  }
  return response.json();
}
