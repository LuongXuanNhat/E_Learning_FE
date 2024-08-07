"use client";
import { ShowAlert } from "./alert";
import { useAlert } from "./alertbase";

export function AlertCustom() {
  const { alerts, addAlert } = useAlert();
  return (
    <div className="relative bg-transparent z-[10000]">
      <div className="fixed top-10 right-3 bg-transparent">
        {alerts.map((alert) => (
          <ShowAlert key={alert.id} {...alert} />
        ))}
      </div>
    </div>
  );
}
