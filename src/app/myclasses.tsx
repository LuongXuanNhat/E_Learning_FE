import { Metadata } from "next";
import { memo, useEffect, useState } from "react";
import { Enrollment } from "../models/Enrollment";
import { useAlert } from "./components/Alert/alertbase";
import { fetchMyClasses } from "../services/service";
import Loading from "./components/loading";
import Pagination from "./components/paging";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { MiddlewareAuthor } from "../middleware/Author";
import { Position } from "../models/User";
import { format } from "date-fns";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { MyLearningClass } from "./learningmodule";
import { MyLearnedModule } from "./learnedmodule";
import React from "react";
import { MyLearnedClass } from "./learnedclass";

function MyClass() {
  const data = [
    {
      label: "Danh sách lớp học",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: <MyLearningClass />,
    },
    {
      label: "Tổng kết các môn học",
      value: "myCourseRegisted",
      icon: Square3Stack3DIcon,
      desc: <MyLearnedClass />,
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
export default MiddlewareAuthor(MyClass, [Position.STUDENT]);
