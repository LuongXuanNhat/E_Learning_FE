// pages/404.tsx
import React from "react";
import { Typography } from "@material-tailwind/react";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Typography variant="h1" color="red" className="mb-4">
        404 |
      </Typography>
      <Typography variant="h5" color="blue-gray">
        Không tìm thấy trang
      </Typography>
    </div>
  );
};

export default Custom404;
