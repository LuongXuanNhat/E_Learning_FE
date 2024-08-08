"use client";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { Position, User } from "../models/User";
import { AlertType, useAlert } from "../components/Alert/alertbase";
import { MiddlewareAuthor } from "../middleware/Author";
import OfficalClass from "./officalClass";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import RegisterClass from "./registerClass";
import React from "react";
import CourseClass from "./courseClass";

function ClassesManager() {
  const data = [
    {
      label: "Danh sách lớp quản lý",
      value: "officalClass",
      icon: Square3Stack3DIcon,
      desc: <OfficalClass />,
    },
    {
      label: "Danh sách lớp bộ môn",
      value: "courseClass",
      icon: Square3Stack3DIcon,
      desc: <CourseClass />,
    },
    {
      label: "Lớp mở đăng ký",
      value: "roomchat",
      icon: Square3Stack3DIcon,
      desc: <RegisterClass />,
    },
  ];

  return (
    <Tabs value="officalClass" className="py-4">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
export default MiddlewareAuthor(ClassesManager, [
  Position.EDUCATION,
  Position.SECRETARY,
  Position.SUB_TEACHER,
  Position.ADVISOR,
]);
