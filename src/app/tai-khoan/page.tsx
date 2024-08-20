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
import React from "react";
import SettingAccount from "./SettingAccount";

function IndexPage() {
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
