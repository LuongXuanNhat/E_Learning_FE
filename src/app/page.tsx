"use client";

import MyClass from "./myclasses";
import { useEffect, useState } from "react";
import Head from "./head";
import { Position, PositionLabels, User } from "@/models/User";
import { getCookieUser } from "@/services/authService";
import { HomePage } from "./home";
import Teacherclasses from "./teacherclasses";
import { HeadEducationHome } from "./head_education";

export default function Page() {
  const [isCan, setIsCan] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const account = getCookieUser();
    setUser(account!);
    if (!account) {
      setIsCan(0);
    } else if (
      account?.chuc_vu === PositionLabels[Position.EDUCATION] ||
      account?.chuc_vu === PositionLabels[Position.SECRETARY]
    ) {
      setIsCan(2);
    } else if (
      account?.chuc_vu === PositionLabels[Position.SUB_TEACHER] ||
      account?.chuc_vu === PositionLabels[Position.ADVISOR]
    ) {
      setIsCan(1);
    } else if (account.role == Position.HEAD_EDUCATION) {
      setIsCan(4);
    } else {
      setIsCan(3);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }
  return (
    <div>
      <Head />
      {isCan === 0 ? (
        <HomePage />
      ) : isCan === 2 ? (
        <div>
          <img
            className="object-cover object-center w-full h-[760px]"
            src="images/bia2.jpg"
            alt="nature image"
          />
        </div>
      ) : isCan === 1 ? (
        <Teacherclasses />
      ) : isCan === 4 ? (
        <HeadEducationHome />
      ) : (
        <MyClass />
      )}
    </div>
  );
}
