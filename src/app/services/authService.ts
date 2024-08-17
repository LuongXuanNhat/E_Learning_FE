import { NextRequest } from "next/server";
import { LoginDto } from "../components/login_card/loginDto";
import { Position, PositionLabels, User } from "../models/User";
import { apiBase } from "./service";
import Cookies from "js-cookie";

//  AUTHENTICATION
export async function login(data: LoginDto) {
  const response = await fetch(apiBase + "/users/login", {
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
  const responseData = await response.json();
  saveCookieUser(responseData.user);
  return response.ok;
}
export function saveCookieUser(user: any) {
  if (typeof window !== "undefined") {
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
  }
}
export function setCookie(name: string, value: any, days: number = 7) {
  Cookies.set(name, value, { expires: days });
}
export function getCookie(name: string) {
  return Cookies.get(name);
}
export function removeCookie(name: string) {
  Cookies.remove(name);
}

export function getCookieUser(): User | null {
  if (typeof window !== "undefined") {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}
export function Logout() {
  if (typeof window !== "undefined") {
    Cookies.remove("user");
    return true;
  }
  return false;
}
export const isLogged = () => getCookieUser() != null;

//    CHECK ROLE
export default function IsRole(positions: Position[]) {
  let role = getCookieUser()?.chuc_vu;
  let result = false;
  if (positions.length === 0) return true;
  positions.forEach((item) => {
    if (role == PositionLabels[item]) {
      result = true;
    }
  });
  return result;
}
