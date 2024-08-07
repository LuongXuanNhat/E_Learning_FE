"use client";
import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import RegisterCourse from "./registerCourse";
import RegistedCourse from "./registedCourse";
import { MiddlewareAuthen } from "../middleware/Authen";
import { MiddlewareAuthor } from "../middleware/Author";
import { Position } from "../models/User";

function RegisterCourseHome() {
  const [state, setState] = useState(false);
  const reload = (response: boolean) => {
    setState((prevState) => response);
  };
  const data = [
    {
      label: "Đăng ký học phần",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: <RegisterCourse state={state} onReload={reload} />,
    },
    {
      label: "Danh sách học phần đã đăng ký",
      value: "myCourseRegisted",
      icon: Square3Stack3DIcon,
      desc: <RegistedCourse state={state} onReload={reload} />,
    },
  ];
  return (
    <Tabs value="dashboard" className="">
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
export default MiddlewareAuthor(RegisterCourseHome, [Position.STUDENT]);
