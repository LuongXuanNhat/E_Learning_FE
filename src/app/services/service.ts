import { LoginDto } from "../components/login_card/loginDto";
import { Class } from "../models/Classes";
import { Course } from "../models/Course";
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
export async function fetchClass(): Promise<Class[]> {
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
export async function getBlogOfClass(id: number) {
  const response = await fetch(apiBase + "/blogs", {
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
