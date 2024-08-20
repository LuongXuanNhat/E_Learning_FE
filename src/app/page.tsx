"use client";

import { getCookieUser } from "../services/authService";
import { Position, PositionLabels, User } from "../models/User";
import MyClass from "./myclasses";
import { useEffect, useState } from "react";
import Head from "./head";
import Teacherclasses from "./teacherclasses";

export default function Page() {
  const [isCan, setIsCan] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const account = getCookieUser();
    setUser(account!);
    if (
      account &&
      account?.chuc_vu !== PositionLabels[Position.EDUCATION] &&
      account?.chuc_vu !== PositionLabels[Position.SECRETARY]
    ) {
      setIsCan(false);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }
  return (
    <div>
      <Head />
      {isCan ? (
        <div>
          <img
            className="object-cover object-center w-full h-[760px]"
            src="images/bia2.jpg"
            alt="nature image"
          />
        </div>
      ) : user?.chuc_vu === PositionLabels[Position.SUB_TEACHER] ||
        user?.chuc_vu === PositionLabels[Position.ADVISOR] ? (
        <div>
          <Teacherclasses />
        </div>
      ) : (
        <MyClass />
      )}
    </div>
  );
}
