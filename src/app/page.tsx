"use client";

import { getCookieUser } from "./services/authService";
import { Position, PositionLabels } from "./models/User";
import MyClass from "./myclasses";
import { useEffect, useState } from "react";
import Head from "./head";

export default function Page() {
  const [isCan, setIsCan] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const account = getCookieUser();
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
  return isCan ? (
    <div>
      <Head />
      <img
        className="object-cover object-center w-full h-[760px]"
        src="images/bia2.jpg"
        alt="nature image"
      />
    </div>
  ) : (
    <div>
      <Head />
      <MyClass />
    </div>
  );
}
