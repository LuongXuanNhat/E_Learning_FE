"use client";

import {
  Card,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { MiddlewareAuthen } from "../../middleware/Authen";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import Profile from "./profile";
import React, { useEffect, useState } from "react";
import SettingAccount from "./SettingAccount";
import { MyLearnedModule } from "../learnedmodule";
import { Position, User } from "@/models/User";
import { getCookieUser } from "@/services/authService";

function IndexPage() {
  const [userCurrent, setUserCurrent] = useState<User>({
    user_id: 0,
    username: "",
    name: "",
    cap_bac: "",
    chuc_vu: "",
    email: "",
    password: "",
    role: undefined,
    avatar_url: null,
    is_active: true,
    created_at: "",
    faculty_id: 0,
  });
  useEffect(() => {
    const userCurrentA = getCookieUser();
    setUserCurrent(userCurrentA!);
  }, []);

  const data = [
    {
      label: "Thông tin cá nhân",
      value: "profile",
      icon: Square3Stack3DIcon,
      desc: <Profile />,
    },
    {
      label: "Thay đổi mật khẩu",
      value: "changepass",
      icon: Square3Stack3DIcon,
      desc: <SettingAccount />,
    },
    ...(userCurrent.role === Position.STUDENT
      ? [
          {
            label: "Tra cứu khóa học",
            value: "mycourse",
            icon: Square3Stack3DIcon,
            desc: <MyLearnedModule />,
          },
        ]
      : []),
  ];
  return (
    <div className="py-3">
      <Typography variant="h4" color="blue-gray">
        Cài đặt tài khoản
      </Typography>
      <div>
        <Tabs value="profile" className="py-4">
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
    </div>
  );
}
export default MiddlewareAuthen(IndexPage);
