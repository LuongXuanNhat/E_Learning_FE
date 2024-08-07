"use client";
import {
  Button,
  Select,
  Typography,
  Option,
  IconButton,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { Position, User } from "../models/User";
import { deleteClass, fetchClass, fetchUsers } from "../services/service";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import Pagination from "../components/paging";
import { format } from "date-fns";
import { Class } from "../models/Classes";
import loading from "../components/loading";
import { AlertType, useAlert } from "../components/Alert/alertbase";
import { MiddlewareAuthor } from "../middleware/Author";
import OfficalClass from "./officalClass";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import RegisterClass from "./registerClass";
import React from "react";

function ClassesManager() {
  const data = [
    {
      label: "Danh sách lớp học",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: <OfficalClass />,
    },
    {
      label: "Lớp mở đăng ký",
      value: "roomchat",
      icon: Square3Stack3DIcon,
      desc: <RegisterClass />,
    },
  ];

  return (
    <Tabs value="dashboard" className="py-4">
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
