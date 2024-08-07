"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Alert } from "@material-tailwind/react";

interface Alert {
  id: number;
  type: AlertType;
  message: string;
}
export enum AlertType {
  error,
  success,
  info,
  warning,
}

interface AlertContextType {
  alerts: Alert[];
  addAlert: (type: AlertType, message: string) => void;
  removeAlert: (id: number) => void;
}
const AlertContext = createContext<AlertContextType | undefined>(undefined);
export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (type: AlertType, message: string) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, type, message }]);

    // Tự động xóa alert sau 10 giây
    setTimeout(() => {
      removeAlert(id);
    }, 6000);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
