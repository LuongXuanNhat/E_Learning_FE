"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import { MiddlewareAuthen } from "@/app/middleware/Authen";
import { Class } from "@/app/models/Classes";
import { Course } from "@/app/models/Course";
import { Position, User } from "@/app/models/User";
import {
  createClass,
  fetchCourses,
  fetchUsers,
  getClassById,
  updateClass,
} from "@/app/services/service";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Option,
  Select,
  Alert,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { format } from "date-fns";
import React from "react";
import { useEffect, useState } from "react";
import DashboardClass from "./dashboard";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import RoomChatClass from "./roomchat";
import ClassMember from "./classmember";
import ClassReview from "./classreview";
import StudyPoint from "./studypoint";

function IndexPage({ params }: { params: { id: number } }) {
  const { addAlert } = useAlert();
  const [classes, setClass] = React.useState<Class>({
    class_id: 0,
    isRegistered: false,
    name: "",
    description: "",
    advisor_id: 0,
    course_id: null,
    schedule: "",
    created_at: "",
    Course: {
      start_date: new Date(),
      end_date: new Date(),
      course_id: 0,
      created_at: "",
      description: "",
      image_url: "",
      name: "",
      registration_deadline: "",
      status: "",
    },
    Advisor: {
      user_id: 0,
      username: "",
      name: "",
      cap_bac: "",
      chuc_vu: "",
      email: "",
      password: "",
      role: Position.STUDENT,
      avatar_url: null,
      is_active: true,
      created_at: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const dataClass = await getClassById(params.id);
      setClass(dataClass);
      console.log(classes);
    };

    fetchData();
  }, []);

  const data = [
    {
      label: "Bảng tin",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: <DashboardClass id={params.id} />,
    },
    {
      label: "Phòng trao đổi",
      value: "roomchat",
      icon: Square3Stack3DIcon,
      desc: <RoomChatClass />,
    },
    {
      label: "Mọi người",
      value: "member",
      icon: Square3Stack3DIcon,
      desc: <ClassMember />,
    },
    {
      label: "Điểm học tập",
      value: "studypoint",
      icon: Square3Stack3DIcon,
      desc: <StudyPoint />,
    },
    {
      label: "Đánh giá lớp học",
      value: "review",
      icon: Square3Stack3DIcon,
      desc: <ClassReview />,
    },
  ];
  return (
    <div className="py-3">
      <Card color="transparent" shadow={false}>
        <div className="row flex flex-wrap">
          <div className=" px-2 flex justify-between items-center w-full">
            <Typography variant="h4" color="blue-gray">
              Lớp học {classes.name}
            </Typography>
            <Typography color="gray">
              <span className="pr-1">Từ ngày</span>
              {format(
                new Date(classes.Course!.start_date.toString()),
                "dd-MM-yyyy"
              )}
              <span className="px-1"> đến ngày </span>
              {format(
                new Date(classes.Course!.end_date.toString()),
                "dd-MM-yyyy"
              )}
            </Typography>
          </div>
        </div>
      </Card>
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
    </div>
  );
}
export default MiddlewareAuthen(IndexPage);
