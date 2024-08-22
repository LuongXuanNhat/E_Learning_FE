"use client";

import { AlertType, useAlert } from "@/app/components/Alert/alertbase";
import { MiddlewareAuthen } from "@/middleware/Authen";
import { Class } from "@/models/Classes";
import { Course } from "@/models/Course";
import { Position, User } from "@/models/User";
import {
  createClass,
  fetchCourses,
  fetchUsers,
  getClassById,
  updateClass,
} from "@/services/service";
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
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
} from "react";
import { useEffect, useState } from "react";
import DashboardClass from "./dashboard";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import RoomChatClass from "./roomchat";
import ClassMember from "./classmember";
import ClassReview from "./classreview";
import StudyPoint from "./studypoint";
import IsRole from "@/services/authService";
import LessionVideo from "./lession";
import AttendanceClass from "./attendance";
import Loading from "@/app/components/loading";

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
      subject_id: 0,
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
  const [allowedTabs, setAllowedTabs] = useState<TabItem[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loadedTabs, setLoadedTabs] = useState(["dashboard"]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    if (!loadedTabs.includes(newTab)) {
      setLoadedTabs((prev) => [...prev, newTab]);
    }
  };

  interface TabItem {
    label: string;
    value: string;
    icon: ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & RefAttributes<SVGSVGElement>
    >;
    desc: React.ReactElement;
    allow: Position[];
  }

  let data: TabItem[] = [
    {
      label: "Bảng tin",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: <DashboardClass id={params.id} />,
      allow: [],
    },
    {
      label: "Bài giảng",
      value: "lession",
      icon: Square3Stack3DIcon,
      desc: <LessionVideo id={params.id} />,
      allow: [],
    },
    {
      label: "Phòng trao đổi",
      value: "roomchat",
      icon: Square3Stack3DIcon,
      desc: <RoomChatClass id={params.id} />,
      allow: [Position.ADVISOR, Position.SUB_TEACHER, Position.STUDENT],
    },
    {
      label: "Mọi người",
      value: "member",
      icon: Square3Stack3DIcon,
      desc: <ClassMember id={params.id} />,
      allow: [
        Position.ADVISOR,
        Position.EDUCATION,
        Position.SECRETARY,
        Position.SUB_TEACHER,
      ],
    },
    {
      label: "Điểm danh",
      value: "attendance",
      icon: Square3Stack3DIcon,
      desc: <AttendanceClass id={params.id} />,
      allow: [
        Position.SUB_TEACHER
      ],
    },
    {
      label: "Điểm học tập",
      value: "studypoint",
      icon: Square3Stack3DIcon,
      desc: <StudyPoint id={params.id} />,
      allow: [Position.SUB_TEACHER],
    },
    {
      label: "Đánh giá lớp học",
      value: "review",
      icon: Square3Stack3DIcon,
      desc: <ClassReview id={params.id} />,
      allow: [Position.ADVISOR, Position.SECRETARY, Position.STUDENT],
    },
  ];

  const fetchData = async () => {
    const dataClass = await getClassById(params.id);
    setClass(dataClass);

    if(dataClass && !dataClass.course_id){
      data = data.filter(
        (item) => !["attendance", "studypoint"].includes(item.value)
      );
      const allowed = data.filter(({ allow }) => IsRole(allow));
      setAllowedTabs(allowed);
    } else {
      const allowed = data.filter(({ allow }) => IsRole(allow));
      setAllowedTabs(allowed);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


   

  return (
    <div className="py-3">
      <Card color="transparent" shadow={false}>
        <div className="row flex flex-wrap">
          <div className=" px-2 flex justify-between items-center w-full">
            <Typography as="span" variant="h4" color="blue-gray">
              Lớp học {classes.name}
            </Typography>
            <Typography as="div" color="gray">
              {classes.course_id ? (
                <div>
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
                </div>
              ) : null}
            </Typography>
          </div>
        </div>
      </Card>
      <Tabs value={activeTab} className="py-4">
        <TabsHeader>
          {allowedTabs.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2" onClick={()=> handleTabChange(value)}>
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {loadedTabs.includes(value) ? desc : <Loading />}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
export default MiddlewareAuthen(IndexPage);
