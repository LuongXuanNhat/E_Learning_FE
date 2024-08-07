"use client";

import { Typography } from "@material-tailwind/react";

export default function ClassMember() {
  return (
    <div>
      <div className="px-8">
        <div>
          <Typography as="h5">Giáo viên</Typography>
        </div>
        <div>
          <div className="flex justify-between">
            <Typography as="h5">Học viên</Typography>
            <Typography as="h6">54 bạn</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
