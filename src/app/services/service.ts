import { LoginDto } from "../components/login_card/loginDto";
import { Class } from "../models/Classes";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { Feedback } from "../models/Feedback";
import { Lession } from "../models/Lession";
import { Subject } from "../models/Subject";
import { User } from "../models/User";
import { getCookieUser } from "./authService";

// const apiBase = "http://192.168.1.83:3000/api";
export const apiBase = "http://localhost:3000/api";

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
