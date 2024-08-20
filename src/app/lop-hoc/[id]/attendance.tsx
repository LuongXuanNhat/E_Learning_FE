"use client";

import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import AttendanceEveryday from "../diemdanh/attendanceeveryday";
import AttendanceSummary from "../diemdanh/attendancesummary";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import React from "react";

export default function AttendanceClass({ id }: { id: number }) {
    const data = [
        {
          label: "Điểm danh buổi học",
          value: "dashboard",
          icon: Square3Stack3DIcon,
          desc: <AttendanceEveryday id={id} />,
        },
        {
          label: "Tổng kết",
          value: "summary",
          icon: Square3Stack3DIcon,
          desc: <AttendanceSummary  id={id}/>,
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
